/**
 * Komponentide näidisekraan (ainult arenduses).
 * Vastutaja: Liige 1
 *
 * Näitab kõiki teema värve, tekstistiile, ikoone ja ühiseid komponente ühel lehel.
 * Enne uue komponendi tegemist vaata siit, kas see on juba olemas.
 * Uue ühise komponendi lisamisel lisa see ka siia.
 *
 * Avamine: ajutiste ekraanide all olev link "Ava komponentide näidis".
 */
import { useState, type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import {
  ActivityIcon,
  AppText,
  Avatar,
  Button,
  Card,
  Chip,
  HoogButton,
  Icon,
  Screen,
  ScreenHeader,
  SegmentedControl,
  StatCard,
  StepIndicator,
  Toggle,
  WeekDots,
  activityLabel,
  type DayStatus,
  type IconName,
  type TextVariant,
} from '@/components/ui';
import { colors, radius, spacing, text, type ColorName } from '@/theme';

const colorNames = Object.keys(colors) as ColorName[];
const textVariants = Object.keys(text) as TextVariant[];
const iconNames: IconName[] = [
  'today',
  'team',
  'history',
  'profile',
  'plus',
  'back',
  'forward',
  'close',
  'check',
  'run',
  'walk',
  'bike',
  'hoog',
  'camera',
  'location',
];
const sampleWeek: DayStatus[] = ['done', 'rest', 'done', 'today', 'future', 'future', 'future'];

/** Pealkiri iga näidisploki kohal. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText variant="heading">{title}</AppText>
      {children}
    </View>
  );
}

export default function UiShowcase() {
  // Näidiste olekud, et interaktiivseid komponente saaks proovida
  const [view, setView] = useState<'rhythm' | 'map'>('rhythm');
  const [filter, setFilter] = useState<'all' | 'run' | 'walk' | 'bike'>('all');
  const [shared, setShared] = useState(true);
  const [hoog, setHoog] = useState(false);

  // Valmis rakenduses (production build) seda ekraani ei näidata
  if (!__DEV__) return <Redirect href="/" />;

  return (
    <Screen scroll>
      <ScreenHeader leading="close" center={<AppText variant="heading">Komponendid</AppText>} />

      <Section title="Värvid · colors">
        <View style={styles.wrap}>
          {colorNames.map((name) => (
            <View key={name} style={styles.swatchItem}>
              <View style={[styles.swatch, { backgroundColor: colors[name] }]} />
              <AppText variant="caption">{name}</AppText>
              <AppText variant="caption" color="muted">
                {colors[name]}
              </AppText>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Tekst · AppText">
        {textVariants.map((variant) => (
          <AppText key={variant} variant={variant}>
            {variant} – Rütm 5:47
          </AppText>
        ))}
      </Section>

      <Section title="Ikoonid · Icon">
        <View style={styles.wrap}>
          {iconNames.map((name) => (
            <View key={name} style={styles.iconItem}>
              <Icon name={name} size={26} />
              <AppText variant="caption" color="muted">
                {name}
              </AppText>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Tegevused · ActivityIcon">
        <View style={styles.row}>
          {(['run', 'walk', 'bike'] as const).map((type) => (
            <View key={type} style={styles.row}>
              <ActivityIcon type={type} />
              <AppText>{activityLabel[type]}</AppText>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Nupud · Button">
        <Button label="primary – Edasi" />
        <Button label="secondary – Paus" variant="secondary" />
        <Button label="dark – Jätka" variant="dark" />
        <Button label="text – Hiljem" variant="text" />
        <Button label="large – Alusta" large />
      </Section>

      <Section title="Päis · ScreenHeader + StepIndicator">
        <ScreenHeader
          onLeadingPress={() => setView('rhythm')}
          center={<StepIndicator step={2} total={5} />}
          trailing={<AppText color="inkSoft">Hiljem</AppText>}
        />
      </Section>

      <Section title="Vaate lüliti · SegmentedControl">
        <SegmentedControl
          options={[
            { label: 'Rütm', value: 'rhythm' },
            { label: 'Kaart', value: 'map' },
          ]}
          value={view}
          onChange={setView}
        />
      </Section>

      <Section title="Filtrid · Chip">
        <View style={styles.row}>
          <Chip label="Kõik" selected={filter === 'all'} onPress={() => setFilter('all')} />
          <Chip
            label="Jooks"
            icon="run"
            selected={filter === 'run'}
            onPress={() => setFilter('run')}
          />
          <Chip
            label="Kõnd"
            icon="walk"
            selected={filter === 'walk'}
            onPress={() => setFilter('walk')}
          />
          <Chip
            label="Ratas"
            icon="bike"
            selected={filter === 'bike'}
            onPress={() => setFilter('bike')}
          />
        </View>
      </Section>

      <Section title="Lüliti · Toggle">
        <Card style={styles.rowBetween}>
          <AppText>Jaga tiimi voogu</AppText>
          <Toggle value={shared} onValueChange={setShared} accessibilityLabel="Jaga tiimi voogu" />
        </Card>
      </Section>

      <Section title="Numbrid · StatCard">
        <View style={styles.row}>
          <StatCard label="Aeg" value="24:18" />
          <StatCard label="Distants" value="4,2" unit="km" />
          <StatCard label="Tempo" value="5:47" unit="/km" />
        </View>
        <StatCard label="Aktiivseid päevi" value="13" variant="dark" />
      </Section>

      <Section title="Avatar">
        <View style={styles.row}>
          <Avatar name="Marcus" />
          <Avatar name="Kadri" />
          <Avatar name="Tõnis" />
          <Avatar name="Marcus" size={72} />
        </View>
      </Section>

      <Section title="Hoog · HoogButton">
        <HoogButton count={hoog ? 2 : 1} pressed={hoog} onPress={() => setHoog(!hoog)} />
        <HoogButton count={2} pressed={false} disabled />
      </Section>

      <Section title="Nädal · WeekDots">
        <Card variant="dark">
          <WeekDots days={sampleWeek} />
        </Card>
        <WeekDots variant="light" days={sampleWeek} />
      </Section>

      <Section title="Kaardid · Card">
        <Card>
          <AppText variant="label" color="muted">
            light
          </AppText>
          <AppText variant="stat">6 / 9</AppText>
        </Card>
        <Card variant="dark">
          <AppText variant="label" color="onDarkMuted">
            dark
          </AppText>
          <AppText variant="stat" color="onDark">
            12 nädalat
          </AppText>
        </Card>
      </Section>

      <View style={styles.bottomSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: spacing.sm },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  swatchItem: { width: 96, gap: 2 },
  swatch: { height: 48, borderRadius: radius.chip, borderWidth: 1, borderColor: colors.border },
  iconItem: { width: 64, alignItems: 'center', gap: 4 },
  bottomSpace: { height: spacing.xxl * 2 },
});
