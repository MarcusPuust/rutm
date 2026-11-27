/** Ajutine mälupõhine andmeallikas. TODO: asendada Supabase'i ja sessiooni päringutega. */
import { useSyncExternalStore } from 'react';
import { mockActivities, mockProfiles } from '@/mocks/data';
import type { Activity, ActivityType, RoutePoint } from '@/types';
import { addDays, startOfWeek } from './progress';

export const demoProfile = mockProfiles[0];

/** Näidismarsruut (mitte tegelik salvestus). */
function sampleRoute(start: number): RoutePoint[] {
  return [
    [59.427, 24.741], [59.430, 24.741], [59.430, 24.750], [59.435, 24.750],
    [59.437, 24.759], [59.431, 24.760], [59.431, 24.771],
  ].map(([lat, lng], i) => ({ lat, lng, timestamp: start + i * 300000 }));
}

/** Loob ühe treeningu näidisandmed, lähtudes kuupäevast ja liigist. */
function sampleActivity(date: Date, type: ActivityType, id: string): Activity {
  const startedAt = date.toISOString();
  const metrics = {
    run: { durationSeconds: 1928, distanceMeters: 5400 },
    walk: { durationSeconds: 2720, distanceMeters: 4100 },
    bike: { durationSeconds: 4360, distanceMeters: 24600 },
  }[type];
  return {
    id, userId: demoProfile.id, type, startedAt, ...metrics,
    route: type === 'run' ? sampleRoute(date.getTime()) : [],
    splits: type === 'run' ? [348, 362, 355, 358, 351].map((paceSeconds, i) => ({ km: i + 1, paceSeconds })) : [],
    sharedToTeam: false,
  };
}

/** Viimase kuue nädala realistlikud, alati minevikku jäävad testandmed. */
function seedActivities(): Activity[] {
  const today = new Date();
  const monday = startOfWeek(today);
  const seed = mockActivities.filter((activity) => activity.userId === demoProfile.id);
  for (let week = 0; week < 6; week++) {
    for (const [offset, type] of [[0, 'run'], [2, 'walk'], [4, 'bike']] as const) {
      const date = addDays(monday, offset - week * 7);
      date.setHours(7, 12);
      if (date < addDays(today, 0)) seed.push(sampleActivity(date, type, `demo-${week}-${offset}`));
    }
  }
  return seed;
}

let activities = seedActivities();
const listeners = new Set<() => void>();
let draftNumber = 0;

/** Loob testimiseks salvestamata trenni; päris salvestuse annab Liige 4. */
export function createDemoActivity(): Activity {
  draftNumber++;
  return sampleActivity(new Date(), 'run', `draft-${Date.now()}-${draftNumber}`);
}

/** Mälus olevate trennide muutuste tellimine. */
function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/** Tagastab muutumatuna sama andmestiku kuni järgmise salvestuseni. */
function getSnapshot(): Activity[] { return activities; }

/** Aktiivse näidiskasutaja trennid; uuendab kõiki vaateid pärast salvestust. */
export function useActivities(): Activity[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

/** Lisab või uuendab trenni ID järgi. TODO: päris salvestus ja jagamine Supabase'is. */
export function saveActivity(activity: Activity): void {
  activities = [...activities.filter((item) => item.id !== activity.id), activity];
  listeners.forEach((listener) => listener());
}
