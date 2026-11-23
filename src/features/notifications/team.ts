/**
 * Tiimikaaslaste teated: hoog ja müks.
 * Vastutaja: Liige 1 (hoo ja müksu salvestamine: Liige 6)
 *
 * Praegu näidatakse need kohe lokaalse teavitusena (nt kui rakendus on lahti
 * ja tiimi andmetes tuleb uus hoog). Hiljem, kui Supabase on valmis, saadab sama
 * sisuga teavituse server (push) – siis jõuavad need kohale ka siis, kui rakendus on kinni.
 */
import * as Notifications from 'expo-notifications';
import { channels } from './setup';

/**
 * Teavitus: keegi andis sinu trennile hoogu.
 * @param fromName kes andis, nt "Martin"
 * @param activityTitle millisele trennile, nt "Õhtune kõnd"
 * @param total mitu hoogu sellel trennil nüüd kokku on
 * @param activityId trenni ID – teavitusele vajutades avatakse see postitus
 */
export async function notifyHoog(
  fromName: string,
  activityTitle: string,
  total: number,
  activityId: string,
): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${fromName} andis sulle hoogu`,
      body: `Sinu trennil „${activityTitle}" on nüüd ${total} hoogu.`,
      data: { url: `/team/post/${activityId}` },
    },
    trigger: { channelId: channels.team }, // kohe
  });
}

/**
 * Teavitus: tiimikaaslane müksas sind liikuma.
 * @param fromName kes müksas, nt "Kadri"
 * @param teamDaysLeft mitu päeva on tiimil nädala eesmärgist puudu
 */
export async function notifyNudge(fromName: string, teamDaysLeft: number): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${fromName} müksas sind`,
      body: `Tule liikuma! Tiimil on nädala eesmärgist puudu veel ${teamDaysLeft} päeva.`,
      data: { url: '/record/select' },
    },
    trigger: { channelId: channels.team }, // kohe
  });
}
