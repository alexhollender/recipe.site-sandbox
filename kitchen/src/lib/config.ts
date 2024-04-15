export const SANITY_DATASET = 'production';
export const SANITY_PROJECT_ID = 'r6z49mh7';
export const SANITY_API_VERSION = '2023-12-29';

const getSanityApiToken = () => {
  const apiToken = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;
  if (!apiToken) {
    throw new Error('SANITY_API_TOKEN is not defined');
  }
  return apiToken;
};

export const SANITY_API_TOKEN = getSanityApiToken();
