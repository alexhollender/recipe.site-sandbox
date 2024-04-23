import * as Types from '@/lib/types';

export const SANITY_DATASET = 'production';
export const SANITY_PROJECT_ID = 'r6z49mh7';
export const SANITY_API_VERSION = '2023-12-29';

export const FontFamilies = {
  // Display
  'ivypresto-display': 'IvyPresto Display, Times New Roman, serif',
  moret: 'Moret, Times New Roman, serif',
  graphik: 'Graphik, Helvetica, sans-serif',
  // Narrative
  'ivypresto-text': 'IvyPresto Text, Times New Roman, serif',
  // Interface
  helvetica: 'Helvetica, sans-serif',
  'franklin-gothic': 'Franklin Gothic, Helvetica, sans-serif',
} satisfies Record<Types.FontFamily, string>;
