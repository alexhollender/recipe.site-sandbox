import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Chef from '@/lib/chef';
import * as SitesShow from '@/app/[site]/page';
import * as Ui from '@/ui';

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
    <div>
      <h1>{recipe.title}</h1>
      {recipe.description && <Ui.Richtext content={recipe.description} />}
      {recipe.instructionGroups &&
        recipe.instructionGroups.map((instructionGroup) => {
          return (
            <div key={instructionGroup.title}>
              <h2>{instructionGroup.title}</h2>
              <ol>
                {instructionGroup.instructions.map((instruction) => {
                  return (
                    <li key={instruction._key}>
                      <Ui.Richtext content={instruction.content} />
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
    </div>
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
