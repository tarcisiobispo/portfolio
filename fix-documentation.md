# HTTP Header Configuration Fix

## Issue Fixed
Fixed the `ERR_INVALID_HTTP_TOKEN` error that was occurring in the Vite development server. This error was caused by invalid header configuration in the `vite.config.ts` file.

## Problem Details
The error occurred because the Vite configuration was using path patterns as header names in the `preview` and `server` sections:

```typescript
// Invalid configuration that caused the error
preview: {
  headers: {
    '/*.js': {
      'Content-Type': 'application/javascript'
    },
    '/js/*.js': {
      'Content-Type': 'application/javascript'
    },
    '/assets/*.js': {
      'Content-Type': 'application/javascript'
    }
  }
}
```

HTTP header names must be valid HTTP tokens, and path patterns like `'/*.js'` are not valid tokens.

## Solution Implemented
The configuration was updated to use Vite's middleware approach for setting headers based on request paths:

```typescript
// Updated configuration using middleware
preview: {
  setupMiddleware: (middlewares) => {
    middlewares.use((req, res, next) => {
      // Set correct MIME types for JavaScript files
      if (req.url?.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      next();
    });
    return middlewares;
  }
}
```

The same approach was applied to the `server` section to ensure consistent behavior in both development and preview modes.

## Verification
The fix was verified by:
1. Running the development server (`npm run dev`) - No errors reported
2. Building the project (`npm run build`) - Build completed successfully
3. Running the preview server (`npm run preview`) - No errors reported

## Additional Notes
- This change ensures that JavaScript files are served with the correct MIME type (`application/javascript`)
- The middleware approach provides more flexibility for conditional header setting based on request properties
- Cache control headers are still applied as before, but using the middleware approach