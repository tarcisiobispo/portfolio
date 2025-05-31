/**
 * Service Worker for Portfolio Website
 * Implements caching strategies for better performance
 */

const CACHE_NAME = 'portfolio-v1';
const STATIC_CACHE_NAME = 'portfolio-static-v1';
const DYNAMIC_CACHE_NAME = 'portfolio-dynamic-v1';

/**
 * Determine the base path for assets
 * This handles both local development and GitHub Pages deployment
 */
function getBasePath() {
  // Default to '/portfolio/' for GitHub Pages
  return self.location.pathname.includes('/portfolio/') ? '/portfolio/' : '/';
}

const BASE_PATH = getBasePath();

// Resources to cache immediately - with correct paths
const STATIC_ASSETS = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'images/tarcisio_bispo.webp',
  BASE_PATH + 'images/tarcisio_bispo.png',
  BASE_PATH + 'images/ixdf-symbol-dark.png',
  BASE_PATH + 'images/ixdf-symbol-white.png'
  // manifest.json removed as it doesn't exist in the build
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  // Images: Cache first with long expiration
  images: {
    strategy: 'cacheFirst',
    maxAge: 31536000, // 1 year
    maxEntries: 100
  },
  // JavaScript/CSS: Stale while revalidate
  assets: {
    strategy: 'staleWhileRevalidate',
    maxAge: 86400, // 1 day
    maxEntries: 50
  },
  // API calls: Network first with fallback
  api: {
    strategy: 'networkFirst',
    maxAge: 300, // 5 minutes
    maxEntries: 20
  },
  // Pages: Network first with cache fallback
  pages: {
    strategy: 'networkFirst',
    maxAge: 3600, // 1 hour
    maxEntries: 10
  }
};

/**
 * Cache a single asset with error handling
 * @param {Cache} cache - The cache object
 * @param {string} asset - The asset URL to cache
 * @returns {Promise} - Resolves when asset is cached or error is handled
 */
async function cacheAsset(cache, asset) {
  try {
    // First check if the resource exists by doing a HEAD request
    const response = await fetch(asset, { method: 'HEAD' });
    
    if (!response.ok) {
      console.warn(`Asset not found (${response.status}): ${asset}`);
      return false;
    }
    
    // If the resource exists, cache it
    await cache.add(asset);
    console.log(`Successfully cached: ${asset}`);
    return true;
  } catch (error) {
    console.warn(`Failed to cache asset: ${asset}`, error);
    return false;
  }
}

/**
 * Install event - Cache static assets with graceful error handling
 */
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(async cache => {
        console.log('Caching static assets...');
        
        // Cache each asset individually to prevent one failure from breaking everything
        const results = await Promise.all(
          STATIC_ASSETS.map(asset => cacheAsset(cache, asset))
        );
        
        const successCount = results.filter(result => result).length;
        console.log(`Successfully cached ${successCount} of ${STATIC_ASSETS.length} assets`);
        
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Error during service worker installation:', error);
        // Continue with installation even if caching fails
        return self.skipWaiting();
      })
  );
});

/**
 * Activate event - Clean up old caches
 */
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

/**
 * Fetch event - Implement caching strategies
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Determine cache strategy based on resource type
  const strategy = getCacheStrategy(request);
  
  event.respondWith(
    handleRequest(request, strategy)
  );
});

/**
 * Determine cache strategy based on request
 */
function getCacheStrategy(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Images
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    return CACHE_STRATEGIES.images;
  }
  
  // JavaScript and CSS
  if (pathname.match(/\.(js|css)$/i)) {
    return CACHE_STRATEGIES.assets;
  }
  
  // API calls
  if (pathname.startsWith('/api/') || url.hostname !== self.location.hostname) {
    return CACHE_STRATEGIES.api;
  }
  
  // Pages
  return CACHE_STRATEGIES.pages;
}

/**
 * Handle request based on strategy
 */
async function handleRequest(request, strategy) {
  const cacheName = getDynamicCacheName(request);
  
  switch (strategy.strategy) {
    case 'cacheFirst':
      return cacheFirst(request, cacheName, strategy);
    
    case 'networkFirst':
      return networkFirst(request, cacheName, strategy);
    
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request, cacheName, strategy);
    
    default:
      return fetch(request);
  }
}

/**
 * Cache first strategy
 */
