/**
 * Kasutaja pilt ringis. Kui pilti pole, näidatakse nime esitähte värvilisel taustal.
 * Vastutaja: Liige 1
 *
 * Kasutus:
 *   <Avatar name="Kadri" />                                  – esitäht
 *   <Avatar name="Marcus" imageUrl={profile.avatarUrl} size={120} />
 */
import { Image, View, StyleSheet } from 'react-native';
import { avatarColors, colors } from '@/theme';
import { AppText } from './AppText';

type Props = {
  name: string;
  /** Profiilipildi aadress (Supabase Storage). Puudub → näidatakse esitähte. */
  imageUrl?: string | null;
  /** Läbimõõt punktides, vaikimisi 40 */
  size?: number;
};

/** Valib nime järgi alati sama taustavärvi. */
function colorFor(name: string) {
  let sum = 0;
  for (const char of name) sum += char.charCodeAt(0);
  return avatarColors[sum % avatarColors.length];
}

export function Avatar({ name, imageUrl, size = 40 }: Props) {
  const circle = { width: size, height: size, borderRadius: size / 2 };

  if (imageUrl) {
    return <Image source={{ uri: imageUrl }} style={circle} accessibilityLabel={name} />;
  }

  return (
    <View
      style={[styles.center, circle, { backgroundColor: colorFor(name) }]}
      accessibilityLabel={name}
    >
      {/* Täht skaleerub ringi suurusega */}
      <AppText variant="label" style={{ fontSize: size * 0.38, color: colors.ink }}>
        {name.charAt(0).toUpperCase()}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
});
