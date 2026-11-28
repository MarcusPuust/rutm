/** Ajaloo vaade: kalender, kuustatistika, filtrid ja trennide nimekiri. */
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ActivityIcon, AppText, Button, Card, Chip, Screen, activityLabel } from '@/components/ui';
import { formatDistance, formatDuration } from '@/lib/format';
import { colors, fonts, radius, sizes, spacing } from '@/theme';
import type { Activity, ActivityType } from '@/types';
import { getMonthStatistics, getStreak, type ActivityGoal } from '../progress';
import { activityPace, formatShortDate, formatTotalTime } from '../presentation';
import { MonthCalendar } from './MonthCalendar';

type Filter = 'all' | ActivityType;
const filters: Filter[] = ['all', 'run', 'walk', 'bike'];

interface Props {
  activities: readonly Activity[];
  goal: ActivityGoal;
  onOpen: (id: string) => void;
  onDemo?: () => void;
  demo?: boolean;
}

/** Ühe trenni rida, millele vajutades avaneb kokkuvõte. */
function ActivityRow({
  activity,
  last,
  onOpen,
}: {
  activity: Activity;
  last: boolean;
  onOpen: () => void;
}) {
  const pace = activityPace(activity);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onOpen}
      style={[styles.activityRow, !last && styles.divider]}
    >
      <View style={styles.activityIcon}>
        <ActivityIcon type={activity.type} size={26} />
      </View>
      <View style={styles.activityText}>
        <View style={styles.activityHeader}>
          <AppText style={styles.activityName}>{activityLabel[activity.type]}</AppText>
          <AppText variant="caption" color="muted">
            {formatShortDate(new Date(activity.startedAt))}
          </AppText>
        </View>
        <AppText variant="label">
          {formatDuration(activity.durationSeconds)} · {formatDistance(activity.distanceMeters)}
          {activity.type === 'run' && pace !== '–' ? ` · ${pace} /km` : ''}
        </AppText>
        <AppText variant="caption" color="muted">
          Rütm
        </AppText>
      </View>
    </Pressable>
  );
}

/** Kuvab kuu statistika ja võimaldab filtreerida treeninguid. */
export function ActivityHistory({ activities, goal, onOpen, onDemo, demo = false }: Props) {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [filter, setFilter] = useState<Filter>('all');
  const stats = getMonthStatistics(activities, month, goal.minMinutes);
  const streak = getStreak(activities, goal);
  const visible = stats.activities.filter(
    (activity) => filter === 'all' || activity.type === filter,
  );
  return (
    <Screen scroll style={styles.screen}>
      <View>
        <AppText variant="title">Ajalugu</AppText>
        {demo && (
          <AppText variant="caption" color="muted">
            Näidisandmed
          </AppText>
        )}
      </View>
      <MonthCalendar
        month={month}
        activeDays={stats.activeDays}
        streak={streak}
        onChangeMonth={(amount) =>
          setMonth((previous) => new Date(previous.getFullYear(), previous.getMonth() + amount, 1))
        }
      />
      <View style={styles.statsRow}>
        <Card variant="dark" style={styles.monthStat}>
          <AppText variant="caption" color="onDarkMuted">
            Aktiivseid päevi
          </AppText>
          <AppText
            variant="stat"
            color="onDark"
            style={styles.statValue}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {stats.activeDays.size}
          </AppText>
        </Card>
        <Card style={styles.monthStat}>
          <AppText variant="caption" color="muted">
            Aeg kokku
          </AppText>
          <AppText
            variant="stat"
            style={styles.statValue}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {formatTotalTime(stats.durationSeconds)}
          </AppText>
        </Card>
        <Card style={styles.monthStat}>
          <AppText variant="caption" color="muted">
            Distants
          </AppText>
          <AppText
            variant="stat"
            style={styles.statValue}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {formatDistance(stats.distanceMeters)}
          </AppText>
        </Card>
      </View>
      <View style={styles.section}>
        <AppText variant="heading">Trennid</AppText>
        <View style={styles.filters}>
          {filters.map((item) => (
            <Chip
              key={item}
              label={item === 'all' ? 'Kõik' : activityLabel[item]}
              icon={item === 'all' ? undefined : item}
              selected={filter === item}
              onPress={() => setFilter(item)}
            />
          ))}
        </View>
        <Card style={styles.list}>
          {visible.length === 0 ? (
            <AppText color="muted" style={styles.empty}>
              {stats.activities.length === 0
                ? 'Selles kuus trenne ei ole.'
                : 'Selle filtriga trenne ei leitud.'}
            </AppText>
          ) : (
            visible.map((activity, index) => (
              <ActivityRow
                key={activity.id}
                activity={activity}
                last={index === visible.length - 1}
                onOpen={() => onOpen(activity.id)}
              />
            ))
          )}
        </Card>
      </View>
      {onDemo && (
        <Button label="Testi trenni kokkuvõtet (näidis)" variant="secondary" onPress={onDemo} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  monthStat: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.chip,
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  section: { gap: spacing.md },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  list: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    minHeight: sizes.button,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  activityIcon: {
    width: sizes.touch,
    height: sizes.touch,
    borderRadius: radius.chip,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: { flex: 1, gap: spacing.xs },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  activityName: { fontFamily: fonts.bodySemiBold },
  empty: { paddingVertical: spacing.xl, textAlign: 'center' },
  statValue: { fontSize: 24 },
});