async function cacheFirst(request, cacheName, strategy) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Check if cache is still valid
      const cacheDate = new Date(cachedResponse.headers.get('date') || 0);
      const now = new Date();
      const age = (now.getTime() - cacheDate.getTime()) / 1000;
      
      if (age < strategy.maxAge) {
        return cachedResponse;
      }
    }
    
    try {
      // Fetch from network and cache
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        const responseClone = networkResponse.clone();
        await cache.put(request, responseClone);
        await cleanupCache(cache, strategy.maxEntries);
      }
      
      return networkResponse;
    } catch (fetchError) {
      console.warn('Network fetch failed in cacheFirst strategy:', fetchError);
      
      // Return cached version as fallback even if expired
      if (cachedResponse) {
        console.log('Returning expired cached response as fallback');
        return cachedResponse;
      }
      
      // If no cached version available, return a fallback response
      return createFallbackResponse(request);
    }
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    
    try {
      // Try to return cached version as fallback
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        return cachedResponse;
      }
    } catch (cacheError) {
      console.error('Failed to access cache:', cacheError);
    }
    
    // Return a fallback response instead of throwing
    return createFallbackResponse(request);
  }
}

/**
 * Network first strategy
 */
async function networkFirst(request, cacheName, strategy) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
      await cleanupCache(cache, strategy.maxEntries);
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('Network request failed, trying cache:', error);
    
    try {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(request);
      
      if (cachedResponse) {
        return cachedResponse;
      }
    } catch (cacheError) {
      console.error('Failed to access cache:', cacheError);
    }
    
    // Return a fallback response instead of throwing
    return createFallbackResponse(request);
  }
}

/**
 * Stale while revalidate strategy
 */
async function staleWhileRevalidate(request, cacheName, strategy) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Start network request (don't await)
  const networkPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        const responseClone = networkResponse.clone();
        cache.put(request, responseClone);
        cleanupCache(cache, strategy.maxEntries);
      }
      return networkResponse;
    })
    .catch(error => {
      console.warn('Background fetch failed:', error);
      // Return null to indicate network failure, will be handled below
      return null;
    });
  
  // Return cached response immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If no cache, wait for network
  try {
    const networkResponse = await networkPromise;
    // If network request failed and returned null, create a fallback response
    if (!networkResponse) {
      return createFallbackResponse(request);
    }
    return networkResponse;
  } catch (error) {
    console.warn('Failed to fetch and no cache available:', error);
    return createFallbackResponse(request);
  }
}

/**
 * Get dynamic cache name based on request type
 */
function getDynamicCacheName(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    return `${DYNAMIC_CACHE_NAME}-images`;
  }
  
  if (pathname.match(/\.(js|css)$/i)) {
    return `${DYNAMIC_CACHE_NAME}-assets`;
  }
  
  return DYNAMIC_CACHE_NAME;
}

/**
 * Clean up cache to maintain size limits
 */
async function cleanupCache(cache, maxEntries) {
  if (!maxEntries) return;
  
  try {
    const keys = await cache.keys();
    
    if (keys.length > maxEntries) {
      const keysToDelete = keys.slice(0, keys.length - maxEntries);
      await Promise.all(
        keysToDelete.map(key => cache.delete(key))
      );
    }
  } catch (error) {
    console.warn('Failed to clean up cache:', error);
    // Continue execution, this is not critical
  }
}

/**
 * Create a fallback response for failed requests
 */
function createFallbackResponse(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // For images, return a placeholder image
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    return caches.match('/placeholder.svg')
      .then(response => response || new Response('Image not available', {
        status: 200,
        headers: { 'Content-Type': 'image/svg+xml' }
      }))
      .catch(() => new Response('Image not available', {
        status: 200,
        headers: { 'Content-Type': 'image/svg+xml' }
      }));
  }
  
  // For JavaScript or CSS, return an empty response with correct content type
  if (pathname.match(/\.js$/i)) {
    return new Response('// Empty fallback', {
      status: 200,
      headers: { 'Content-Type': 'application/javascript' }
    });
  }
  
  if (pathname.match(/\.css$/i)) {
    return new Response('/* Empty fallback */', {
      status: 200,
      headers: { 'Content-Type': 'text/css' }
    });
  }
  
  // For HTML pages, return a simple offline page
  if (pathname.match(/\.(html?)$/i) || pathname === '/' || !pathname.match(/\.[a-z]+$/i)) {
    return new Response('<html><body><h1>Offline</h1><p>The content is not available offline.</p></body></html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Default fallback for other types
  return new Response('Content not available', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}

/**
 * Handle background sync for offline actions
 */
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any background sync tasks
      console.log('Background sync triggered')
    );
  }
});

/**
 * Handle push notifications (if needed in the future)
 */
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/images/icon-192x192.png',
        badge: '/images/badge-72x72.png'
      })
    );
  }
});

console.log('Service Worker loaded successfully');
