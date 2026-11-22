/**
 * Nädala 7 päeva täppidena (E–P). Kasutavad Täna, Tiim ja trenni kokkuvõte.
 * Vastutaja: Liige 1 (päevade olekud arvutab Liige 5 – src/features/activities)
 *
 * Päeva olekud:
 *  - done:   päev täis (laimiroheline, linnuke)
 *  - rest:   möödunud päev ilma trennita (punktiirjoon)
 *  - today:  tänane päev (rõngas)
 *  - future: tulev päev
 *
 * Kasutus:
 *   <WeekDots days={['done', 'rest', 'done', 'today', 'future', 'future', 'future']} />
 */
import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

export type DayStatus = 'done' | 'rest' | 'today' | 'future';

const dayLabels = ['E', 'T', 'K', 'N', 'R', 'L', 'P'];

type Props = {
  /** 7 päeva olekud esmaspäevast pühapäevani */
  days: DayStatus[];
  /** "dark" – tumedal kaardil (vaikimisi), "light" – heledal taustal */
  variant?: 'dark' | 'light';
  /** Täpi läbimõõt, vaikimisi 36 */
  size?: number;
};

export function WeekDots({ days, variant = 'dark', size = 36 }: Props) {
  const dark = variant === 'dark';

  /** Täpi välimus vastavalt päeva olekule. */
  const dotStyle = (status: DayStatus) => {
    switch (status) {
      case 'done':
        return { backgroundColor: colors.accent };
      case 'rest':
        return { borderWidth: 2, borderStyle: 'dashed' as const, borderColor: colors.muted };
      case 'today':
        return { borderWidth: 2, borderColor: dark ? colors.accent : colors.ink };
      case 'future':
        return { backgroundColor: dark ? colors.inkRaised : colors.divider };
    }
  };

  return (
    <View style={styles.row}>
      {days.map((status, i) => (
        <View key={dayLabels[i]} style={styles.day}>
          <View
            style={[
              styles.dot,
              { width: size, height: size, borderRadius: size / 2 },
              dotStyle(status),
            ]}
          >
            {status === 'done' && <Icon name="check" size={size * 0.5} strokeWidth={2.6} />}
          </View>
          <AppText variant="caption" color={dark ? 'onDarkMuted' : 'muted'}>
            {dayLabels[i]}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  day: { alignItems: 'center', gap: 8 },
  dot: { alignItems: 'center', justifyContent: 'center' },
});
