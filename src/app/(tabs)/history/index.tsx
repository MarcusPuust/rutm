/** Ekraan 15: Ajalugu. Vastutaja: Liige 5. */
import { router } from 'expo-router';
import { demoProfile, useActivities } from '@/features/activities';
import { ActivityHistory } from '@/features/activities/components/ActivityHistory';

/** Ühendab ajaloo vaate ajutise andmeallika ja navigatsiooniga. */
export default function HistoryScreen() {
  const activities = useActivities();
  return (
    <ActivityHistory demo activities={activities} goal={demoProfile}
      onOpen={(id) => router.push({ pathname: '/history/[id]', params: { id } })}
      onDemo={__DEV__ ? () => router.push('/record/summary') : undefined} />
  );
}
