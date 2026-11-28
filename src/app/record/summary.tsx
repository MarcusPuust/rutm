/** Ekraan 14: uue trenni kokkuvõte. Vastutaja: Liige 5. */
import { useState } from 'react';
import { router } from 'expo-router';
import {
  createDemoActivity,
  demoProfile,
  saveActivity,
  useActivities,
} from '@/features/activities';
import { ActivitySummary } from '@/features/activities/components/ActivitySummary';
import type { Activity } from '@/types';

/** Kuvab salvestamata näidistrenni; hiljem tuleb trenn Liige 4 salvestusest. */
export default function SummaryScreen() {
  // TODO (Liige 4): asendada näidistrenn päris salvestuse andmetega.
  const [activity] = useState(createDemoActivity);
  const activities = useActivities();
  const back = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };
  /** Salvestab trenni ajutisse andmeallikasse ja naaseb avalehele. */
  const finish = (finished: Activity) => {
    saveActivity(finished);
    router.dismissTo('/');
  };
  return (
    <ActivitySummary
      demo
      activity={activity}
      activities={activities}
      goal={demoProfile}
      onBack={back}
      onDone={finish}
    />
  );
}
