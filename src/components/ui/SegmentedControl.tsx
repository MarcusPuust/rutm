/**
 * Ovaalne lüliti vaadete vahel: "Rütm ↔ Kaart", "Ülevaade ↔ Voog".
 * Valitud valik on laimirohelise ovaaliga.
 * Vastutaja: Liige 1
 *
 * Kasutus:
 *   const [view, setView] = useState<'rhythm' | 'map'>('rhythm');
 *   <SegmentedControl
 *     options={[{ label: 'Rütm', value: 'rhythm' }, { label: 'Kaart', value: 'map' }]}
 *     value={view}
 *     onChange={setView}
 *   />
 */
import { View, Pressable, StyleSheet } from 'react-native';
import { colors, radius, sizes } from '@/theme';
import { AppText } from './AppText';

type Option<T extends string> = {
  /** Nähtav tekst */
  label: string;
  /** Väärtus, mis antakse onChange'ile */
  value: T;
};

type Props<T extends string> = {
  options: Option<T>[];
  /** Praegu valitud väärtus */
  value: T;
  /** Kutsutakse, kui kasutaja valib teise valiku */
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View style={styles.root} accessibilityRole="tablist">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[styles.item, selected && styles.selected]}
          >
            <AppText variant="label" color={selected ? 'ink' : 'inkSoft'} style={styles.text}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  item: {
    flex: 1,
    height: sizes.touch,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: { backgroundColor: colors.accent },
  text: { fontSize: 15 },
});
