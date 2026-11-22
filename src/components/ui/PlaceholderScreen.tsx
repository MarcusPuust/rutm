/**
 * Ajutine ekraan, kuni päris ekraan pole valmis.
 * Näitab ekraani numbrit (disainist), nime ja vastutajat.
 * Kustuta, kui kõik ekraanid on tehtud.
 */
import { Text } from 'react-native';
import { Screen } from './Screen';
import { colors, text } from '@/theme';

type Props = { number: number; title: string; owner: string };

export function PlaceholderScreen({ number, title, owner }: Props) {
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Text style={[text.label, { color: colors.muted }]}>Ekraan {number}</Text>
      <Text style={[text.title, { color: colors.ink }]}>{title}</Text>
      <Text style={[text.body, { color: colors.inkSoft }]}>Vastutaja: {owner}</Text>
    </Screen>
  );
}
