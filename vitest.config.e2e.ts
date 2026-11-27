import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['test/**/*.e2e-spec.ts'],
    env: { NODE_ENV: 'test' },
    // Todos los e2e comparten la misma BD: correrlos en serie evita choques.
    fileParallelism: false,
    hookTimeout: 30_000,
    testTimeout: 15_000,
  },
});
