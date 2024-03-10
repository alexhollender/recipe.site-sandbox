import * as Sanity from '@/lib/sanity';
import * as Types from '@/lib/types';

import groq from 'groq';

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

const AUTHOR_QUERY = groq`
  {
    _type,
    _id,
    name,
    "slug": slug.current,
    avatar ${IMAGE_QUERY}
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
    "video": video ${FILE_QUERY},
    alternateText,
    caption
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
    ingredientType,
    mlPerCup,
    gramsPerCup
  }
`;

const UNIT_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current,
    abbreviation
  }
`;

const PREPARATION_QUERY = groq`
  {
    _type,
    _id,
    title,
    pastTense,
    "slug": slug.current,
    "featuredImage": featuredImage ${IMAGE_QUERY}
  }
`;

const INGREDIENT_USAGE_QUERY = groq`
{
  "ingredient": ingredient -> ${INGREDIENT_QUERY},
  ingredientTitleOverride,
  quantityMin,
  quantityMax,
  link,
  preperationModifier,
  "unit": unit -> ${UNIT_QUERY},
  "preparation": preparation -> ${PREPARATION_QUERY},
  note
}
`;

const RICHTEXT_QUERY = groq`
  {
    ...,
    markDefs[]{
      ...,
      _type == "link" => {
        href
      },
      _type == "ingredientUsageReference" => {
        ingredientUsage -> ${INGREDIENT_USAGE_QUERY},
      },
      _type == "measurement" => {
        quantity,
        unit -> ${UNIT_QUERY}
      },
    }
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
    "description": description[] ${RICHTEXT_QUERY},
    "featuredMedia": featuredMedia ${MEDIA_QUERY},
    "media": media[] ${MEDIA_QUERY},
    prepTimeMinutes,
    cookTimeMinutes,
    timing,
    yieldServings,
    servingDescription,
    storyExcerpt,
    storyMore,
    "note": note ${RICHTEXT_QUERY},
    "equipmentUsages": equipmentUsages[] {
      _key,
      "equipment": equipment -> ${EQUIPMENT_QUERY},
      note,
      "imageOverride": imageOverride ${IMAGE_QUERY},
      equipmentTitleOverride,
      link
    },
    "ingredientUsageCount": count(ingredientUsageGroups[].ingredientUsages[]),
    "ingredientUsageGroups": ingredientUsageGroups[] {
      _key,
      title,
      note,
      "ingredientUsages": ingredientUsages[] -> ${INGREDIENT_USAGE_QUERY},
    },
    "instructionGroups": instructionGroups[] {
      _key,
      title,
      "instructions": instructions[] {
        _key,
        content[] ${RICHTEXT_QUERY},
        timerMinutes,
        note,
        "media": media[] -> ${MEDIA_QUERY}
      }
    }
  }
`;

const RECIPE_PREVIEW_QUERY = groq`
{
  _type,
  _id,
  title,
  "slug": slug.current,
  "featuredMedia": featuredMedia ${MEDIA_QUERY},
  "description": description ${RICHTEXT_QUERY},
}`;

const SITE_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current,
    "authors": authors[] -> ${AUTHOR_QUERY},
    "recipes": recipes[] -> ${RECIPE_PREVIEW_QUERY},
    "featuredRecipes": featuredRecipes[] -> ${RECIPE_PREVIEW_QUERY}
  }
`;

export const Sites = {
  list() {
    return Sanity.Client.fetch<Types.Site[]>(`*[_type == "site"] ${SITE_QUERY}`);
  },

  get(params: { slug: string }) {
    return Sanity.Client.fetch<Types.Site | null>(
      `*[_type == "site" && slug.current == $slug][0] ${SITE_QUERY}`,
      {
        slug: params.slug,
      },
    );
  },
};

export const Categories = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Site | null>(
      `*[_type == "recipeCategory" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->categories[]._ref][0] ${RECIPE_CATEGORY_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Cuisines = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Site | null>(
      `*[_type == "cuisine" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->cuisines[]._ref][0] ${CUISINE_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Tags = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Site | null>(
      `*[_type == "tag" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->tags[]._ref][0] ${CUISINE_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Ingredients = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Site | null>(
      `*[_type == "ingredient" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->ingredientUsageGroups[].ingredientUsages[]->ingredient._ref][0] ${CUISINE_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Recipes = {
  get(params: { siteSlug: string; recipeSlug: string }) {
    return Sanity.Client.fetch<Types.Recipe | null>(
      `*[_type == "recipe" && slug.current == $recipeSlug && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref][0] ${RECIPE_QUERY}`,
      {
        siteSlug: params.siteSlug,
        recipeSlug: params.recipeSlug,
      },
    );
  },
  listByCategory(params: { siteSlug: string; categorySlug: string }) {
    return Sanity.Client.fetch<Types.Recipe | null>(
      `*[_type == "recipe" && $categorySlug in categories[]->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        categorySlug: params.categorySlug,
      },
    );
  },
  listByCuisine(params: { siteSlug: string; cuisineSlug: string }) {
    return Sanity.Client.fetch<Types.Recipe | null>(
      `*[_type == "recipe" && $cuisineSlug in cuisines[]->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        cuisineSlug: params.cuisineSlug,
      },
    );
  },
  listByTag(params: { siteSlug: string; tagSlug: string }) {
    return Sanity.Client.fetch<Types.Recipe | null>(
      `*[_type == "recipe" && $tagSlug in tag[]->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        tagSlug: params.tagSlug,
      },
    );
  },
  listByIngredient(params: { siteSlug: string; ingredientSlug: string }) {
    return Sanity.Client.fetch<Types.Recipe | null>(
      `*[_type == "recipe" && $ingredientSlug in ingredientUsageGroups[].ingredientUsages[]->ingredient->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        ingredientSlug: params.ingredientSlug,
      },
    );
  },
};
