import * as Sanity from 'lib/sanity';
import * as Types from 'lib/types';

import groq from 'groq';

const AUTHOR_QUERY = groq`
  {
    _type,
    _id,
    name,
    "slug": slug.current
  }
`;

const RECIPE_CATEGORY_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

const CUISINE_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

const TAG_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

const IMAGE_QUERY = groq`
  {
    asset -> {
      _id,
      _type,
      metadata {
        lqip,
        dimensions {
          aspectRatio,
          width,
          height
        }
      }
    },
    caption,
    crop
  }
`;

const FILE_QUERY = groq`
  {
    _type,
    asset -> {
      _id,
      _type,
      url
    }
  }
`;

const MEDIA_QUERY = groq`
  {
    _type,
    _key,
    "image": image ${IMAGE_QUERY},
    "video": file ${FILE_QUERY}
  }
`;

const YIELD_UNIT_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

const EQUIPMENT_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current,
    "featuredImage": featuredImage ${IMAGE_QUERY}
  }
`;

const INGREDIENT_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current,
    alternateTitles,
    "featuredImage": featuredImage ${IMAGE_QUERY},
    description,
    weightToVolumeConversion {
      weightGrams,
      volumeCups
    }
  }
`;

const INGREDIENT_UNIT_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current,
    abbreviation
  }
`;

const PREPARTION_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current,
    "featuredImage": featuredImage ${IMAGE_QUERY}
  }
`;

const RECIPE_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current,
    createdAt,
    keywords,
    "categories": recipeCategories[] -> ${RECIPE_CATEGORY_QUERY},
    "cuisines": cuisines[] -> ${CUISINE_QUERY},
    "tags": tags[] -> ${TAG_QUERY},
    description,
    "featuredMedia": featuredMedia ${MEDIA_QUERY},
    "media": media[] ${MEDIA_QUERY},
    prepTimeMinutes,
    cookTimeMinutes,
    timing,
    yield {
      quantity,
      unit -> ${YIELD_UNIT_QUERY}
    },
    "equipmentUsed": equipmentUsed[] {
      "equipment": equipment -> ${EQUIPMENT_QUERY},
      note,
      "imageOverride": imageOverride ${IMAGE_QUERY},
      link
    },
    "ingredientApplicationGroups": ingredientApplicationGroups[] {
      title,
      note,
      "ingredients": ingredients[] {
        "ingredient": ingredient -> ${INGREDIENT_QUERY},
        quantity,
        "unit": unit -> ${INGREDIENT_UNIT_QUERY},
        "preparation": preparation -> ${PREPARTION_QUERY},
        note
      },
    },
    storyExcerpt,
    storyMore,
  }
`;

const SITE_QUERY = groq`
  {
    _type,
    _id,
    "authors": authors[] -> ${AUTHOR_QUERY},
    "recipes": recipes[] -> ${RECIPE_QUERY}
  }
`;

export const Sites = {
  get(params: { slug: string }) {
    return Sanity.Client.fetch<Types.Site | null>(
      `*[_type == "site" && slug.current == $slug][0] ${SITE_QUERY}`,
      {
        slug: params.slug,
      },
    );
  },
};

export const Recipes = {
  get(params: { slug: string }) {
    return Sanity.Client.fetch<Types.Recipe | null>(
      `*[_type == "recipe" && slug.current == $slug][0] ${RECIPE_QUERY}`,
      {
        slug: params.slug,
      },
    );
  },
};

const site = await Sites.get({ slug: 'jerumai' });
const recipe = await Recipes.get({ slug: '25g-protein-bagels' });

console.log('site', site);
console.log('recipe', recipe);
