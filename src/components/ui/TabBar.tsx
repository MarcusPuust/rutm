/**
 * Ovaalse alumise menüü osad (Täna, Tiim, "+", Ajalugu, Profiil).
 * Vastutaja: Liige 1
 *
 * Expo Router SDK 58 kohandatud menüü (expo-router/ui):
 *  - TabBarButton: üks menüünupp. TabTrigger annab talle prop'i `isFocused`.
 *  - PlusButton:   keskmine tume "+" ring, avab trenni salvestuse.
 *  - tabBarStyles: menüü riba stiil.
 * Kasutus: src/app/(tabs)/_layout.tsx
 *
 * TODO (Liige 1): lisa ikoonid nuppude kohale (vt disain).
 */
import { Pressable, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import { colors, fonts, radius } from '@/theme';

// `ref` jäetakse välja: TabTrigger'i ref-tüüp ei klapi Pressable'iga ja nupp ei vaja seda.
type TabBarButtonProps = Omit<TabTriggerSlotProps, 'ref'> & {
  /** Nupu all olev tekst */
  label: string;
};

/** Üks menüünupp. Aktiivne nupp on laimirohelise ovaaliga. */
export function TabBarButton({ label, isFocused, ...props }: TabBarButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      style={[styles.tab, isFocused && styles.tabActive]}
    >
      <Text style={[styles.label, isFocused && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

/** Keskmine "+" nupp. Ei ole vahekaart – avab ekraani 10 "Vali tegevus". */
export function PlusButton() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Alusta liikumist"
      onPress={() => router.push('/record/select')}
      style={styles.plus}
    >
      <Text style={styles.plusText}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: radius.pill },
  tabActive: { backgroundColor: colors.accent },
  label: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.muted },
  labelActive: { fontFamily: fonts.bodySemiBold, color: colors.ink },
  plus: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  plusText: { color: colors.accent, fontSize: 30, lineHeight: 34 },
});

/** Menüü riba: valge, ovaalne, hõljub ekraani servadest eemal. */
export const tabBarStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 6,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    shadowColor: colors.ink,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
});
