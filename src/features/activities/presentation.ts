/** Ajaloo ja kokkuvõtte kuvamisvormindus. */
import { formatDuration, formatPace } from '@/lib/format';
import type { Activity } from '@/types';
import { paceSecondsPerKm } from '@/features/tracking/geo';

/** Eesti kuupäeva vorming; kuu ja nädalapäeva esitäht vastavalt kontekstile. */
export function formatMonth(date: Date): string {
  const value = date.toLocaleDateString('et-EE', { month: 'long', year: 'numeric' });
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Nädalapäev ja kuupäev ajaloo nimekirja jaoks. */
export function formatShortDate(date: Date): string {
  return `${['P', 'E', 'T', 'K', 'N', 'R', 'L'][date.getDay()]}, ${date.toLocaleDateString('et-EE', { day: 'numeric', month: 'short' })}`;
}

/** Treeningu kestuse ja distantsi põhjal arvutatud keskmine tempo. */
export function activityPace(activity: Activity): string {
  const pace = paceSecondsPerKm(activity.durationSeconds, activity.distanceMeters);
  return formatPace(pace !== null && pace > 0 ? Math.round(pace) : null);
}

/** Kuu kogukestus lühikesel kujul. */
export function formatTotalTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes === 0 && seconds > 0 ? formatDuration(seconds) : `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')}`;
}
