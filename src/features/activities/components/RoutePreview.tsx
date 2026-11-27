/** Ajutine GPS-marsruudi eelvaade; TODO (Liige 4): kasutada ühist RouteMap komponenti. */
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Polyline } from 'react-native-svg';
import { AppText, Card, Icon } from '@/components/ui';
import { colors, radius, spacing } from '@/theme';
import type { RoutePoint } from '@/types';

/** Kuvab tegelikest koordinaatidest joone, ilma väljamõeldud kaardita. */
export function RoutePreview({ route }: { route: RoutePoint[] }) {
  const points = route.filter((point) => Number.isFinite(point.lat) && Number.isFinite(point.lng));
  if (points.length < 2) {
    return (
      <Card style={styles.empty}>
        <Icon name="location" color={colors.muted} />
        <AppText color="muted">Marsruut puudub</AppText>
      </Card>
    );
  }
  const width = 320;
  const height = 200;
  const padding = spacing.xxl;
  const lat0 = points[0].lat;
  const lng0 = points[0].lng;
  const projected = points.map(({ lat, lng }) => ({
    x: (lng - lng0) * Math.cos((lat0 * Math.PI) / 180),
    y: lat0 - lat,
  }));
  const xs = projected.map((point) => point.x);
  const ys = projected.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.min(
    (width - 2 * padding) / Math.max(maxX - minX, 0.000001),
    (height - 2 * padding) / Math.max(maxY - minY, 0.000001),
  );
  const normalized = projected.map(({ x, y }) => ({
    x: width / 2 + (x - (minX + maxX) / 2) * scale,
    y: height / 2 + (y - (minY + maxY) / 2) * scale,
  }));
  const first = normalized[0];
  const last = normalized[normalized.length - 1];
  return (
    <View style={styles.preview} accessibilityLabel="GPS-marsruudi eelvaade">
      <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <Polyline
          points={normalized.map(({ x, y }) => `${x},${y}`).join(' ')}
          fill="none"
          stroke={colors.ink}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle
          cx={first.x}
          cy={first.y}
          r={6}
          fill={colors.surface}
          stroke={colors.ink}
          strokeWidth={2}
        />
        <Circle
          cx={last.x}
          cy={last.y}
          r={7}
          fill={colors.accent}
          stroke={colors.ink}
          strokeWidth={2}
        />
      </Svg>
      <AppText variant="caption" color="muted" style={styles.caption}>
        Marsruudi eelvaade · kaart lisandub hiljem
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  preview: {
    aspectRatio: 1.35,
    backgroundColor: colors.divider,
    borderRadius: radius.card,
    overflow: 'hidden',
  },
  caption: { position: 'absolute', bottom: spacing.sm, left: spacing.md, right: spacing.md },
  empty: {
    minHeight: 120,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});
