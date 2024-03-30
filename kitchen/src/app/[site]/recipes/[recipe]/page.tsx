import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as RecipeContext from '@/lib/recipeContext';
import * as Chef from '@/lib/chef';
import * as Sanity from '@/lib/sanity';
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

  return (
    <RecipeContext.Provider recipe={recipe}>
      <Views.RecipesShow site={site} recipe={recipe} />
    </RecipeContext.Provider>
  );
};

export default RecipesShow;

export async function generateMetadata({ params }: RecipesShowProps): Promise<Next.Metadata> {
  const [site, recipe] = await Promise.all([
    Chef.Sites.get({ slug: params.site }),
    Chef.Recipes.get({ siteSlug: params.site, recipeSlug: params.recipe }),
  ]);
  if (!site || !recipe) return NextNavigation.notFound();

  return {
    title: `${recipe.title} • ${site.title}`,
    description: recipe.descriptionPlaintext || null,
    openGraph: {
      title: `${recipe.title} • ${site.title}`,
      description: recipe.descriptionPlaintext || undefined,
      images: recipe.featuredMedia.image
        ? [
            {
              url: Sanity.ImageBuilder.image(recipe.featuredMedia.image).url(),
              width: recipe.featuredMedia.image.asset.metadata.dimensions.width,
              height: recipe.featuredMedia.image.asset.metadata.dimensions.height,
            },
          ]
        : undefined,
    },
    twitter: {
      images: recipe.featuredMedia.image
        ? [
            {
              url: Sanity.ImageBuilder.image(recipe.featuredMedia.image).url(),
              width: recipe.featuredMedia.image.asset.metadata.dimensions.width,
              height: recipe.featuredMedia.image.asset.metadata.dimensions.height,
            },
          ]
        : undefined,
    },
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
