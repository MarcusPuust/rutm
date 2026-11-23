/**
 * Lokaalsed meeldetuletused oma nädala kohta. Telefon ajastab need ise, serverit pole vaja.
 * Vastutaja: Liige 1
 *
 *  - Täna liikumata: ühekordne meeldetuletus täna õhtul, kui päev pole veel täis.
 *    Tühista see, kui kasutaja salvestab trenni (cancelTodayReminder – kasutab Liige 4).
 *  - Nädala meeldetuletus: iga laupäeva hommikul, et nädal on lõppemas.
 */
import * as Notifications from 'expo-notifications';
import { channels } from './setup';

/** Kindlad ID-d, et sama meeldetuletust saaks asendada või tühistada. */
const ids = {
  today: 'reminder-today',
  weekly: 'reminder-weekly',
} as const;

/** Mis kell tuleb "täna liikumata" meeldetuletus. */
const TODAY_REMINDER_HOUR = 19;

/**
 * Ajastab tänaseks õhtuks meeldetuletuse "Täna on veel liikumata".
 * Kui kell on juba möödas, ei tee midagi.
 * @param weekDone mitu aktiivset päeva sel nädalal on juba täis
 * @param weekGoal nädala eesmärk (päevi)
 */
export async function scheduleTodayReminder(weekDone: number, weekGoal: number): Promise<void> {
  const at = new Date();
  at.setHours(TODAY_REMINDER_HOUR, 0, 0, 0);
  if (at.getTime() <= Date.now()) return;

  await Notifications.scheduleNotificationAsync({
    identifier: ids.today, // sama ID asendab varasema
    content: {
      title: 'Täna on veel liikumata',
      body: `15 minutit liikumist teeb päeva täis. Sinu nädal: ${weekDone} / ${weekGoal}.`,
      data: { url: '/record/select' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: at,
      channelId: channels.reminders,
    },
  });
}

/** Tühistab tänase meeldetuletuse – kutsu pärast trenni salvestamist. */
export async function cancelTodayReminder(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(ids.today);
}

/**
 * Ajastab korduva meeldetuletuse igaks laupäevaks kell 10.
 * Kutsu pärast seda, kui kasutaja on teavitused lubanud.
 */
export async function scheduleWeeklyReminder(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    identifier: ids.weekly,
    content: {
      title: 'Nädalavahetus on käes',
      body: 'Vaata, kas su nädala eesmärk on täis – veel on aega.',
      data: { url: '/' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: 7, // 1 = pühapäev … 7 = laupäev
      hour: 10,
      minute: 0,
      channelId: channels.reminders,
    },
  });
}

/** Tühistab kõik meeldetuletused, nt kui kasutaja lülitab need profiilis välja. */
export async function cancelAllReminders(): Promise<void> {
  await Promise.all([
    Notifications.cancelScheduledNotificationAsync(ids.today),
    Notifications.cancelScheduledNotificationAsync(ids.weekly),
  ]);
}
