/**
 * Vahed, raadiused ja suurused (punktides).
 */
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 } as const;

export const radius = {
  chip: 20,
  card: 24,
  cardLarge: 28,
  pill: 999, // nupud on alati ovaalsed
} as const;

export const sizes = {
  button: 56,
  buttonLarge: 64,
  touch: 44, // minimaalne puutepind
  screenPadding: 20,
} as const;
