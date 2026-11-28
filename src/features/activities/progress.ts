/** Aktiivsete päevade, nädalate, rütmi ja kuu statistika ühine arvutusloogika. */
import type { Activity, Profile } from '@/types';

export type ActivityGoal = Pick<Profile, 'minMinutes' | 'weeklyGoalDays'>;
export type WeekDayStatus = 'done' | 'rest' | 'today' | 'future';

/** Kohalik kuupäev YYYY-MM-DD; UTC kuupäev võib olla teisel päeval. */
export function dayKey(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Liidab kohaliku kalendri päevi (ka suve- ja talveaja vahetusel). */
export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

/** Tagastab antud nädala esmaspäeva kohaliku aja järgi. */
export function startOfWeek(date: Date): Date {
  return addDays(date, -((date.getDay() + 6) % 7));
}

/** Koondab ühe kasutaja trennide kestuse kohalike päevade kaupa. */
export function dailySeconds(activities: readonly Activity[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const activity of activities) {
    const key = dayKey(new Date(activity.startedAt));
    totals.set(key, (totals.get(key) ?? 0) + activity.durationSeconds);
  }
  return totals;
}

/** Tagastab päevad, mil trennide kogukestus täidab päevase eesmärgi. */
export function activeDayKeys(activities: readonly Activity[], minMinutes: number): Set<string> {
  return new Set(
    [...dailySeconds(activities)]
      .filter(([, seconds]) => seconds >= minMinutes * 60)
      .map(([key]) => key),
  );
}

/** Nädala progress esmaspäevast pühapäevani; referenceDate määrab vaadeldava nädala. */
export function getWeekProgress(
  activities: readonly Activity[],
  goal: ActivityGoal,
  referenceDate = new Date(),
  today = new Date(),
) {
  const active = activeDayKeys(activities, goal.minMinutes);
  const start = startOfWeek(referenceDate);
  const todayKey = dayKey(today);
  const days: WeekDayStatus[] = Array.from({ length: 7 }, (_, i) => {
    const key = dayKey(addDays(start, i));
    if (key > todayKey) return 'future';
    if (active.has(key)) return 'done';
    return key === todayKey ? 'today' : 'rest';
  });
  const activeDays = days.filter((status) => status === 'done').length;
  return {
    days,
    activeDays,
    goalDays: goal.weeklyGoalDays,
    complete: activeDays >= goal.weeklyGoalDays,
  };
}

/**
 * Edukate nädalate arv järjest. Pooleliolev nädal ei katkesta rütmi;
 * täidetud käesolev nädal läheb kohe arvesse. Eesmärk on praegu sama kõigil nädalatel.
 */
export function getStreak(
  activities: readonly Activity[],
  goal: ActivityGoal,
  today = new Date(),
): number {
  if (goal.weeklyGoalDays < 1 || goal.weeklyGoalDays > 7) return 0;
  const active = activeDayKeys(activities, goal.minMinutes);
  const todayKey = dayKey(today);
  const counts = new Map<string, number>();
  for (const key of active) {
    if (key > todayKey) continue;
    const [year, month, day] = key.split('-').map(Number);
    const monday = dayKey(startOfWeek(new Date(year, month - 1, day)));
    counts.set(monday, (counts.get(monday) ?? 0) + 1);
  }
  let week = startOfWeek(today);
  if ((counts.get(dayKey(week)) ?? 0) < goal.weeklyGoalDays) week = addDays(week, -7);
  let streak = 0;
  while ((counts.get(dayKey(week)) ?? 0) >= goal.weeklyGoalDays) {
    streak++;
    week = addDays(week, -7);
  }
  return streak;
}

/** Valitud kuu statistika ja trennid uuemast vanemani; filtrid statistikat ei muuda. */
export function getMonthStatistics(
  activities: readonly Activity[],
  month: Date,
  minMinutes: number,
) {
  const prefix = dayKey(month).slice(0, 7);
  const items = activities
    .filter((activity) => dayKey(new Date(activity.startedAt)).startsWith(prefix))
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  const activeDays = activeDayKeys(items, minMinutes);
  return {
    activities: items,
    activeDays,
    durationSeconds: items.reduce((sum, activity) => sum + activity.durationSeconds, 0),
    distanceMeters: items.reduce((sum, activity) => sum + activity.distanceMeters, 0),
  };
}

/** Kalendri lahtrid esmaspäevast; null tähistab valitud kuust väljapoole jäävat päeva. */
export function monthCells(month: Date): (Date | null)[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return Array.from({ length: Math.ceil((offset + count) / 7) * 7 }, (_, i) =>
    i < offset || i >= offset + count ? null : addDays(first, i - offset),
  );
}
