# AGENTS.md

Instrucciones para asistentes de código (Copilot, Codex, Claude...) en el repo GraphQL.
Lean primero **[ARCHITECTURE.md](./ARCHITECTURE.md)**: ahí están las reglas del proyecto.

## Reglas rápidas

- NestJS 12, **ESM**: imports relativos terminan en `.js`; no existe `__dirname` (usar `import.meta.dirname`).
- Tests con **Vitest**: mocks con `vi.fn()`, no `jest.fn()`.
- Relaciones TypeORM tipadas con `Relation<T>` (si no, rompe por imports circulares en ESM).
- No cambiar entidades, firmas de servicios compartidos ni rutas del contrato (ARCHITECTURE) sin que el equipo lo pida.
- GraphQL code-first: resolvers sin lógica (la lógica va en services). Inputs con `@InputType` + class-validator. Nunca editar `src/schema.gql` a mano.
- Toda operación de ejemplo nueva va en `operations/` usando fragments.
- Mensajes de error en español. Respuestas paginadas con `Paginated(Entidad)`.
- Gestor de paquetes: **pnpm**.

## NestJS 12

Docs indexadas en https://docs.nestjs.com/llms.txt (una página markdown por capítulo). Antes de agregar una librería, revisen si Nest tiene paquete oficial (`@nestjs/config`, `@nestjs/typeorm`, `@nestjs/swagger`, `@nestjs/throttler`, `@nestjs/schedule`...).
