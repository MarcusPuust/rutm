/**
 * Ühine tekstikomponent. Kasuta seda kõikjal tavalise <Text> asemel,
 * et fondid, suurused ja värvid tuleksid teemast.
 * Vastutaja: Liige 1
 *
 * Näited:
 *   <AppText variant="title">Hommikujooksjad</AppText>
 *   <AppText variant="label" color="muted">Tiim · 3 liiget</AppText>
 *
 * Variandid (vt src/theme/typography.ts):
 *   hero, title, heading, stat, body, label, caption
 */
import { Text, type TextProps } from 'react-native';
import { colors, text, type ColorName } from '@/theme';

/** Teksti stiili nimi teemast, nt "title" või "label". */
export type TextVariant = keyof typeof text;

type Props = TextProps & {
  /** Teksti stiil teemast, vaikimisi "body" */
  variant?: TextVariant;
  /** Värv teemast, vaikimisi "ink" (põhitekst) */
  color?: ColorName;
};

export function AppText({ variant = 'body', color = 'ink', style, ...rest }: Props) {
  return <Text style={[text[variant], { color: colors[color] }, style]} {...rest} />;
}
