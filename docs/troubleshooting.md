# Troubleshooting Guide

## HMR WebSocket Connection Issues

### Problem
When running the development server with a custom base path (like `/portfolio/`), you may encounter WebSocket connection errors in the browser console:

```
WebSocket connection to 'ws://localhost:5173/portfolio/?token=YVsvJnMJrEt5' failed
[vite] failed to connect to websocket.
your current setup:
  (browser) localhost:5173/portfolio/ <--[HTTP]--> localhost:5173/portfolio/ (server)
  (browser) localhost:5173/portfolio/ <--[WebSocket (failing)]--> localhost:5173/portfolio/ (server)
```

### Root Cause
The issue occurs because Vite's default Hot Module Replacement (HMR) WebSocket path doesn't align with the custom base path configuration. When using a base path like `/portfolio/`, the browser tries to connect to the WebSocket at `ws://localhost:5173/portfolio/`, but the WebSocket server is actually listening at the root path.

### Solution
To fix this issue, you need to configure the HMR WebSocket path in `vite.config.ts` to match your base path:

```typescript
export default defineConfig({
  base: '/portfolio/',
  server: {
    hmr: {
      path: '/portfolio/ws',
      clientPort: 5173,
      origin: 'ws://localhost:5173'
    }
  },
  // other configuration...
});
```

This configuration tells Vite to:
1. Serve the WebSocket at `/portfolio/ws` instead of the default path
2. Use the specified client port for connections
3. Set the correct origin for the WebSocket connection

After making this change, restart the development server and the HMR connection should work properly.

## MetaMask Extension Not Found Error

### Problem
You may see an error in the console: `Error: MetaMask extension not found`

### Root Cause
The application is trying to access the MetaMask browser extension (via `window.ethereum`) without first checking if it exists. This causes an uncaught exception when the extension is not installed.

### Solution
Wrap any MetaMask-dependent code in a feature check:

```javascript
if (window.ethereum) {
  // MetaMask is available, proceed with Web3 functionality
  // ...
} else {
  console.warn('MetaMask not found. Web3 functionality will be disabled.');
  // Optionally provide fallback behavior or UI indication
}
```

This ensures the application gracefully handles the absence of MetaMask without throwing uncaught exceptions.

## Static Resources 404 Errors

### Problem
Static resources (JS, CSS, images) may return 404 errors when loaded from paths under `/portfolio/`.

### Root Cause
This typically happens when asset paths aren't properly configured to respect the base path setting.

### Solution
1. Ensure all asset imports in your code use relative paths or the `@` alias
2. For public assets, use the `import.meta.env.BASE_URL` prefix:

```javascript
const logoPath = `${import.meta.env.BASE_URL}logo.png`;
```

3. Verify that the `base` setting in `vite.config.ts` is consistently set to `/portfolio/`

## React Router with HashRouter and Base Path

### Problem
Navigation issues or blank pages when using React Router with a custom base path.

### Solution
When deploying to GitHub Pages with a custom base path, use HashRouter instead of BrowserRouter:

```jsx
import { HashRouter } from 'react-router-dom';

// In your app:
<HashRouter>
  <Routes>
    {/* Your routes */}
  </Routes>
</HashRouter>
```

This ensures that client-side routing works correctly with the `/portfolio/` base path.