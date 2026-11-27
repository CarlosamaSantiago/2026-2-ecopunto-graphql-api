const EARTH_RADIUS_KM = 6371;

const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Distancia en km entre dos coordenadas (fórmula de Haversine).
 * Sirve para ordenar puntos por cercanía y para probar el "recomendador".
 */
export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

/**
 * Misma fórmula pero como expresión SQL (PostgreSQL), para ordenar en la BD:
 *   qb.addSelect(haversineSql('p.latitude', 'p.longitude'), 'distance')
 *     .setParameters({ lat, lng })
 *     .orderBy('distance', 'ASC')
 */
export const haversineSql = (latCol: string, lngCol: string) =>
  `(${EARTH_RADIUS_KM} * acos(LEAST(1, cos(radians(:lat)) * cos(radians(${latCol})) * cos(radians(${lngCol}) - radians(:lng)) + sin(radians(:lat)) * sin(radians(${latCol})))))`;
