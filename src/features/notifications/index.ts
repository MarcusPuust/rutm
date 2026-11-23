/**
 * Valdkond: notifications – teavitused
 * Vastutaja: Liige 1
 *
 * Lokaalsed teavitused (töötavad ka Expo Go's):
 *  - meeldetuletused: "Täna on veel liikumata", nädalavahetuse meeldetuletus
 *  - tiim: hoog ja müks
 * Push-teavitused serverist (Supabase) lisanduvad hiljem.
 *
 * Kasutus mujal:
 *   import { requestNotificationPermission } from '@/features/notifications';
 */
export * from './permissions';
export * from './reminders';
export * from './setup';
export * from './team';
export * from './useNotificationNavigation';
