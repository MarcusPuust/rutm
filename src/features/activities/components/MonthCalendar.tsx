/** Ajaloo kalender: esmaspäevast pühapäevani, aktiivsed päevad ja kuu valik. */
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Card, Icon } from '@/components/ui';
import { colors, radius, sizes, spacing } from '@/theme';
import { dayKey, monthCells } from '../progress';
import { formatMonth } from '../presentation';

interface Props {
  month: Date;
  activeDays: ReadonlySet<string>;
  streak: number;
  onChangeMonth: (amount: number) => void;
}

/** Kuvab valitud kuu ja kasutaja praeguse rütmi. */
export function MonthCalendar({ month, activeDays, streak, onChangeMonth }: Props) {
  const cells = monthCells(month);
  const today = dayKey(new Date());
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Eelmine kuu" style={styles.arrow} onPress={() => onChangeMonth(-1)}>
          <Icon name="back" />
        </Pressable>
        <AppText variant="heading" style={styles.month}>{formatMonth(month)}</AppText>
        <Pressable accessibilityRole="button" accessibilityLabel="Järgmine kuu" style={styles.arrow} onPress={() => onChangeMonth(1)}>
          <Icon name="forward" />
        </Pressable>
      </View>
      <View style={styles.row}>
        {['E', 'T', 'K', 'N', 'R', 'L', 'P'].map((label) => (
          <View key={label} style={styles.cell}><AppText variant="label" color="muted">{label}</AppText></View>
        ))}
      </View>
      {Array.from({ length: cells.length / 7 }, (_, row) => (
        <View key={row} style={styles.row}>
          {cells.slice(row * 7, row * 7 + 7).map((date, col) => {
            const key = date ? dayKey(date) : '';
            const active = activeDays.has(key);
            return (
              <View key={col} style={styles.cell}>
                {date && (
                  <View style={[styles.day, active && styles.active, key === today && styles.today]}
                    accessible accessibilityLabel={`${date.toLocaleDateString('et-EE')}${active ? ', päev täis' : ''}${key === today ? ', täna' : ''}`}>
                    <AppText variant="label" color={active || key === today ? 'ink' : 'muted'}>{date.getDate()}</AppText>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ))}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={styles.dot} />
          <AppText variant="caption" color="muted">päev täis</AppText>
        </View>
        <AppText variant="label">{streak} {streak === 1 ? 'nädal' : 'nädalat'} järjest</AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.lg, gap: spacing.sm },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  month: { flex: 1, textAlign: 'center' },
  arrow: { width: sizes.touch, height: sizes.touch, borderRadius: radius.pill, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  cell: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  day: { width: '90%', maxWidth: sizes.touch, aspectRatio: 1, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  active: { backgroundColor: colors.accent },
  today: { borderWidth: 2, borderColor: colors.ink },
  legend: { borderTopWidth: 1, borderTopColor: colors.divider, marginTop: spacing.sm, paddingTop: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: spacing.sm },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dot: { width: spacing.md, height: spacing.md, borderRadius: radius.pill, backgroundColor: colors.accent },
});
