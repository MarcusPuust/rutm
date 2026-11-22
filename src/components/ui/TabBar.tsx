/**
 * Ovaalse alumise menüü osad (Täna, Tiim, "+", Ajalugu, Profiil).
 * Vastutaja: Liige 1
 *
 * Expo Router SDK 58 kohandatud menüü (expo-router/ui):
 *  - TabBar:       valge ovaalne riba, hõljub ekraani alaservast eemal.
 *  - TabBarButton: üks menüünupp ikooni ja tekstiga. TabTrigger annab talle prop'i `isFocused`.
 *  - PlusButton:   keskmine tume "+" ring, avab trenni salvestuse.
 * Kasutus: src/app/(tabs)/_layout.tsx
 */
import type { ReactNode } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '@/theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

/** Menüü riba. Alumine vahe arvestab telefoni kodunupu/žestiriba alaga. */
export function TabBar({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { marginBottom: Math.max(insets.bottom, spacing.lg) }]}>
      {children}
    </View>
  );
}

// `ref` jäetakse välja: TabTrigger'i ref-tüüp ei klapi Pressable'iga ja nupp ei vaja seda.
type TabBarButtonProps = Omit<TabTriggerSlotProps, 'ref'> & {
  /** Ikooni all olev tekst */
  label: string;
  /** Ikoon teksti kohal */
  icon: IconName;
};

/** Üks menüünupp. Aktiivne nupp on laimirohelise ovaaliga, ikoon ja tekst tumedad. */
export function TabBarButton({ label, icon, isFocused, ...props }: TabBarButtonProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      style={[styles.tab, isFocused && styles.tabActive]}
    >
      <Icon name={icon} size={22} color={isFocused ? colors.ink : colors.muted} />
      <AppText
        variant="caption"
        color={isFocused ? 'ink' : 'muted'}
        style={isFocused && styles.labelActive}
      >
        {label}
      </AppText>
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
      <Icon name="plus" size={28} color={colors.accent} strokeWidth={2.6} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    padding: 6,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    // Pehme vari (iOS: shadow*, Android: elevation)
    shadowColor: colors.ink,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: radius.pill,
  },
  tabActive: { backgroundColor: colors.accent },
  labelActive: { fontFamily: fonts.bodySemiBold },
  plus: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});
