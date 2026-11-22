/**
 * Ekraani päis: ümmargune tagasi- või sulgemisnupp vasakul,
 * valikuline sisu keskel (nt sammude näidik) ja paremal (nt "Hiljem").
 * Vastutaja: Liige 1
 *
 * Kasutus:
 *   <ScreenHeader />                                        – ainult tagasinupp
 *   <ScreenHeader center={<StepIndicator step={2} total={5} />} />
 *   <ScreenHeader leading="close" />                        – sulgemisnupp (nt "Vali tegevus")
 */
import type { ReactNode } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors, sizes } from '@/theme';
import { Icon } from './Icon';

type Props = {
  /** Vasakpoolne nupp: "back" (vaikimisi), "close" või "none" */
  leading?: 'back' | 'close' | 'none';
  /** Mis juhtub nupule vajutamisel; vaikimisi eelmisele ekraanile (router.back) */
  onLeadingPress?: () => void;
  /** Keskel olev sisu */
  center?: ReactNode;
  /** Paremal olev sisu */
  trailing?: ReactNode;
};

export function ScreenHeader({ leading = 'back', onLeadingPress, center, trailing }: Props) {
  return (
    <View style={styles.row}>
      {/* Vasak ja parem pool on sama laiad, et keskmine sisu oleks täpselt keskel */}
      <View style={styles.side}>
        {leading !== 'none' && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={leading === 'back' ? 'Tagasi' : 'Sulge'}
            onPress={onLeadingPress ?? (() => router.back())}
            style={styles.circle}
          >
            <Icon name={leading} size={20} strokeWidth={2.2} />
          </Pressable>
        )}
      </View>
      <View style={styles.center}>{center}</View>
      <View style={[styles.side, styles.right]}>{trailing}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', minHeight: sizes.touch },
  side: { width: 88 },
  right: { alignItems: 'flex-end' },
  center: { flex: 1, alignItems: 'center' },
  circle: {
    width: sizes.touch,
    height: sizes.touch,
    borderRadius: sizes.touch / 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
