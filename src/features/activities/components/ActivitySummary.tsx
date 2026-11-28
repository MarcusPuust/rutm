/** Ühine trenni kokkuvõte: uus trenn ja ajaloos salvestatud trenn. */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AppText,
  Button,
  Card,
  Screen,
  ScreenHeader,
  StatCard,
  Toggle,
  WeekDots,
  activityLabel,
} from '@/components/ui';
import { formatDistance, formatDuration, formatPace } from '@/lib/format';
import { colors, radius, spacing } from '@/theme';
import type { Activity } from '@/types';
import { activeDayKeys, dayKey, getWeekProgress, type ActivityGoal } from '../progress';
import { activityPace } from '../presentation';
import { RoutePreview } from './RoutePreview';

interface Props {
  activity: Activity;
  activities: readonly Activity[];
  goal: ActivityGoal;
  onBack: () => void;
  onDone?: (activity: Activity) => void;
  demo?: boolean;
}

/** Kokkuvõtte vaade; onDone puudumisel on tegemist ainult ajaloo detailvaatega. */
export function ActivitySummary({
  activity,
  activities,
  goal,
  onBack,
  onDone,
  demo = false,
}: Props) {
  const [shared, setShared] = useState(activity.sharedToTeam);
  const insets = useSafeAreaInsets();
  const started = new Date(activity.startedAt);
  // Uus trenn läheb progressi arvesse juba eelvaates, kuid ainult üks kord.
  const all = [...activities.filter((item) => item.id !== activity.id), activity];
  const dayComplete = activeDayKeys(all, goal.minMinutes).has(dayKey(started));
  const week = getWeekProgress(all, goal, started);
  const date = started.toLocaleDateString('et-EE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const time = started.toLocaleTimeString('et-EE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const pace = activityPace(activity);
  const splits = [...activity.splits]
    .filter((split) => Number.isFinite(split.paceSeconds) && split.paceSeconds > 0)
    .sort((a, b) => a.km - b.km);
  const fastest = Math.min(...splits.map((split) => split.paceSeconds));
  return (
    <Screen scroll style={[styles.screen, { paddingBottom: Math.max(insets.bottom, spacing.xxl) }]}>
      <ScreenHeader onLeadingPress={onBack} />
      <View style={styles.title}>
        <AppText variant="title">{activityLabel[activity.type]}</AppText>
        {demo && (
          <AppText variant="caption" color="muted">
            Näidistrenn
          </AppText>
        )}
        <AppText color="muted">
          {activityLabel[activity.type]} · {date} · {time}
        </AppText>
      </View>
      <RoutePreview route={activity.route} />
      <View style={styles.statsRow}>
        <StatCard label="Aeg" value={formatDuration(activity.durationSeconds)} />
        <StatCard label="Distants" value={formatDistance(activity.distanceMeters)} />
      </View>
      <View style={styles.statsRow}>
        <StatCard label="Tempo" value={pace} unit={pace !== '–' ? '/km' : undefined} />
        {/* TODO: kõrgusandmed tuleb kokkuleppida Liige 4-ga. */}
        <StatCard label="Tõus" value="–" />
      </View>
      <Card variant="dark" style={styles.cardGap}>
        <View style={styles.progressHeader}>
          <AppText variant="heading" color="onDark">
            {dayComplete ? 'Päev täis ✓' : 'Päev pooleli'}
          </AppText>
          <AppText variant="label" color="onDarkMuted">
            sinu nädal {week.activeDays} / {week.goalDays}
          </AppText>
        </View>
        <WeekDots days={week.days} size={28} />
      </Card>
      <Card style={styles.cardGap}>
        <AppText variant="heading">Kilomeetrid</AppText>
        {splits.length === 0 ? (
          <AppText color="muted">Vahetulemused puuduvad.</AppText>
        ) : (
          splits.map((split, index) => (
            <View key={`${split.km}-${index}`} style={styles.splitRow}>
              <AppText color="muted" style={styles.splitKm}>
                {split.km}
              </AppText>
              <View style={styles.track}>
                <View
                  style={[
                    styles.bar,
                    { width: `${Math.min(100, (fastest / split.paceSeconds) * 100)}%` },
                  ]}
                />
              </View>
              <AppText variant="label" style={styles.splitPace}>
                {formatPace(Math.round(split.paceSeconds))}
              </AppText>
            </View>
          ))
        )}
      </Card>
      <Card style={styles.shareRow}>
        <View style={styles.shareText}>
          <AppText variant="heading">{onDone ? 'Jaga tiimi voogu' : 'Tiimi voog'}</AppText>
          <AppText variant="label" color="muted">
            {onDone
              ? 'Tiimikaaslased näevad trenni ja saavad hoogu anda'
              : activity.sharedToTeam
                ? 'Trenn on tiimile jagatud'
                : 'Trenn ei ole tiimile jagatud'}
          </AppText>
        </View>
        {onDone && (
          <Toggle value={shared} onValueChange={setShared} accessibilityLabel="Jaga tiimi voogu" />
        )}
      </Card>
      <Button
        label={onDone ? 'Valmis' : 'Tagasi'}
        large
        onPress={() => (onDone ? onDone({ ...activity, sharedToTeam: shared }) : onBack())}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing.md, gap: spacing.lg },
  title: { gap: spacing.xs },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  cardGap: { gap: spacing.md },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  splitRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  splitKm: { minWidth: spacing.xl },
  track: {
    flex: 1,
    height: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.divider,
    overflow: 'hidden',
  },
  bar: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.ink },
  splitPace: { minWidth: spacing.xxl * 2, textAlign: 'right' },
  shareRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  shareText: { flex: 1, gap: spacing.xs },
});
