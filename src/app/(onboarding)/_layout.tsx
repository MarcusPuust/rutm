/**
 * Paigutus grupile (onboarding): tavaline Stack ilma päiseta.
 * Vastutaja: Liige 3
 */
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
