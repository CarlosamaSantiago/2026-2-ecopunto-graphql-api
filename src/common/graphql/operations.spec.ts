import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildSchema, parse, validate } from 'graphql';

/**
 * Valida que TODAS las operaciones de /operations (con sus fragments) sean
 * correctas contra el schema actual (src/schema.gql).
 * Si alguien renombra un campo y rompe una operación o un fragment, este
 * test falla en el CI. El schema se regenera con `pnpm start:dev` o `pnpm build`.
 */
const root = process.cwd();
const schema = buildSchema(readFileSync(join(root, 'src/schema.gql'), 'utf8'));
const opsDir = join(root, 'operations');
const fragments = readFileSync(join(opsDir, 'fragments.graphql'), 'utf8');
const files = readdirSync(opsDir).filter(
  (f) => f.endsWith('.graphql') && f !== 'fragments.graphql',
);

describe('operations/*.graphql', () => {
  it.each(files)('%s es válido contra el schema', (file) => {
    const doc = parse(
      `${readFileSync(join(opsDir, file), 'utf8')}\n${fragments}`,
    );
    // Los fragments que este archivo no usa no son error para nosotros.
    const errors = validate(schema, doc).filter(
      (e) => !e.message.includes('is never used'),
    );
    expect(errors.map((e) => e.message)).toEqual([]);
  });
});
