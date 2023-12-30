import * as Config from 'lib/config';
import * as SanityClient from '@sanity/client';

export const Client = SanityClient.createClient({
  projectId: Config.SANITY_PROJECT_ID,
  dataset: Config.SANITY_DATASET,
  apiVersion: '2023-12-29',
  useCdn: true,
});
