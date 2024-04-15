import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as PrivateChef from '@/lib/privateChef';
import * as React from 'react';
import * as Overview from '@/app/[site]/page';
import * as Views from '@/views';

type RecipesIndexProps = {
  params: Overview.Props['params'];
};

const RecipesIndex: Next.NextPage<RecipesIndexProps> = async ({ params }) => {
  const globals = await PrivateChef.Globals.get({ siteSlug: params.site });

  if (!globals) return NextNavigation.notFound();

  const recipes = await PrivateChef.Recipes.list({ siteId: globals.site._id });

  return <Views.RecipesIndex globals={globals} recipes={recipes} />;
};

export default RecipesIndex;

export async function generateMetadata({ params }: RecipesIndexProps): Promise<Next.Metadata> {
  const site = await PrivateChef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return {
    title: `Recipes • ${site.title}`,
  };
}
