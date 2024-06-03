import * as Next from 'next';
import * as React from 'react';
import * as RecipeContext from '@/lib/recipeContext';
import * as Chef from '@/lib/chef';
import * as Sanity from '@/lib/sanity';
import * as Types from '@/lib/types';
import * as Views from '@/views';

import Head from 'next/head';

type Props = Types.PageProps<{ recipe: Types.Recipe }>;

const RecipesShow: Next.NextPage<Next.InferGetStaticPropsType<typeof getStaticProps>> = ({
  site,
  recipe,
}) => {
  return (
    <>
      <Head>
        <title>{`${recipe.title} • ${site.title}`}</title>
        {recipe.descriptionPlaintext && (
          <meta name="description" content={recipe.descriptionPlaintext} />
        )}
        <meta property="og:title" content={`${recipe.title} • ${site.title}`} />
        {recipe.descriptionPlaintext && (
          <meta property="og:description" content={recipe.descriptionPlaintext} />
        )}
        {recipe.featuredMedia.image && (
          <>
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="600" />
            <meta
              property="og:image"
              content={Sanity.ImageBuilder.image(recipe.featuredMedia.image)
                .height(800)
                .width(600)
                .url()}
            />
            <meta name="twitter:image:type" content="image/jpeg" />
            <meta name="twitter:image:width" content="800" />
            <meta name="twitter:image:height" content="600" />
            <meta
              name="twitter:image"
              content={Sanity.ImageBuilder.image(recipe.featuredMedia.image)
                .width(800)
                .height(600)
                .url()}
            />
          </>
        )}
      </Head>
      <RecipeContext.Provider recipe={recipe}>
        <Views.RecipesShow site={site} recipe={recipe} />
      </RecipeContext.Provider>
    </>
  );
};

export default RecipesShow;

export const getStaticProps: Next.GetStaticProps<Props> = async (context) => {
  // @ts-ignore
  const siteSlug: string = context.params.site;
  // @ts-ignore
  const recipeSlug: string = context.params.recipe;

  const [site, globals, recipe] = await Promise.all([
    Chef.Sites.get({ slug: siteSlug }),
    Chef.SiteGlobals.get(siteSlug),
    Chef.Recipes.get({ siteSlug, recipeSlug }),
  ]);

  if (!site || !recipe) return { notFound: true };

  return { props: { site, globals, recipe } };
};

export const getStaticPaths: Next.GetStaticPaths = async () => {
  const sites = await Chef.Sites.list();

  const siteRecipes = sites.map((site) => {
    return site.recipes.map((recipe) => {
      return {
        params: {
          site: site.slug,
          recipe: recipe.slug,
        },
      };
    });
  });

  const paths = siteRecipes.flat();

  return { paths, fallback: false };
};
