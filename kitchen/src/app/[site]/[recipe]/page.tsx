import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Chef from '@/lib/chef';
import * as SitesShow from '@/app/[site]/page';
import * as Views from '@/views';

type RecipesShowProps = {
  params: SitesShow.Props['params'] & {
    recipe: string;
  };
};

const RecipesShow: Next.NextPage<RecipesShowProps> = async ({ params }) => {
  const [site, recipe] = await Promise.all([
    Chef.Sites.get({ slug: params.site }),
    Chef.Recipes.get({ siteSlug: params.site, recipeSlug: params.recipe }),
  ]);
  if (!site || !recipe) return NextNavigation.notFound();

  return <Views.RecipesShow site={site} recipe={recipe} />;
};

export default RecipesShow;

export async function generateMetadata({ params }: RecipesShowProps): Promise<Next.Metadata> {
  const [site, recipe] = await Promise.all([
    Chef.Sites.get({ slug: params.site }),
    Chef.Recipes.get({ siteSlug: params.site, recipeSlug: params.recipe }),
  ]);
  if (!site || !recipe) return NextNavigation.notFound();

  return {
    title: `${site.title} · ${recipe.title}`,
  };
}

export async function generateStaticParams() {
  const sites = await Chef.Sites.list();

  const siteRecipes = sites.map((site) => {
    return site.recipes.map((recipe) => {
      return {
        site: site.slug,
        recipe: recipe.slug,
      };
    });
  });

  return siteRecipes.flat();
}
