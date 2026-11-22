/**
 * Juurpaigutus: laeb fondid ja määrab ekraanigrupid.
 * Vastutaja: Liige 1 (suunamisloogika: Liige 2)
 *
 * Voog:
 *   sisse logimata        -> (auth)/welcome
 *   sisse logitud, uus     -> (onboarding)/goal
 *   sisse logitud, valmis  -> (tabs) ehk "/"
 */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { colors } from '@/theme';

/**
 * Rakendus alustab alati menüüga ekraanigrupist (tabs).
 * Ilma selleta võtab expo-router esimese grupi tähestiku järgi – (auth)/login.
 */
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Kuni fondid laevad, ei näita midagi (muidu vilksataks vale font).
  if (!fontsLoaded) return null;

  // TODO (Liige 2): kontrolli sessiooni (useSession) ja suuna õigesse gruppi.
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        {/* Salvestus avaneb täisekraanina menüü kohal */}
        <Stack.Screen name="record" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </>
  );
}
