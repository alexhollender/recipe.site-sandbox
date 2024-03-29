import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Chef from '@/lib/chef';
import * as SitesShow from '@/app/[site]/page';
import * as Views from '@/views';

type RecipesIndexProps = {
  params: SitesShow.Props['params'];
};

const RecipesIndex: Next.NextPage<RecipesIndexProps> = async ({ params }) => {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return <Views.RecipesIndex site={site} />;
};

export default RecipesIndex;

export async function generateMetadata({ params }: RecipesIndexProps): Promise<Next.Metadata> {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return {
    title: `${site.title} · Recipes`,
  };
}
