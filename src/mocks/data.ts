/**
 * Näidisandmed, et ekraane saaks teha enne, kui Supabase on valmis.
 * Sama sisu mis disainis (Marcus, Kadri, Tõnis, tiim "Hommikujooksjad").
 */
import type { Activity, Profile, Team } from '@/types';

export const mockProfiles: Profile[] = [
  { id: 'u1', name: 'Marcus', avatarUrl: null, weeklyGoalDays: 3, minMinutes: 15 },
  { id: 'u2', name: 'Kadri', avatarUrl: null, weeklyGoalDays: 3, minMinutes: 15 },
  { id: 'u3', name: 'Tõnis', avatarUrl: null, weeklyGoalDays: 3, minMinutes: 15 },
];

export const mockTeam: Team = {
  id: 't1',
  name: 'Hommikujooksjad',
  inviteCode: 'RUTM42',
  memberIds: ['u1', 'u2', 'u3'],
};

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    userId: 'u2',
    type: 'run',
    startedAt: '2026-10-22T07:10:00Z',
    durationSeconds: 1928,
    distanceMeters: 5400,
    route: [],
    splits: [],
    sharedToTeam: true,
  },
  {
    id: 'a2',
    userId: 'u1',
    type: 'walk',
    startedAt: '2026-10-19T19:05:00Z',
    durationSeconds: 2720,
    distanceMeters: 4100,
    route: [],
    splits: [],
    sharedToTeam: true,
  },
];
