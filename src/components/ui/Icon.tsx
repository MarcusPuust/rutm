/**
 * Ikoonid (joonikoonid, react-native-svg). Kõik rakenduse ikoonid on siin ühes kohas.
 * Vastutaja: Liige 1
 *
 * Kasutus:
 *   <Icon name="run" />
 *   <Icon name="plus" size={28} color={colors.accent} strokeWidth={2.6} />
 *
 * Uue ikooni lisamiseks lisa selle SVG joon (path) allolevasse `paths` objekti.
 * Kõik jooned on joonistatud 24 × 24 ruudustikule (viewBox 0 0 24 24).
 */
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/theme';

const paths = {
  // Alumine menüü
  today: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 7v5l3 2',
  team: 'M9 4.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7M17 6.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.5c3 0 6 2 6 5.5',
  history:
    'M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M4 10h16M9 3v4M15 3v4',
  profile: 'M12 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7',
  plus: 'M12 5v14M5 12h14',

  // Navigeerimine
  back: 'M15 5l-7 7 7 7',
  forward: 'M9 5l7 7-7 7',
  close: 'M6 6l12 12M18 6L6 18',
  check: 'M5 13l4 4L19 7',

  // Tegevused
  // Jooksja: ettepoole kallutatud keha, kõverdatud käed, pikk samm (erineb sirgest kõnnist)
  run: 'M15.5 3.2a1.6 1.6 0 1 0 0 3.2a1.6 1.6 0 1 0 0-3.2M13.8 8L11 13.5M18.5 9.5L16.2 10.8 13.6 8.6M13.6 8.6L10.6 9.6 8.6 12.3M11 13.5l3.6 2.4-1.2 4.6M11 13.5l-2.7 3.3H4.8',
  // Kõndija: püstine keha, käed kergelt kõrval, lühike samm
  walk: 'M12 2a1.6 1.6 0 1 0 0 3.2a1.6 1.6 0 1 0 0-3.2M12 7.5L11.5 13M12 8.5l2.5 2.5 1 2.5M12 8.5l-2.5 2-.5 3M11.5 13l2 3.5.5 4M11.5 13l-1.5 4-1.5 3.5',
  // Jalgratas: kaks ratast, raam, sadul ja juhtraud
  bike: 'M5.5 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7M18.5 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7M5.5 16H12L9.5 9 5.5 16M9.5 9H16L12 16M16 9l2.5 7M16 9l-1-2.5h2.5M8 9h3',

  // Muu
  hoog: 'M7.7 14.2Q13.75 13.2 17.6 7.8M5.6 17.3Q17.25 16.25 19.5 10.6',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 9.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7',
  location:
    'M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 7a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5',
} as const;

/** Kõigi olemasolevate ikoonide nimed, nt "run" või "plus". */
export type IconName = keyof typeof paths;

type Props = {
  /** Ikooni nimi (vt `paths`) */
  name: IconName;
  /** Suurus punktides, vaikimisi 22 */
  size?: number;
  /** Joone värv, vaikimisi põhitekst */
  color?: string;
  /** Joone paksus, vaikimisi 2 */
  strokeWidth?: number;
};

export function Icon({ name, size = 22, color = colors.ink, strokeWidth = 2 }: Props) {
  return (
    // Ikoon on kaunistus – ekraanilugeja loeb nupu teksti või accessibilityLabel'i
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" accessibilityElementsHidden>
      <Path
        d={paths[name]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
