/**
 * Alumise menüü paigutus: Täna, Tiim, "+", Ajalugu, Profiil.
 * Vastutaja: Liige 1
 *
 * Expo Router SDK 58 kohandatud menüü (expo-router/ui):
 *  - TabSlot näitab aktiivset ekraani.
 *  - Nähtav riba (TabBar) sisaldab TabTrigger'eid ja "+" nuppu.
 *  - Peidetud TabList ütleb, mis aadressil iga vahekaart asub.
 * Vt https://docs.expo.dev/router/advanced/custom-tabs/
 */
import { StyleSheet } from 'react-native';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { TabBar, TabBarButton, PlusButton } from '@/components/ui';
import { colors } from '@/theme';

export default function TabsLayout() {
  return (
    <Tabs style={styles.root}>
      <TabSlot />

      {/* Nähtav menüü */}
      <TabBar>
        <TabTrigger name="index" asChild>
          <TabBarButton label="Täna" icon="today" />
        </TabTrigger>
        <TabTrigger name="team" asChild>
          <TabBarButton label="Tiim" icon="team" />
        </TabTrigger>
        <PlusButton />
        <TabTrigger name="history" asChild>
          <TabBarButton label="Ajalugu" icon="history" />
        </TabTrigger>
        <TabTrigger name="profile" asChild>
          <TabBarButton label="Profiil" icon="profile" />
        </TabTrigger>
      </TabBar>

      {/* Peidetud: vahekaartide aadressid */}
      <TabList style={styles.hidden}>
        <TabTrigger name="index" href="/" />
        <TabTrigger name="team" href="/team" resetOnFocus />
        <TabTrigger name="history" href="/history" resetOnFocus />
        <TabTrigger name="profile" href="/profile" />
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  hidden: { display: 'none' },
});
