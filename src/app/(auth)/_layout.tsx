/**
 * Paigutus grupile (auth): tavaline Stack ilma päiseta.
 * Vastutaja: Liige 2
 */
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
