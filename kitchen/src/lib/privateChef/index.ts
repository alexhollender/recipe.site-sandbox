import * as Adapters from '@/lib/privateChef/adapters';
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

    console.log('draft', draft);

    if (draft) return Adapters.SanityRecipe.toAppRecipe(draft);

    const published = await Recipes.getPublished({ siteId, publishedRecipeId });

    await Recipes.createDraft(
      Transaction.new(),
      {
        siteId,
        publishedRecipeId,
      },
      published,
    ).commit({
      visibility: 'sync',
      autoGenerateArrayKeys: true,
    });

    const newDraft = await Recipes.getDraft({ siteId, publishedRecipeId });

    if (!newDraft) throw new Error('Failed to create draft');

    return Adapters.SanityRecipe.toAppRecipe(newDraft);
  },

  getDraft(params: { siteId: string; publishedRecipeId: string }) {
    return Sanity.Client.fetch<Types.Sanity.Recipe | null>(
      `*[_type == "recipe" && _id == $draftRecipeId && site._ref == $siteId][0] ${Queries.RECIPE_QUERY}`,
      {
        siteId: params.siteId,
        draftRecipeId: `drafts.${params.publishedRecipeId}`,
      },
      {
        cache: 'no-store',
      },
    );
  },

  getPublished(params: { siteId: string; publishedRecipeId: string }) {
    return Sanity.Client.fetch<Types.Sanity.Recipe | null>(
      `*[_type == "recipe" && _id == $publishedRecipeId && site._ref == $siteId][0] ${Queries.RECIPE_QUERY}`,
      {
        siteId: params.siteId,
        publishedRecipeId: params.publishedRecipeId,
      },
    );
  },

  createDraft(
    transaction: SanityClient.Transaction,
    params: { siteId: string; publishedRecipeId: string },
    existingRecipe: Types.Sanity.Recipe | null,
  ) {
    if (!existingRecipe) {
      const newRecipe: Types.Sanity.BaseRecipeForUpload = {
        _id: `drafts.${params.publishedRecipeId}`,
        _type: 'recipe',
        site: {
          _type: 'reference',
          _ref: params.siteId,
        },
      };
      return transaction.create(newRecipe);
    }

    return Adapters.SanityRecipe.duplicateForUpload(transaction, existingRecipe, {
      recipeId: `drafts.${params.publishedRecipeId}`,
      siteId: params.siteId,
    });
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
      },
    );
  },

  async list(params: { siteId: string }) {
    const recipes = await Sanity.Client.fetch<Types.Sanity.Recipe[]>(
      `*[_type == "recipe" && site._ref == $siteId] ${Queries.RECIPE_QUERY}`,
      {
        siteId: params.siteId,
      },
    );

    const mergedRecipes = recipes.reduce((byId: Record<string, Types.Sanity.Recipe>, recipe) => {
      /*
      If we haven't seen this recipe before, add it to the list.
      */
      if (!byId[recipe.publishedId]) {
        byId[recipe.publishedId] = recipe;
        return byId;
      }

      /*
      If we have seen this recipe before, check if it's a draft.
      If it is a draft, keep it. We want to display drafts in the list.
      */
      const existing = byId[recipe.publishedId];
      if (existing.isDraft) return byId;

      /*
      If it's not a draft, replace it with this one, which will be the draft.
      */
      byId[recipe.publishedId] = recipe;
      return byId;
    }, {});

    return Object.values(mergedRecipes)
      .sort((a, b) => new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime())
      .map(Adapters.SanityRecipe.toAppRecipe);
  },

  TYPE: 'recipe',

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
