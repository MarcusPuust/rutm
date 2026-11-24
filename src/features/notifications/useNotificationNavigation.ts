/**
 * Kui kasutaja vajutab teavitusele, avatakse teavituse `data.url` ekraan
 * (nt "Kadri müksas sind" → tegevuse valik).
 * Vastutaja: Liige 1
 *
 * Kasutatakse üks kord juurpaigutuses (src/app/_layout.tsx).
 */
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { router, type Href } from 'expo-router';
import * as Notifications from 'expo-notifications';

/** Loeb teavitusest aadressi ja avab selle ekraani. */
function openFromResponse(response: Notifications.NotificationResponse) {
  const url = response.notification.request.content.data?.url;
  if (typeof url === 'string') router.push(url as Href);
}

/**
 * @param ready true, kui navigatsioon on valmis (juurpaigutus on ekraanid joonistanud).
 *              Enne seda ei saa teisele ekraanile minna.
 */
export function useNotificationNavigation(ready: boolean): void {
  useEffect(() => {
    if (Platform.OS === 'web' || !ready) return;

    // Rakendus avati teavitusele vajutades, kui see oli täiesti kinni
    const last = Notifications.getLastNotificationResponse();
    if (last) openFromResponse(last);

    // Teavitusele vajutati, kui rakendus oli lahti või taustal
    const subscription = Notifications.addNotificationResponseReceivedListener(openFromResponse);
    return () => subscription.remove();
  }, [ready]);
}
