/**
 * Ühine kaart: valge (light) või tume (dark) ümarate nurkadega kast.
 * Vastutaja: Liige 1
 */
import { View, StyleSheet, type ViewProps } from 'react-native';
import { colors, radius, spacing } from '@/theme';

type Props = ViewProps & { variant?: 'light' | 'dark' };

export function Card({ variant = 'light', style, ...rest }: Props) {
  return (
    <View style={[styles.base, variant === 'dark' ? styles.dark : styles.light, style]} {...rest} />
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.card, padding: spacing.xl },
  light: { backgroundColor: colors.surface },
  dark: { backgroundColor: colors.ink },
});
