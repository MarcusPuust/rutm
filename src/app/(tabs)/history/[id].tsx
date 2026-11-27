/** Ekraan 14: varasema trenni kokkuvõte (ainult vaatamine). Vastutaja: Liige 5. */
import { router, useLocalSearchParams } from 'expo-router';
import { AppText, Button, Screen, ScreenHeader } from '@/components/ui';
import { demoProfile, useActivities } from '@/features/activities';
import { ActivitySummary } from '@/features/activities/components/ActivitySummary';

/** Leiab trenni ID järgi ning kuvab sama kokkuvõtte mis pärast salvestamist. */
export default function ActivityDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const activities = useActivities();
  const activity = activities.find((item) => item.id === id);
  const back = () => { if (router.canGoBack()) router.back(); else router.replace('/history'); };
  if (!activity) {
    return (
      <Screen>
        <ScreenHeader onLeadingPress={back} />
        <AppText variant="title">Trenni ei leitud</AppText>
        <Button label="Tagasi ajalukku" onPress={back} />
      </Screen>
    );
  }
  return <ActivitySummary demo key={activity.id} activity={activity} activities={activities} goal={demoProfile} onBack={back} />;
}
