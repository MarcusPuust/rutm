/**
 * Teavituste üldseadistus: kuidas teavitusi näidatakse ja Androidi kanalid.
 * Vastutaja: Liige 1
 *
 * Kutsutakse üks kord rakenduse käivitamisel (src/app/_layout.tsx).
 */
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { colors } from '@/theme';

/**
 * Androidi teavituskanalid. Kasutaja saab telefoni seadetes iga kanali eraldi välja lülitada.
 *  - team:      tiimikaaslaste hood ja müksud (olulisem, tuleb ekraani ülaserva)
 *  - reminders: meeldetuletused oma nädala kohta
 */
export const channels = {
  team: 'team',
  reminders: 'reminders',
} as const;

/** Kas seadistus on juba tehtud (et mitte kaks korda kutsuda). */
let configured = false;

/**
 * Seadistab teavitused. Ohutu kutsuda mitu korda – tegelikult tehakse ainult esimesel korral.
 */
export async function configureNotifications(): Promise<void> {
  if (configured) return;
  configured = true;

  // Kuidas näidata teavitust, kui rakendus on parasjagu lahti.
  // NB! Androidis peab heli olema lubatud, muidu ei ilmu teavitus ekraani ülaserva.
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(channels.team, {
      name: 'Tiim – hood ja müksud',
      importance: Notifications.AndroidImportance.HIGH,
      lightColor: colors.accent,
    });
    await Notifications.setNotificationChannelAsync(channels.reminders, {
      name: 'Meeldetuletused',
      importance: Notifications.AndroidImportance.DEFAULT,
      lightColor: colors.accent,
    });
  }
}
