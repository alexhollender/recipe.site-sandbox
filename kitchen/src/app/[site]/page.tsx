import * as Chef from '@/lib/chef';
import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Views from '@/views';

export type Props = {
  params: {
    site: string;
  };
};

const SitesShow: Next.NextPage<Props> = async ({ params }) => {
  const site = await Chef.Sites.get({ slug: params.site });
  const latestRecipes = await Chef.Recipes.searchBy({ siteSlug: params.site, limit: 6 });

  if (!site) return NextNavigation.notFound();

  return <Views.SitesShow site={site} latestRecipes={latestRecipes} />;
};

export default SitesShow;
