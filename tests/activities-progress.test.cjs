/** Liige 5: ühise arvutusloogika testid (Node 22+). */
const assert = require('node:assert/strict');
const { test } = require('node:test');
const {
  dayKey, startOfWeek, addDays, activeDayKeys, getWeekProgress,
  getStreak, getMonthStatistics, monthCells,
} = require('../src/features/activities/progress.ts');
const goal = { minMinutes: 15, weeklyGoalDays: 3 };
const date = (day, month = 10, year = 2026) => new Date(year, month - 1, day, 12);
let id = 0;
const activity = (d, durationSeconds = 900, distanceMeters = 1000) => ({
  id: String(++id), userId: 'u1', type: 'run', startedAt: d.toISOString(),
  durationSeconds, distanceMeters, route: [], splits: [], sharedToTeam: false,
});
const week = (first) => [0, 2, 4].map((offset) => activity(addDays(first, offset)));

test('Aktiivne päev: mitu trenni samal päeval liidetakse', () => {
  const items = [activity(date(5), 300), activity(date(5), 600), activity(date(6), 899)];
  assert.deepEqual([...activeDayKeys(items, 15)], ['2026-10-05']);
});
test('Nädal algab esmaspäeval ja ületab kuupiiri', () => {
  assert.equal(dayKey(startOfWeek(date(1))), '2026-09-28');
});
test('Nädal: tänane, möödunud, tulevane ja täis päev', () => {
  const result = getWeekProgress([activity(date(5)), activity(date(7)), activity(date(9))], goal, date(8), date(8));
  assert.deepEqual(result.days, ['done', 'rest', 'done', 'today', 'future', 'future', 'future']);
  assert.equal(result.activeDays, 2);
  assert.equal(result.complete, false);
});
test('Pooleliolev nädal ei katkesta eelmiste nädalate rütmi', () => {
  const items = [...week(date(5)), ...week(date(12)), activity(date(19))];
  assert.equal(getStreak(items, goal, date(21)), 2);
});
test('Täis käesolev nädal läheb kohe rütmi arvesse', () => {
  const items = [...week(date(5)), ...week(date(12)), ...week(date(19))];
  assert.equal(getStreak(items, goal, date(23)), 3);
});
test('Vahele jäänud nädal katkestab rütmi', () => {
  assert.equal(getStreak(week(date(5)), goal, date(21)), 0);
});
test('Kuu statistika kasutab ainult valitud kuu trenne ja sorteerib uuemad ette', () => {
  const first = activity(date(1), 600, 2000);
  const second = activity(date(1), 300, 1000);
  const third = activity(date(5), 1200, 3000);
  const result = getMonthStatistics([first, activity(date(30, 9)), second, third], date(1), 15);
  assert.equal(result.activeDays.size, 2);
  assert.equal(result.durationSeconds, 2100);
  assert.equal(result.distanceMeters, 6000);
  assert.equal(result.activities[0].id, third.id);
});
test('Tühi ajalugu', () => {
  const result = getMonthStatistics([], date(1), 15);
  assert.equal(result.activeDays.size, 0);
  assert.equal(result.durationSeconds, 0);
  assert.equal(getStreak([], goal, date(1)), 0);
});
test('Kalender: oktoober 2026 algab neljapäeval', () => {
  const cells = monthCells(date(1));
  assert.equal(cells.length, 35);
  assert.deepEqual(cells.slice(0, 3), [null, null, null]);
  assert.equal(cells[3].getDate(), 1);
});
test('Kalender: liigaasta veebruar ja aastavahetus', () => {
  assert.equal(monthCells(date(1, 2, 2024)).filter(Boolean).length, 29);
  assert.equal(dayKey(addDays(date(31, 12), 1)), '2027-01-01');
});
