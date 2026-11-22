/**
 * Vormindusfunktsioonid kuvamiseks. Kasutavad kõik ekraanid.
 */

/**
 * Kestus kujul "32:08" või "1:12:40".
 * @param totalSeconds kestus sekundites
 */
export function formatDuration(totalSeconds: number): string {
  const s = Math.floor(totalSeconds % 60);
  const m = Math.floor((totalSeconds / 60) % 60);
  const h = Math.floor(totalSeconds / 3600);
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/**
 * Distants kujul "5,4 km" (eesti komaga).
 * @param meters distants meetrites
 */
export function formatDistance(meters: number): string {
  return `${(meters / 1000).toFixed(1).replace('.', ',')} km`;
}

/**
 * Tempo kujul "5:57" (lisa ise " /km").
 * @param secondsPerKm tempo sekundites kilomeetri kohta
 */
export function formatPace(secondsPerKm: number | null): string {
  if (secondsPerKm == null || !isFinite(secondsPerKm)) return '–';
  return formatDuration(secondsPerKm);
}
