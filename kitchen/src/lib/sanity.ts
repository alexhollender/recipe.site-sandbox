import * as Config from '@/lib/config';
import * as SanityClient from '@sanity/client';

import ImageUrlBuilder from '@sanity/image-url';

export const Client = SanityClient.createClient({
  projectId: Config.SANITY_PROJECT_ID,
  dataset: Config.SANITY_DATASET,
  apiVersion: Config.SANITY_API_VERSION,
  token: Config.SANITY_API_TOKEN,
  useCdn: false,
});

export const ImageBuilder = ImageUrlBuilder(Client);
