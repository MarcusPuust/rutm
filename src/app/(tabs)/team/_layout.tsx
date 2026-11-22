/**
 * Paigutus grupile (tabs)/team: tavaline Stack ilma päiseta.
 * Vastutaja: Liige 6
 */
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
