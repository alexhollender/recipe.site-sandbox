import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as PrivateChef from '@/lib/privateChef';
import * as React from 'react';
import * as Overview from '@/app/[site]/page';
import * as Views from '@/views';

type RecipesShowProps = {
  params: Overview.Props['params'] & {
    recipeId: string;
  };
};

const RecipesShow: Next.NextPage<RecipesShowProps> = async ({ params }) => {
  const globals = await PrivateChef.Globals.get({ siteSlug: params.site });

  if (!globals) return NextNavigation.notFound();

  const recipe = await PrivateChef.Recipes.getOrCreateDraft({
    siteId: globals.site._id,
    publishedRecipeId: params.recipeId,
  });

  return <Views.RecipesShow globals={globals} recipe={recipe} />;
};

export default RecipesShow;
