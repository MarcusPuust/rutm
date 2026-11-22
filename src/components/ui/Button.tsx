/**
 * Ühine nupp. Kasuta seda kõigis ekraanides, et nupud oleksid ühtsed.
 * Vastutaja: Liige 1
 *
 * Variandid (vt disaini nupureeglid):
 *  - primary:   laimiroheline, tume tekst – üks peamine tegevus ekraanil
 *  - secondary: läbipaistev, tume ääris – teisene tegevus
 *  - dark:      tume, hele tekst – aktiivne olek (nt "Jätka" pausil)
 *  - text:      ainult tekst – "Hiljem", "Logi välja"
 */
import { Pressable, Text, StyleSheet, type PressableProps } from 'react-native';
import { colors, fonts, radius, sizes } from '@/theme';

type Variant = 'primary' | 'secondary' | 'dark' | 'text';

type Props = PressableProps & {
  /** Nupu tekst */
  label: string;
  /** Välimus, vaikimisi primary */
  variant?: Variant;
  /** Suurem nupp (64 pt), nt salvestuse ekraanil */
  large?: boolean;
};

export function Button({ label, variant = 'primary', large = false, style, ...rest }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      style={(state) => [
        styles.base,
        { height: large ? sizes.buttonLarge : sizes.button },
        styles[variant],
        state.pressed && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      <Text style={[styles.label, variant === 'dark' && { color: colors.onDark }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  primary: { backgroundColor: colors.accent },
  secondary: { borderWidth: 2, borderColor: colors.ink, backgroundColor: 'transparent' },
  dark: { backgroundColor: colors.ink },
  text: { backgroundColor: 'transparent', height: sizes.touch },
  pressed: { opacity: 0.85 },
  label: { fontFamily: fonts.display, fontSize: 17, color: colors.ink },
});
