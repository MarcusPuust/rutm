/**
 * Seadete rida: tekst vasakul, väärtus ja nool paremal. Nt profiilis
 * "Nädala eesmärk ............ 3 päeva ›".
 * Vastutaja: Liige 1
 *
 * Kasutus – read valge kaardi sees, viimasel real pole eraldusjoont:
 *   <Card style={{ paddingVertical: 0 }}>
 *     <ListRow label="Nädala eesmärk" value="3 päeva" href="/goal" />
 *     <ListRow label="Teavitused" value="Sees" onPress={openSettings} />
 *     <ListRow label="Kustuta konto" danger onPress={confirmDelete} last />
 *   </Card>
 */
import { Pressable, View, StyleSheet } from 'react-native';
import { Link, type Href } from 'expo-router';
import { colors, sizes, spacing } from '@/theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type Props = {
  /** Tekst vasakul */
  label: string;
  /** Väärtus paremal (valikuline), nt "3 päeva" */
  value?: string;
  /** Kuhu rida viib (expo-router aadress). Kasuta seda VÕI onPress'i. */
  href?: Href;
  /** Mis juhtub vajutamisel, kui href'i pole */
  onPress?: () => void;
  /** Punane tekst ja nooleta, nt "Kustuta konto" */
  danger?: boolean;
  /** Viimane rida – ilma alumise eraldusjooneta */
  last?: boolean;
};

export function ListRow({ label, value, href, onPress, danger = false, last = false }: Props) {
  const content = (
    <Pressable
      accessibilityRole={href ? 'link' : 'button'}
      onPress={onPress}
      style={[styles.row, !last && styles.divider]}
    >
      <AppText color={danger ? 'danger' : 'ink'} style={styles.label}>
        {label}
      </AppText>
      <View style={styles.right}>
        {value ? <AppText color="muted">{value}</AppText> : null}
        {!danger && <Icon name="forward" size={16} color={colors.muted} strokeWidth={2.2} />}
      </View>
    </Pressable>
  );

  // href'iga rida on link (asChild annab vajutuse Pressable'ile)
  return href ? (
    <Link href={href} asChild>
      {content}
    </Link>
  ) : (
    content
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: sizes.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  label: { flexShrink: 1 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
