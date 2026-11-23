/**
 * Teavituste loa kontrollimine ja küsimine.
 * Vastutaja: Liige 1 (loa küsimise ekraan 7: Liige 3)
 *
 * Kasutus ekraanil 7 "Teavitused":
 *   const granted = await requestNotificationPermission();
 */
import * as Notifications from 'expo-notifications';

/**
 * Kas kasutaja on teavitused lubanud?
 * @returns true, kui luba on olemas
 */
export async function hasNotificationPermission(): Promise<boolean> {
  const { granted } = await Notifications.getPermissionsAsync();
  return granted;
}

/**
 * Küsib teavituste luba (näitab süsteemi akent, kui seda pole veel küsitud).
 * @returns true, kui kasutaja lubas
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (await hasNotificationPermission()) return true;
  const { granted } = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: true, allowSound: true },
  });
  return granted;
}
