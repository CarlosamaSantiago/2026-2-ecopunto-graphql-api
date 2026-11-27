# EcoPunto API · NestJS + GraphQL

Traducción a **GraphQL** del API REST de **EcoPunto** (Equipo Pandas): puntos de recolección de pilas, electrónicos y aceite usado en Cali, recolecciones a domicilio y EcoPuntos.

Taller Backend GraphQL · Computación en Internet III · 2026-2

**Integrantes:** Santiago Carlosama · Joshua · María José

> 📐 Arquitectura, mapeo con el enunciado y convenciones: **[ARCHITECTURE.md](./ARCHITECTURE.md)**

---

## 🚀 Arrancar en local

Requisitos: Node 22, pnpm (`corepack enable`), Docker Desktop. Mismos que el repo REST.

```bash
pnpm install
cp .env.example .env              # Mac / Git Bash
Copy-Item .env.example .env       # Windows PowerShell
pnpm db:up                        # Postgres en localhost:5434
pnpm start:dev                    # http://localhost:4100/graphql
```

Abran **http://localhost:4100/graphql** (Apollo Sandbox) y ejecuten:

```graphql
mutation { executeSeed }
```

```graphql
mutation {
  login(input: { email: "camila@ecopunto.co", password: "Ecopunto123" }) { token }
}
```

Copien el token en *Headers* → `Authorization: Bearer <token>`.

### Usuarios del seed

| Rol | Correo | Contraseña |
|---|---|---|
| admin (superadmin) | `admin@ecopunto.co` | `Ecopunto123` |
| operator | `operador@ecopunto.co` | `Ecopunto123` |
| citizen (usuario regular) | `camila@ecopunto.co` | `Ecopunto123` |

## 📄 Operaciones y fragments

- `operations/fragments.graphql`: fragments reutilizables.
- `operations/0X-*.graphql`: queries y mutations de ejemplo por módulo.
- `operations/variables.example.json`: variables de ejemplo.
- `pnpm postman` genera `postman/ecopunto-graphql.postman_collection.json` con todo lo anterior.

## 🧪 Pruebas

```bash
pnpm test        # unitarias + validación de operations/ contra el schema
pnpm test:cov    # con cobertura
pnpm test:e2e    # supertest contra /graphql (necesita pnpm db:up)
```

## 📜 Scripts

| Script | Qué hace |
|---|---|
| `pnpm start:dev` | API con recarga (regenera `src/schema.gql`) |
| `pnpm lint` · `pnpm format` · `pnpm typecheck` | calidad |
| `pnpm db:up` · `db:down` · `db:reset` | Postgres en Docker |
| `pnpm postman` | regenera la colección de Postman |

## 🛟 Problemas comunes

Ver la tabla del README del repo REST (mismos casos). Extra: si Apollo Sandbox no carga, prueben en otra pestaña o usen Postman.

---

## 📋 Entrega (completar al final)

- **URL desplegada:** _pendiente_
- **Funcionalidades no alcanzadas:** _pendiente_
- **Dificultades encontradas:** _pendiente_
