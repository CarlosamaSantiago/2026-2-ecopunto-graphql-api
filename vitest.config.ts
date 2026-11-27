import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      // Archivos sin lógica que no aportan a la cobertura del taller.
      exclude: [
        'src/main.ts',
        'src/**/*.module.ts',
        'src/**/*.dto.ts',
        'src/**/*.entity.ts',
        'src/**/*.enum.ts',
        'src/**/enums/**',
        'src/**/data/**',
        'src/**/*.spec.ts',
      ],
      reporter: ['text', 'html', 'lcov'],
      // El taller exige >= 80%. Si baja de esto, `pnpm test:cov` falla.
      // Arranca en 0 para no romper el CI mientras todo es TODO; súbanlo a 80
      // cuando terminen sus módulos (ver PLAN).
      thresholds: { lines: 0, functions: 0, branches: 0, statements: 0 },
    },
  },
});
