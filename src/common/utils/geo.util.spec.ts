import { haversineKm } from './geo.util.js';

describe('haversineKm', () => {
  it('devuelve 0 para el mismo punto', () => {
    expect(haversineKm(3.4516, -76.532, 3.4516, -76.532)).toBe(0);
  });

  it('calcula entre 6 y 7 km entre Unicentro y San Fernando (Cali)', () => {
    const d = haversineKm(3.3731, -76.5398, 3.4319, -76.5432);
    expect(d).toBeGreaterThan(6);
    expect(d).toBeLessThan(7);
  });
});
