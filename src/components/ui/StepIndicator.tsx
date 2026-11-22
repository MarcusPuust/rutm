/**
 * Seadistuse sammude näidik (nt 2 / 5) – lühikesed ovaalsed ribad.
 * Tehtud ja praegune samm on tumedad, ülejäänud hallid.
 * Vastutaja: Liige 1
 *
 * Kasutus: <StepIndicator step={2} total={5} />
 */
import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme';

type Props = {
  /** Praegune samm (alates 1) */
  step: number;
  /** Sammude arv kokku */
  total: number;
};

export function StepIndicator({ step, total }: Props) {
  return (
    <View style={styles.row} accessibilityLabel={`Samm ${step} / ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[styles.bar, { backgroundColor: i < step ? colors.ink : colors.border }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6 },
  bar: { width: 22, height: 8, borderRadius: 4 },
});
