import * as Adapters from '@/lib/privateChef/adapter';
import * as Queries from '@/lib/privateChef/queries';
import * as Sanity from '@/lib/sanity';
import * as SanityClient from '@sanity/client';
import * as Types from '@/lib/types';

export const Categories = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Sanity.RecipeCategory[]>(
      `*[_type == "recipeCategory" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->categories[]._ref] ${Queries.RECIPE_CATEGORY_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Collections = {
  get(params: { siteSlug: string; collectionSlug: string }) {
    return Sanity.Client.fetch<Types.Sanity.Collection | null>(
      `*[_type == "collection" && slug.current == $collectionSlug && _id in *[_type == "site" && slug.current == $siteSlug][0].collections[]._ref][0] ${Queries.COLLECTION_QUERY}`,
      {
        siteSlug: params.siteSlug,
        collectionSlug: params.collectionSlug,
      },
    );
  },
};

export const Cuisines = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Sanity.Cuisine[]>(
      `*[_type == "cuisine" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->cuisines[]._ref] ${Queries.CUISINE_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Tags = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Sanity.Tag[]>(
      `*[_type == "tag" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->tags[]._ref] ${Queries.TAG_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Ingredients = {
  list() {
    return Sanity.Client.fetch<Types.Sanity.Ingredient[]>(
      `*[_type == "ingredient"] ${Queries.INGREDIENT_QUERY}`,
    );
  },
};

export const Recipes = {
  async getOrCreateDraft({
    siteId,
    publishedRecipeId,
  }: {
    siteId: string;
    publishedRecipeId: string;
  }) {
    const draft = await Recipes.getDraft({ siteId, publishedRecipeId });

    if (draft) return draft;

    const transaction = Transaction.new();
    const withDraft = Recipes.createDraft(transaction, { siteId, publishedRecipeId });
    await withDraft.commit();

    return Recipes.getDraft({ siteId, publishedRecipeId });
  },

  getDraft(params: { siteId: string; publishedRecipeId: string }) {
    return Sanity.Client.fetch<{
      _id: string;
      _type: 'recipe';
    } | null>(
      `{
        *[_type == "recipe" && _id == $draftRecipeId && ($draftRecipeId in *[_type == "site" && _id == $siteId][0].recipes[]._ref || $publishedRecipeId in *[_type == "site" && _id == $siteId][0].recipes[]._ref)][0] ${Queries.RECIPE_QUERY}
      }`,
      {
        siteId: params.siteId,
        publishedRecipeId: params.publishedRecipeId,
        draftRecipeId: `drafts.${params.publishedRecipeId}`,
      },
    );
  },

  createDraft(
    transaction: SanityClient.Transaction,
    params: { siteId: string; publishedRecipeId: string },
  ) {
    const withCreate = transaction.create({
      _id: `drafts.${params.publishedRecipeId}`,
      _type: 'recipe',
    });

    const withAddToSite = withCreate.patch(params.siteId, (patch) =>
      patch
        .setIfMissing({ recipes: [] })
        .append('recipes', [{ _ref: `drafts.${params.publishedRecipeId}` }]),
    );

    return withAddToSite;
  },

  get(params: { siteSlug: string; recipeId: string }) {
    return Sanity.Client.fetch<
      | Types.RecipeDocument
      | {
          published: null;
          draft: null;
        }
    >(
      `{
        "published": *[_type == "recipe" && _id == $recipeId && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref][0] ${Queries.RECIPE_QUERY},
        "draft": *[_type == "recipe" && _id == 'drafts.' + $recipeId && (_id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref || $recipePublishedId in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref)][0] ${Queries.RECIPE_QUERY}
      }`,
      {
        siteSlug: params.siteSlug,
        recipeId: params.recipeId,
        recipePublishedId: params.recipeId.replace('drafts.', ''),
      },
    );
  },
  async list(params: { siteId: string }) {
    const recipes = await Sanity.Client.fetch<Types.Sanity.Recipe[]>(
      `*[_type == "site" && _id == $siteId][0].recipes[] -> ${Queries.RECIPE_QUERY}`,
      {
        siteId: params.siteId,
      },
    );
    return recipes.map(Adapters.sanityRecipeToRecipe);
  },
  listByCategory(params: { siteSlug: string; categorySlug: string }) {
    return Sanity.Client.fetch<Types.Sanity.RecipePreview[] | null>(
      `*[_type == "recipe" && $categorySlug in categories[]->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${Queries.RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        categorySlug: params.categorySlug,
      },
    );
  },
  listByCuisine(params: { siteSlug: string; cuisineSlug: string }) {
    return Sanity.Client.fetch<Types.Sanity.RecipePreview[] | null>(
      `*[_type == "recipe" && $cuisineSlug in cuisines[]->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${Queries.RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        cuisineSlug: params.cuisineSlug,
      },
    );
  },
  listByTag(params: { siteSlug: string; tagSlug: string }) {
    return Sanity.Client.fetch<Types.Sanity.RecipePreview[] | null>(
      `*[_type == "recipe" && $tagSlug in tags[]->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${Queries.RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        tagSlug: params.tagSlug,
      },
    );
  },
  listByIngredient(params: { siteSlug: string; ingredientSlug: string }) {
    return Sanity.Client.fetch<Types.Sanity.RecipePreview[] | null>(
      `*[_type == "recipe" && $ingredientSlug in ingredientUsageGroups[].ingredientUsages[]->ingredient->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${Queries.RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        ingredientSlug: params.ingredientSlug,
      },
    );
  },
  searchBy(params: {
    siteSlug: string;
    ingredientSlugs?: string[] | null;
    categorySlugs?: string[] | null;
    cuisineSlugs?: string[] | null;
    tagSlugs?: string[] | null;
    limit?: number;
  }) {
    return Sanity.Client.fetch<Types.Sanity.RecipePreview[]>(
      `*[_type == "recipe"
        && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref
        && ($ingredientSlugs != null && count(ingredientUsageGroups[].ingredientUsages[@->ingredient->slug.current in $ingredientSlugs]) > 0 || $ingredientSlugs == null)
        && ($categorySlugs != null && count(categories[@->slug.current in $categorySlugs]) > 0 || $categorySlugs == null)
        && ($cuisineSlugs != null && count(cuisines[@->slug.current in $cuisineSlugs]) > 0 || $cuisineSlugs == null)
        && ($tagSlugs != null && count(tags[@->slug.current in $tagSlugs]) > 0 || $tagSlugs == null)
      ]${params.limit ? `[0...${params.limit}] ` : ''} | order(createdAt desc) ${Queries.RECIPE_PREVIEW_QUERY}
      `,
      {
        siteSlug: params.siteSlug,
        ingredientSlugs:
          Array.isArray(params.ingredientSlugs) && params.ingredientSlugs.length > 0
            ? params.ingredientSlugs
            : null,
        categorySlugs:
          Array.isArray(params.categorySlugs) && params.categorySlugs.length > 0
            ? params.categorySlugs
            : null,
        cuisineSlugs:
          Array.isArray(params.cuisineSlugs) && params.cuisineSlugs.length > 0
            ? params.cuisineSlugs
            : null,
        tagSlugs:
          Array.isArray(params.tagSlugs) && params.tagSlugs.length > 0 ? params.tagSlugs : null,
      },
    );
  },

  TYPE: 'recipe',

  async toSanity(recipe: Types.Recipe) {
    return {
      _id: recipe.id,
      _type: Recipes.TYPE,
      title: recipe.title,
    };
  },

  async update(
    transaction: SanityClient.Transaction,
    recipeId: string,
    recipe: Types.Sanity.Recipe,
  ) {
    // const sanityRecipe = await Recipes.toSanity(recipe);
    return transaction.patch(recipeId, (patch) => patch.set({ title: recipe.title }));
  },
};

export const Units = {
  list() {
    return Sanity.Client.fetch<Types.Sanity.Unit[]>(`*[_type == "unit"] ${Queries.UNIT_QUERY}`);
  },
};

export const Sites = {
  list() {
    return Sanity.Client.fetch<Types.Sanity.Site[]>(`*[_type == "site"] ${Queries.SITE_QUERY}`);
  },

  get(params: { slug: string }) {
    return Sanity.Client.fetch<Types.Sanity.Site | null>(
      `*[_type == "site" && slug.current == $slug][0] ${Queries.SITE_QUERY}`,
      {
        slug: params.slug,
      },
    );
  },
};

export const Globals = {
  async get({ siteSlug }: { siteSlug: string }): Promise<Types.Globals | null> {
    const [site, categories, cuisines, tags, units, ingredients] = await Promise.all([
      Sites.get({ slug: siteSlug }),
      Categories.list({ siteSlug }),
      Cuisines.list({ siteSlug }),
      Tags.list({ siteSlug }),
      Units.list(),
      Ingredients.list(),
    ]);

    if (!site) return null;

    return {
      site,
      categories,
      cuisines,
      tags,
      units,
      ingredients,
    };
  },
};

export const Transaction = {
  new() {
    return Sanity.Client.transaction();
  },
};
