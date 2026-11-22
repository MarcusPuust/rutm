/**
 * Fondid ja tekstistiilid.
 * Space Grotesk – pealkirjad ja numbrid, Inter – sisutekst.
 */
export const fonts = {
  display: 'SpaceGrotesk_700Bold',
  displayMedium: 'SpaceGrotesk_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
} as const;

export const text = {
  hero: { fontFamily: fonts.display, fontSize: 56, letterSpacing: -2 },
  title: { fontFamily: fonts.display, fontSize: 32, letterSpacing: -1 },
  heading: { fontFamily: fonts.display, fontSize: 20 },
  stat: { fontFamily: fonts.display, fontSize: 26 },
  body: { fontFamily: fonts.body, fontSize: 15 },
  label: { fontFamily: fonts.bodyMedium, fontSize: 13 },
  caption: { fontFamily: fonts.body, fontSize: 12 },
} as const;
