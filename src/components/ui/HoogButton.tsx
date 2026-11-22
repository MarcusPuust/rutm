/**
 * "Hoog" nupp – reaktsioon tiimikaaslase trennile (nagu Strava kudos).
 * Vastutaja: Liige 1 (hoo salvestamine: Liige 6)
 *
 * Olekud:
 *  - tavaline:        valge, hall ääris
 *  - antud (pressed): laimiroheline, tume ääris
 *  - oma postitus (disabled): hall, ei saa vajutada, näitab ainult arvu
 *
 * Kasutus:
 *   <HoogButton count={2} pressed={iGaveHoog} onPress={toggleHoog} />
 *   <HoogButton count={2} pressed={false} disabled />   // oma postitus
 */
import { Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing, sizes } from '@/theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type Props = {
  /** Mitu hoogu on kokku antud */
  count: number;
  /** Kas mina olen hoogu andnud */
  pressed: boolean;
  onPress?: () => void;
  /** Oma postitusel ei saa endale hoogu anda */
  disabled?: boolean;
};

export function HoogButton({ count, pressed, onPress, disabled = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: pressed, disabled }}
      accessibilityLabel={`Hoog, ${count}`}
      disabled={disabled}
      onPress={onPress}
      style={[styles.base, disabled ? styles.disabled : pressed ? styles.pressed : styles.idle]}
    >
      <Icon name="hoog" size={20} strokeWidth={2.2} />
      <AppText variant="label" style={styles.text}>
        Hoog · {count}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: sizes.touch,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    alignSelf: 'flex-start',
  },
  idle: { backgroundColor: colors.surface, borderColor: colors.border },
  pressed: { backgroundColor: colors.accent, borderColor: colors.ink },
  disabled: { backgroundColor: colors.divider, borderColor: colors.ink },
  text: { fontSize: 14 },
});
