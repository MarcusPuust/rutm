/**
 * Ühised andmetüübid. Vastavad Supabase'i tabelitele (vt README "Andmemudel").
 * Muudatused siin mõjutavad kõiki – arutage enne tiimis.
 */

/** Tegevuse liik */
export type ActivityType = 'run' | 'walk' | 'bike';

/** Kasutaja profiil */
export interface Profile {
  id: string;
  name: string;
  avatarUrl: string | null;
  /** Mitu aktiivset päeva nädalas on eesmärk (2–5) */
  weeklyGoalDays: number;
  /** Mitu minutit liikumist teeb päeva aktiivseks */
  minMinutes: number;
}

/** Tiim */
export interface Team {
  id: string;
  name: string;
  inviteCode: string;
  memberIds: string[];
}

/** Üks GPS-punkt */
export interface RoutePoint {
  lat: number;
  lng: number;
  /** Aeg millisekundites (Date.now()) */
  timestamp: number;
}

/** Ühe kilomeetri vahetulemus */
export interface Split {
  km: number;
  /** Tempo sekundites kilomeetri kohta */
  paceSeconds: number;
}

/** Salvestatud trenn */
export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  /** ISO kuupäev, nt "2026-10-21T07:12:00Z" */
  startedAt: string;
  durationSeconds: number;
  distanceMeters: number;
  route: RoutePoint[];
  splits: Split[];
  /** Kas trenn on tiimi voos nähtav */
  sharedToTeam: boolean;
}

/** "Hoog" – reaktsioon trennile */
export interface Reaction {
  activityId: string;
  userId: string;
  createdAt: string;
}
