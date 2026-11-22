/**
 * Rakenduse värvid. ÜKS allikas – ära kirjuta värvikoode otse ekraanidesse.
 * Väärtused tulevad disainist (claude.ai artifact "Rütm").
 */
export const colors = {
  background: '#EEF1EA', // ekraani taust
  surface: '#FFFFFF', // valged kaardid
  ink: '#15201A', // põhitekst, tumedad kaardid
  inkSoft: '#3A4A40', // teisene tekst
  muted: '#56615A', // sildid, väiksem tekst
  border: '#D3DAD1', // äärised, sisestusväljad
  divider: '#E1E6DE', // eraldusjooned, rõnga taust
  accent: '#C6F24E', // laimiroheline – peamine tegevus, täis päevad
  onDark: '#EEF1EA', // tekst tumedal taustal
  onDarkMuted: '#B9C4BC', // teisene tekst tumedal taustal
  danger: '#A3271F', // "Kustuta konto"
} as const;

export type ColorName = keyof typeof colors;
