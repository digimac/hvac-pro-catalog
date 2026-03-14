// Render build script — plain Node.js (no tsx needed).
// The client (dist/public) is pre-built and committed to the repo.
// This only compiles the Express server entry point.
const { build } = require('esbuild');
const path = require('path');

build({
  entryPoints: ['server/index.ts'],
  platform: 'node',
  bundle: true,
  format: 'cjs',
  outfile: 'dist/index.cjs',
  define: { 'process.env.NODE_ENV': '"production"' },
  minify: true,
  // keep heavy native deps external — they come from node_modules
  external: [
    'express', 'express-session', 'passport', 'passport-local',
    'ws', 'pg', 'drizzle-orm', 'drizzle-zod', 'memorystore',
    'connect-pg-simple', 'bufferutil',
  ],
  logLevel: 'info',
}).then(() => {
  console.log('Server build complete → dist/index.cjs');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
