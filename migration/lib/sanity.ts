import * as Config from 'lib/config';
import * as SanityClient from '@sanity/client';
import * as Uuid from 'uuid';

import LegacyRecipes from 'data/legacyRecipes';

const sanity = SanityClient.createClient({
  projectId: Config.SANITY_PROJECT_ID,
  dataset: Config.SANITY_DATASET,
  apiVersion: '2023-10-05',
  useCdn: false,
  token: Config.SANITY_AUTH_TOKEN,
});

type LegacyRecipe = (typeof LegacyRecipes)[number];

const UUID_NAMESPACE = '00000000-0000-0000-0000-000000000000';
const LEGACY_NAMESPACE = 'legacy';
const makeId = (type: string, slug: string) => {
  return `${LEGACY_NAMESPACE}_${type}_${Uuid.v5(slug, UUID_NAMESPACE)}`;
};

export const Recipes = {
  TYPE: 'recipe',

  async fromFile(recipe: LegacyRecipe) {
    const response = await fetch(recipe.image.src);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('Downloading Image from Recipe', recipe.title, recipe.image.src);

    const uploadedImage = await sanity.assets.upload('image', buffer);

    return {
      _id: makeId(Recipes.TYPE, recipe.id),
      _type: Recipes.TYPE,
      title: recipe.title,
      slug: {
        _type: 'slug',
        current: recipe.id,
      },
      createdAt: new Date(recipe.formattedDate).toISOString(),
      featuredMedia: {
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id,
          },
        },
      },
      legacyRecipeData: {
        featuredImage: {
          src: recipe.image.src,
          height: recipe.image.height,
          width: recipe.image.width,
        },
        content: recipe.content,
      },
    };
  },

  async createOrReplace(transaction: SanityClient.Transaction, recipe: LegacyRecipe) {
    const sanityRecipe = await Recipes.fromFile(recipe);
    return transaction.createOrReplace(sanityRecipe);
  },

  deleteAll() {
    return sanity.delete({ query: `*[_type == '${Recipes.TYPE}']` });
  },
};

export const Transaction = {
  new() {
    return sanity.transaction();
  },
};
