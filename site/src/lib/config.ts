import * as Types from '@/lib/types';

export const SANITY_DATASET = 'production';
export const SANITY_PROJECT_ID = 'r6z49mh7';
export const SANITY_API_VERSION = '2023-12-29';

export const FontFamilies = {
  helvetica: 'Helvetica, sans-serif',
  'ivypresto-display': 'IvyPresto Display, Times New Roman, serif',
  'ivypresto-text': 'IvyPresto Text, Times New Roman, serif',
  'franklin-gothic': 'Franklin Gothic, Helvetica, sans-serif',
} satisfies Record<Types.FontFamily, string>;
