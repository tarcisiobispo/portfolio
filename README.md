# Portfolio Project

This is a personal portfolio website built with React, TypeScript, and Vite.

## Development

To start the development server:

```bash
npm run dev
```

To clear Vite's cache and start with a fresh development server:

```bash
npm run reset-cache
```

This will delete the `.vite` cache directory in `node_modules` and then start the development server with a clean slate, ensuring no stale assets are served.

## Building

To build the project for production:

```bash
npm run build
```

This will generate optimized assets in the `dist/` directory.

## Preview

To preview the production build locally:

```bash
# Preview with base path set to /portfolio/
npm run preview

# Or directly with npx
npx vite preview --base=/portfolio/
```

The preview server will start at http://localhost:4173 and will serve the app at http://localhost:4173/portfolio/.

## Deployment

This project is configured for deployment to GitHub Pages:

```bash
npm run deploy
```

This will build the project and deploy it to the configured GitHub Pages URL.

## Configuration

The project uses Vite for building and bundling. The configuration is in `vite.config.ts`.

### Console Clearing

The development server is configured to automatically clear the console when starting up. This behavior is controlled by the `clearScreen: true` setting in the server configuration of `vite.config.ts`.

### Base Path

The base path is consistently set to `/portfolio/` for all environments to ensure compatibility with GitHub Pages deployment.

You can override the base path by using the `--base` flag if needed:

```bash
npx vite preview --base=/custom-path/
```

#### HMR WebSocket Configuration

When using a custom base path like `/portfolio/`, you need to configure Vite's HMR (Hot Module Replacement) settings to ensure WebSocket connections work properly:

```javascript
// vite.config.ts
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

This ensures that the HMR WebSocket connects to the correct path when running the development server.

For more details on troubleshooting WebSocket connection issues, see the [troubleshooting documentation](./docs/troubleshooting.md).

Note: The app now uses HashRouter instead of BrowserRouter for better compatibility with GitHub Pages and to avoid 404 errors on page refreshes.

## Scripts

- `npm run dev` - Start development server
- `npm run reset-cache` - Delete Vite's cache and start development server with fresh cache
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Build and deploy to GitHub Pages
- `npm run lint` - Run ESLint

## License

See the LICENSE file for details.