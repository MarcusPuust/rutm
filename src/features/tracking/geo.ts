/**
 * Geograafilised arvutused trenni salvestamiseks.
 * Vastutaja: Liige 4
 */
import type { RoutePoint } from '@/types';

const EARTH_RADIUS_M = 6_371_000;

/** Kraadid radiaanideks. */
const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Kahe punkti vaheline kaugus meetrites (haversine valem).
 * @param a esimene punkt
 * @param b teine punkt
 * @returns kaugus meetrites
 */
export function distanceBetween(a: RoutePoint, b: RoutePoint): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

/**
 * Kogu marsruudi pikkus meetrites.
 * @param route GPS-punktid ajalises järjekorras
 */
export function routeDistance(route: RoutePoint[]): number {
  let total = 0;
  for (let i = 1; i < route.length; i++) total += distanceBetween(route[i - 1], route[i]);
  return total;
}

/**
 * Keskmine tempo sekundites kilomeetri kohta.
 * @returns tempo või null, kui distants on liiga väike
 */
export function paceSecondsPerKm(durationSeconds: number, distanceMeters: number): number | null {
  if (distanceMeters < 50) return null;
  return durationSeconds / (distanceMeters / 1000);
}
