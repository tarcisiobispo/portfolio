/**
 * Utility to add 'loaded' class to images when they finish loading
 * This replaces the non-standard :loaded pseudo-class
 */

export function setupImageLoading() {
  // Function to add 'loaded' class to images when they load
  function handleImageLoad(img) {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
      
      // Also handle error case
      img.addEventListener('error', () => {
        img.classList.add('loaded');
        img.classList.add('error');
      });
    }
  }

  // Process all images on the page
  function processImages() {
    const images = document.querySelectorAll('img');
    images.forEach(handleImageLoad);
  }

  // Process images when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processImages);
  } else {
    processImages();
  }

  // Also handle dynamically added images using MutationObserver
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'IMG') {
              handleImageLoad(node);
            } else if (node.querySelectorAll) {
              node.querySelectorAll('img').forEach(handleImageLoad);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Export a function to manually add the loaded class to an image
export function markImageAsLoaded(imgElement) {
  if (imgElement && imgElement instanceof HTMLImageElement) {
    imgElement.classList.add('loaded');
  }
}