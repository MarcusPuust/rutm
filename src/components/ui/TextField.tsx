/**
 * Tekstiväli: silt + ovaalne sisestusväli (+ vihje või veateade).
 * Kasutavad logi sisse, registreerimine ja tiimi nime sisestamine.
 * Vastutaja: Liige 1
 *
 * Kasutus:
 *   <TextField label="E-post" value={email} onChangeText={setEmail}
 *              keyboardType="email-address" autoComplete="email" />
 *   <TextField label="Parool" value={password} onChangeText={setPassword}
 *              secureTextEntry hint="Vähemalt 8 tähemärki" />
 *   <TextField label="E-post" value={email} onChangeText={setEmail} error="Vale e-post" />
 *
 * Kõik tavalise TextInput'i omadused (keyboardType, autoCapitalize jne) töötavad ka siin.
 */
import { useState } from 'react';
import { TextInput, View, StyleSheet, type TextInputProps } from 'react-native';
import { colors, fonts, radius, sizes, spacing } from '@/theme';
import { AppText } from './AppText';

type Props = TextInputProps & {
  /** Silt välja kohal, nt "E-post" */
  label: string;
  /** Väike abitekst välja all, nt "Vähemalt 8 tähemärki" */
  hint?: string;
  /** Veateade välja all; kui see on olemas, on ääris punane */
  error?: string;
};

export function TextField({ label, hint, error, style, onFocus, onBlur, ...rest }: Props) {
  // Kas kasutaja kirjutab parajasti sellesse välja (siis on ääris tume)
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.danger : focused ? colors.ink : colors.border;

  return (
    <View style={styles.root}>
      <AppText variant="label" style={styles.label}>
        {label}
      </AppText>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        style={[styles.input, { borderColor }, style]}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...rest}
      />
      {error ? (
        <AppText variant="caption" color="danger" style={styles.below}>
          {error}
        </AppText>
      ) : hint ? (
        <AppText variant="caption" color="muted" style={styles.below}>
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 6 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 14 },
  input: {
    height: sizes.button,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    borderWidth: 2,
    backgroundColor: colors.surface,
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.ink,
  },
  below: { paddingLeft: spacing.xl },
});
