/**
 * Väike ovaalne valikunupp, nt ajaloo filtrid "Kõik / Jooks / Kõnd / Ratas".
 * Valitud nupp on tume, valimata nupp valge halli äärisega.
 * Vastutaja: Liige 1
 *
 * Kasutus:
 *   <Chip label="Kõik" selected={filter === 'all'} onPress={() => setFilter('all')} />
 *   <Chip label="Jooks" icon="run" selected={filter === 'run'} onPress={() => setFilter('run')} />
 */
import { Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';

type Props = {
  label: string;
  /** Kas see valik on aktiivne */
  selected?: boolean;
  /** Ikoon teksti ees (valikuline) */
  icon?: IconName;
  onPress?: () => void;
};

export function Chip({ label, selected = false, icon, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected ? styles.selected : styles.idle]}
    >
      {icon ? <Icon name={icon} size={18} color={selected ? colors.onDark : colors.ink} /> : null}
      <AppText variant="label" color={selected ? 'onDark' : 'ink'} style={styles.text}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 40,
    paddingHorizontal: spacing.md,
    borderRadius: radius.chip,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  idle: { backgroundColor: colors.surface, borderColor: colors.border },
  selected: { backgroundColor: colors.ink, borderColor: colors.ink },
  text: { fontSize: 14 },
});
