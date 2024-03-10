import * as Types from '@/lib/types';

export const primaryAuthor = (site: Types.Site): Types.Author => {
  return site.authors[0];
};
