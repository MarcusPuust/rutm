/**
 * Numbrikast: silt + suur väärtus (+ ühik). Nt "Tempo 5:47 /km".
 * Kasutavad salvestus, trenni kokkuvõte ja postitus.
 * Vastutaja: Liige 1
 *
 * Kasutus:
 *   <StatCard label="Distants" value="4,2" unit="km" />
 *   <StatCard label="Tempo" value="5:47" unit="/km" />
 * Mitu kasti kõrvuti: pane need flexDirection: 'row' konteinerisse – iga kast võtab võrdse laiuse.
 */
import { View, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { AppText } from './AppText';

type Props = {
  /** Väike silt üleval, nt "Aeg" */
  label: string;
  /** Väärtus, nt "24:18" */
  value: string;
  /** Väiksemalt väärtuse järel, nt "/km" (valikuline) */
  unit?: string;
  /** "light" – valge kast (vaikimisi), "dark" – tume kast */
  variant?: 'light' | 'dark';
};

export function StatCard({ label, value, unit, variant = 'light' }: Props) {
  const dark = variant === 'dark';
  return (
    <View style={[styles.card, dark && styles.dark]}>
      <AppText variant="label" color={dark ? 'onDarkMuted' : 'muted'}>
        {label}
      </AppText>
      <AppText variant="stat" color={dark ? 'onDark' : 'ink'} numberOfLines={1}>
        {value}
        {unit ? (
          <AppText variant="body" color={dark ? 'onDark' : 'ink'}>
            {' '}
            {unit}
          </AppText>
        ) : null}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.chip,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: 2,
  },
  dark: { backgroundColor: colors.ink },
});
