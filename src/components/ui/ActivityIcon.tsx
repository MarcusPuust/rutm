/**
 * Tegevuse ikoon (Jooks / Kõnd / Ratas) ja tegevuse nimi eesti keeles.
 * Kasutavad tegevuse valik, ajalugu, voog ja kokkuvõte.
 * Vastutaja: Liige 1
 *
 * Kasutus:
 *   <ActivityIcon type="run" />
 *   <AppText>{activityLabel[activity.type]}</AppText>   // "Jooks"
 */
import type { ActivityType } from '@/types';
import { Icon, type IconName } from './Icon';

/** Millist ikooni iga tegevus kasutab. */
const iconByType: Record<ActivityType, IconName> = { run: 'run', walk: 'walk', bike: 'bike' };

/** Tegevuse nimi eesti keeles. */
export const activityLabel: Record<ActivityType, string> = {
  run: 'Jooks',
  walk: 'Kõnd',
  bike: 'Ratas',
};

type Props = {
  type: ActivityType;
  size?: number;
  color?: string;
};

export function ActivityIcon({ type, size, color }: Props) {
  return <Icon name={iconByType[type]} size={size} color={color} />;
}
