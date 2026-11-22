/**
 * Ajutine ekraan, kuni päris ekraan pole valmis.
 * Näitab ekraani numbrit (disainist), nime ja vastutajat.
 * Arenduses on all link komponentide näidisekraanile (/dev/ui).
 * Kustuta, kui kõik ekraanid on tehtud.
 */
import { Link } from 'expo-router';
import { Screen } from './Screen';
import { AppText } from './AppText';

type Props = { number: number; title: string; owner: string };

export function PlaceholderScreen({ number, title, owner }: Props) {
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <AppText variant="label" color="muted">
        Ekraan {number}
      </AppText>
      <AppText variant="title">{title}</AppText>
      <AppText color="inkSoft">Vastutaja: {owner}</AppText>
      {__DEV__ && (
        <Link href="/dev/ui">
          <AppText variant="label" color="inkSoft" style={{ textDecorationLine: 'underline' }}>
            Ava komponentide näidis →
          </AppText>
        </Link>
      )}
    </Screen>
  );
}
