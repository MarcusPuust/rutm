/**
 * Ekraani ümbris: õige taustavärv, turvaala (sälk, kodunupp) ja külgvahed.
 * Iga ekraan algab sellega.
 * Vastutaja: Liige 1
 */
import { ScrollView, View, StyleSheet, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, sizes, spacing } from '@/theme';

type Props = ViewProps & { scroll?: boolean };

export function Screen({ scroll = false, children, style }: Props) {
  const content = scroll ? (
    <ScrollView contentContainerStyle={[styles.content, style]}>{children}</ScrollView>
  ) : (
    <View style={[styles.content, style]}>{children}</View>
  );
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingHorizontal: sizes.screenPadding, gap: spacing.xl },
});
