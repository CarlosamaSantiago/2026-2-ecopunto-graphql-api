import { ValidRoles } from '../../users/enums/valid-roles.enum.js';

/**
 * Datos iniciales. Contraseñas en texto plano SOLO aquí (el seed las hashea).
 * Credenciales documentadas en el README para la sustentación.
 */
export const SEED_PASSWORD = 'Ecopunto123';

export const seedUsers = [
  {
    fullName: 'Admin EcoPunto',
    email: 'admin@ecopunto.co',
    roles: [ValidRoles.admin],
  },
  {
    fullName: 'Operador San Fernando',
    email: 'operador@ecopunto.co',
    roles: [ValidRoles.operator],
  },
  {
    fullName: 'Camila Rodríguez',
    email: 'camila@ecopunto.co',
    roles: [ValidRoles.citizen],
    phone: '+57 300 000 0000',
  },
];

export const seedCategories = [
  {
    slug: 'pilas',
    name: 'Pilas',
    description: 'AA, AAA, de botón y recargables',
    deliveryInstructions:
      'Cubre los polos con cinta y entrégalas en una bolsa. Las pilas en la basura contaminan el suelo y el agua.',
    icon: 'battery',
    pointsReward: 50,
  },
  {
    slug: 'electronicos',
    name: 'Electrónicos pequeños',
    description: 'Cargadores, celulares, cables, audífonos',
    deliveryInstructions:
      'Borra tus datos personales y entrega los aparatos completos, sin desarmar.',
    icon: 'smartphone',
    pointsReward: 80,
  },
  {
    slug: 'aceite',
    name: 'Aceite de cocina usado',
    description: 'En botella plástica bien cerrada',
    deliveryInstructions:
      'Entrega el aceite frío en una botella plástica bien cerrada. 1 litro puede contaminar 40.000 L de agua.',
    icon: 'droplet',
    pointsReward: 50,
  },
];

/**
 * TODO(Joshua): completar hasta ~20 puntos de Cali (el pitch habla de 20 revisados).
 * Coordenadas aproximadas; categories = slugs de arriba.
 */
export const seedCollectionPoints = [
  {
    name: 'Punto Verde Unicentro',
    address: 'Cra. 100 # 5-169',
    neighborhood: 'Ciudad Jardín',
    latitude: 3.3737,
    longitude: -76.5395,
    isVerified: true,
    categories: ['pilas', 'electronicos'],
    openingHours: [1, 2, 3, 4, 5, 6, 0].map((day) => ({
      day,
      opens: '10:00',
      closes: '21:00',
    })),
  },
  {
    name: 'EcoAcopio San Fernando',
    address: 'Cl. 5 # 38-12',
    neighborhood: 'San Fernando',
    latitude: 3.4372,
    longitude: -76.5441,
    isVerified: true,
    categories: ['aceite', 'pilas'],
    operatorEmail: 'operador@ecopunto.co',
    openingHours: [1, 2, 3, 4, 5, 6].map((day) => ({
      day,
      opens: '07:00',
      closes: '18:00',
    })),
  },
];

/** TODO(María José): catálogo de recompensas (pantalla "Canjea tus puntos"). */
export const seedRewards = [
  {
    title: '10% en supermercado',
    cost: 500,
    icon: 'tag',
    partner: 'Supermercado aliado',
  },
  {
    title: 'Café gratis aliado',
    cost: 800,
    icon: 'coffee',
    partner: 'Café aliado',
  },
  { title: 'Siembra un árbol', cost: 1500, icon: 'sprout', partner: 'DAGMA' },
];
