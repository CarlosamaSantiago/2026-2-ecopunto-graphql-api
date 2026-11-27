import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { setupApp } from '../src/setup-app.js';

/**
 * E2E de GraphQL con supertest contra la BD ecopunto_test (.env.test).
 * Patrón: helper gql() + seed + login. Copien este archivo por módulo.
 */
describe('EcoPunto GraphQL (e2e)', () => {
  let app: INestApplication<App>;
  let citizenToken: string;

  const gql = (query: string, variables?: object, token?: string) => {
    const req = request(app.getHttpServer())
      .post('/graphql')
      .send({ query, variables });
    return token ? req.set('Authorization', `Bearer ${token}`) : req;
  };

  const LOGIN = /* GraphQL */ `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        token
        user {
          id
          email
          roles
        }
      }
    }
  `;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = setupApp(moduleRef.createNestApplication());
    await app.init();

    await gql('mutation { executeSeed }').expect(200);
    const res = await gql(LOGIN, {
      input: { email: 'camila@ecopunto.co', password: 'Ecopunto123' },
    });
    citizenToken = res.body.data.login.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('login devuelve token y roles', async () => {
    const res = await gql(LOGIN, {
      input: { email: 'admin@ecopunto.co', password: 'Ecopunto123' },
    });
    expect(res.body.data.login.token).toBeDefined();
    expect(res.body.data.login.user.roles).toEqual(['admin']);
  });

  it('login con clave mala -> UNAUTHENTICATED', async () => {
    const res = await gql(LOGIN, {
      input: { email: 'camila@ecopunto.co', password: 'x' },
    });
    expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
  });

  it('register valida el input -> BAD_USER_INPUT', async () => {
    const res = await gql(
      `mutation { register(input: { fullName: "ab", email: "malo", password: "1" }) { token } }`,
    );
    expect(res.body.errors[0].extensions.code).toBe('BAD_USER_INPUT');
    expect(
      res.body.errors[0].extensions.validationErrors.length,
    ).toBeGreaterThan(0);
  });

  it('me sin token -> UNAUTHENTICATED', async () => {
    const res = await gql('{ me { id } }');
    expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
  });

  it('me con token -> usuario', async () => {
    const res = await gql(
      '{ me { email createdAt } }',
      undefined,
      citizenToken,
    );
    expect(res.body.data.me.email).toBe('camila@ecopunto.co');
  });

  it('citizen NO puede crear usuarios -> FORBIDDEN', async () => {
    const res = await gql(
      `mutation { createUser(input: { fullName: "Test User", email: "t@t.co", password: "Abc12345", roles: [citizen] }) { id } }`,
      undefined,
      citizenToken,
    );
    expect(res.body.errors[0].extensions.code).toBe('FORBIDDEN');
  });

  it('password nunca está en el schema', async () => {
    const res = await gql('{ me { password } }', undefined, citizenToken);
    expect(res.body.errors[0].extensions.code).toBe(
      'GRAPHQL_VALIDATION_FAILED',
    );
  });
});
