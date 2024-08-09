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
        {/* Title */}
        <title>{`${recipe.title} • ${site.title}`}</title>
        <meta property="og:title" content={`${recipe.title} • ${site.title}`} key="ogTitle" />
        <meta name="twitter:title" content={`${recipe.title} • ${site.title}`} key="twitterTitle" />
        {/* Description */}
        {recipe.descriptionPlaintext && (
          <>
            <meta name="description" content={recipe.descriptionPlaintext} key="description" />
            <meta
              property="og:description"
              content={recipe.descriptionPlaintext}
              key="ogDescription"
            />
            <meta
              name="twitter:description"
              content={recipe.descriptionPlaintext}
              key="twitterDescription"
            />
          </>
        )}
        {/* Image */}
        {recipe.featuredMedia.image && (
          <>
            <meta
              property="og:image:type"
              content={recipe.featuredMedia.image.asset.mimeType}
              key="ogImageType"
            />
            <meta property="og:image:width" content="800" key="ogImageWidth" />
            <meta property="og:image:height" content="600" key="ogImageHeight" />
            <meta
              property="og:image"
              content={Sanity.ImageBuilder.image(recipe.featuredMedia.image)
                .height(800)
                .width(600)
                .url()}
              key="ogImage"
            />
            <meta
              name="twitter:image:type"
              content={recipe.featuredMedia.image.asset.mimeType}
              key="twitterImageType"
            />
            <meta name="twitter:image:width" content="800" key="twitterImageWidth" />
            <meta name="twitter:image:height" content="600" key="twitterImageHeight" />
            <meta
              name="twitter:image"
              content={Sanity.ImageBuilder.image(recipe.featuredMedia.image)
                .width(800)
                .height(600)
                .url()}
              key="twitterImage"
            />
          </>
        )}
      </Head>
      {recipe.legacyRecipeData ? (
        <Views.LegacyRecipesShow site={site} legacyRecipe={recipe} />
      ) : (
        <RecipeContext.Provider recipe={recipe}>
          <Views.RecipesShow site={site} recipe={recipe} />
        </RecipeContext.Provider>
      )}
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
