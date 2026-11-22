/**
 * Lüliti (sees/väljas), nt "Jaga tiimi voogu" trenni kokkuvõttes.
 * Sees: tume rada, laimiroheline nupp paremal. Väljas: hall rada, valge nupp vasakul.
 * Vastutaja: Liige 1
 *
 * Kasutus:
 *   <Toggle value={shared} onValueChange={setShared} accessibilityLabel="Jaga tiimi voogu" />
 */
import { Pressable, View, StyleSheet } from 'react-native';
import { colors } from '@/theme';

type Props = {
  /** Kas lüliti on sees */
  value: boolean;
  /** Kutsutakse uue väärtusega, kui kasutaja vajutab */
  onValueChange: (value: boolean) => void;
  /** Ekraanilugeja jaoks, nt "Jaga tiimi voogu" */
  accessibilityLabel: string;
};

export function Toggle({ value, onValueChange, accessibilityLabel }: Props) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      hitSlop={8}
      style={[styles.track, value ? styles.on : styles.off]}
    >
      <View style={[styles.knob, { backgroundColor: value ? colors.accent : colors.surface }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { width: 56, height: 34, borderRadius: 17, padding: 3, flexDirection: 'row' },
  on: { backgroundColor: colors.ink, justifyContent: 'flex-end' },
  off: { backgroundColor: colors.border, justifyContent: 'flex-start' },
  knob: { width: 28, height: 28, borderRadius: 14 },
});
