/**
 * Paigutus grupile (tabs)/history: tavaline Stack ilma päiseta.
 * Vastutaja: Liige 5
 */
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
