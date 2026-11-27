// Genera postman/ecopunto-graphql.postman_collection.json a partir de operations/*.graphql
// Cada request incluye SOLO los fragments que usa (GraphQL rechaza fragments sin usar).
// Uso: pnpm postman
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, print, visit } from 'graphql';

const opsDir = join(process.cwd(), 'operations');
const fragmentsDoc = parse(readFileSync(join(opsDir, 'fragments.graphql'), 'utf8'));
const fragments = new Map(fragmentsDoc.definitions.map((d) => [d.name.value, d]));
const variables = JSON.parse(readFileSync(join(opsDir, 'variables.example.json'), 'utf8'));

const usedFragments = (node, acc = new Set()) => {
  visit(node, {
    FragmentSpread(spread) {
      const name = spread.name.value;
      if (!acc.has(name)) {
        acc.add(name);
        usedFragments(fragments.get(name), acc);
      }
    },
  });
  return acc;
};

const folders = readdirSync(opsDir)
  .filter((f) => f.endsWith('.graphql') && f !== 'fragments.graphql')
  .map((file) => {
    const doc = parse(readFileSync(join(opsDir, file), 'utf8'));
    const item = doc.definitions.map((op) => {
      const names = [...usedFragments(op)];
      const query = [print(op), ...names.map((n) => print(fragments.get(n)))].join('\n\n');
      const vars = Object.fromEntries(
        (op.variableDefinitions ?? [])
          .map((v) => v.variable.name.value)
          .filter((v) => v in variables)
          .map((v) => [v, variables[v]]),
      );
      const isLogin = ['Login', 'Register'].includes(op.name.value);
      return {
        name: op.name.value,
        event: isLogin
          ? [{
              listen: 'test',
              script: {
                type: 'text/javascript',
                exec: [
                  'const d = pm.response.json().data || {};',
                  'const t = (d.login || d.register || {}).token;',
                  "if (t) pm.collectionVariables.set('token', t);",
                ],
              },
            }]
          : undefined,
        request: {
          method: 'POST',
          header: [],
          auth: { type: 'bearer', bearer: [{ key: 'token', value: '{{token}}', type: 'string' }] },
          body: { mode: 'graphql', graphql: { query, variables: JSON.stringify(vars, null, 2) } },
          url: { raw: '{{baseUrl}}', host: ['{{baseUrl}}'] },
        },
      };
    });
    return { name: file.replace('.graphql', ''), item };
  });

const collection = {
  info: {
    name: 'EcoPunto GraphQL',
    description:
      'Generada con `pnpm postman` desde /operations. Orden: Seed -> Login (guarda el token) -> lo demás.\nCredenciales: admin@ / operador@ / camila@ecopunto.co — Ecopunto123',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
  },
  variable: [
    { key: 'baseUrl', value: 'http://localhost:4100/graphql' },
    { key: 'token', value: '' },
  ],
  item: folders,
};

writeFileSync(
  join(process.cwd(), 'postman/ecopunto-graphql.postman_collection.json'),
  JSON.stringify(collection, null, 2),
);
console.log('✅ postman/ecopunto-graphql.postman_collection.json');
