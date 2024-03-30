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

const LINK_QUERY = groq`{
  _type,
  href,
  openInNewTab
}`;

const AUTHOR_QUERY = groq`
  {
    _type,
    _id,
    name,
    "slug": slug.current,
    avatar ${IMAGE_QUERY},
    bio,
    learnMoreLink ${LINK_QUERY}
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
      url,
      originalFilename
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

const PREPARTION_QUERY = groq`
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
  _id,
  _type,
  "ingredient": ingredient -> ${INGREDIENT_QUERY},
  ingredientTitleOverride,
  quantityMin,
  quantityMax,
  link,
  preperationModifier,
  "unit": unit -> ${UNIT_QUERY},
  "preparation": preparation -> ${PREPARTION_QUERY},
  note
}
`;

const RICHTEXT_QUERY = groq`
  {
    ...,
    markDefs[]{
      ...,
      _type == "link" => ${LINK_QUERY},
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

const COLLECTION_PREVIEW_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current,
    "description": description[] ${RICHTEXT_QUERY},
    "featuredMedia": featuredMedia ${MEDIA_QUERY},
    color
  }
`;

const RECIPE_PREVIEW_QUERY = groq`
{
  _type,
  _id,
  title,
  "slug": slug.current,
  createdAt,
  difficultyLevel,
  "categories": categories[] -> ${RECIPE_CATEGORY_QUERY},
  "cuisines": cuisines[] -> ${CUISINE_QUERY},
  "tags": tags[] -> ${TAG_QUERY},
  "featuredMedia": featuredMedia ${MEDIA_QUERY},
  "description": description[] ${RICHTEXT_QUERY},
  "descriptionPlaintext": pt::text(description),
  "ingredientUsageCount": count(ingredientUsageGroups[].ingredientUsages[]),
  "collections": *[_type == 'collection' && ^._id in recipes[]._ref] ${COLLECTION_PREVIEW_QUERY},
  prepTimeMinutes,
  cookTimeMinutes,
  totalTimeMinutes,
  "legacyRecipeData": legacyRecipeData {
    featuredImage {
      src,
      width,
      height
    }
  }
}`;

const RECIPE_QUERY = groq`
  {
    ...${RECIPE_PREVIEW_QUERY},
    keywords,
    "media": media[] ${MEDIA_QUERY},
    yieldServings,
    servingDescription,
    storyExcerpt,
    storyMore,
    timing,
    "note": note[] ${RICHTEXT_QUERY},
    "equipmentUsages": equipmentUsages[] {
      _key,
      "equipment": equipment -> ${EQUIPMENT_QUERY},
      note,
      "imageOverride": imageOverride ${IMAGE_QUERY},
      equipmentTitleOverride,
      link
    },
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
    },
    "legacyRecipeData": legacyRecipeData {
      featuredImage {
        src,
        width,
        height
      },
      content
    }
  }
`;

const COLLECTION_QUERY = groq`
  {
    ...${COLLECTION_PREVIEW_QUERY},
    recipes[] -> ${RECIPE_PREVIEW_QUERY}
  }
`;

const SITE_QUERY = groq`
  {
    _type,
    _id,
    title,
    "authors": authors[] -> ${AUTHOR_QUERY},
    "recipes": recipes[] -> ${RECIPE_PREVIEW_QUERY} | order(createdAt desc),
    "featuredRecipes": featuredRecipes[] -> ${RECIPE_PREVIEW_QUERY},
    socialMediaLinks[] {
      _key,
      platform,
      url
    },
    collections[] -> ${COLLECTION_QUERY},
    aboutShort[] ${RICHTEXT_QUERY},
    aboutHeading[] ${RICHTEXT_QUERY},
    about[] ${RICHTEXT_QUERY},
    featuredImage ${IMAGE_QUERY},
    productLinks[] {
      _key,
      productTitle,
      "productTitlePlaintext": pt::text(productTitle),
      productImage ${IMAGE_QUERY},
      href
    },
    linkList {
      title,
      links[] {
        _key,
        label,
        href
      }
    }
  }
`;

export const Categories = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.RecipeCategory[]>(
      `*[_type == "recipeCategory" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->categories[]._ref] ${RECIPE_CATEGORY_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Collections = {
  get(params: { siteSlug: string; collectionSlug: string }) {
    return Sanity.Client.fetch<Types.Collection | null>(
      `*[_type == "collection" && slug.current == $collectionSlug && _id in *[_type == "site" && slug.current == $siteSlug][0].collections[]._ref][0] ${COLLECTION_QUERY}`,
      {
        siteSlug: params.siteSlug,
        collectionSlug: params.collectionSlug,
      },
    );
  },
};

export const Cuisines = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Cuisine[]>(
      `*[_type == "cuisine" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->cuisines[]._ref] ${CUISINE_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Tags = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Tag[]>(
      `*[_type == "tag" && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]->tags[]._ref] ${TAG_QUERY}`,
      {
        siteSlug: params.siteSlug,
      },
    );
  },
};

export const Ingredients = {
  list(params: { siteSlug: string }) {
    return Sanity.Client.fetch<Types.Ingredient[]>(
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
    return Sanity.Client.fetch<Types.RecipePreview[] | null>(
      `*[_type == "recipe" && $categorySlug in categories[]->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        categorySlug: params.categorySlug,
      },
    );
  },
  listByCuisine(params: { siteSlug: string; cuisineSlug: string }) {
    return Sanity.Client.fetch<Types.RecipePreview[] | null>(
      `*[_type == "recipe" && $cuisineSlug in cuisines[]->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        cuisineSlug: params.cuisineSlug,
      },
    );
  },
  listByTag(params: { siteSlug: string; tagSlug: string }) {
    return Sanity.Client.fetch<Types.RecipePreview[] | null>(
      `*[_type == "recipe" && $tagSlug in tags[]->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${RECIPE_PREVIEW_QUERY}`,
      {
        siteSlug: params.siteSlug,
        tagSlug: params.tagSlug,
      },
    );
  },
  listByIngredient(params: { siteSlug: string; ingredientSlug: string }) {
    return Sanity.Client.fetch<Types.RecipePreview[] | null>(
      `*[_type == "recipe" && $ingredientSlug in ingredientUsageGroups[].ingredientUsages[]->ingredient->slug.current && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref] ${RECIPE_PREVIEW_QUERY}`,
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
    return Sanity.Client.fetch<Types.RecipePreview[]>(
      `*[_type == "recipe"
        && _id in *[_type == "site" && slug.current == $siteSlug][0].recipes[]._ref
        && ($ingredientSlugs != null && count(ingredientUsageGroups[].ingredientUsages[@->ingredient->slug.current in $ingredientSlugs]) > 0 || $ingredientSlugs == null)
        && ($categorySlugs != null && count(categories[@->slug.current in $categorySlugs]) > 0 || $categorySlugs == null)
        && ($cuisineSlugs != null && count(cuisines[@->slug.current in $cuisineSlugs]) > 0 || $cuisineSlugs == null)
        && ($tagSlugs != null && count(tags[@->slug.current in $tagSlugs]) > 0 || $tagSlugs == null)
      ]${params.limit ? `[0...${params.limit}] ` : ''} | order(createdAt desc) ${RECIPE_PREVIEW_QUERY}
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
};

export const Units = {
  list() {
    return Sanity.Client.fetch<Types.Unit[]>(`*[_type == "unit"] ${UNIT_QUERY}`);
  },
};

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

export const SiteGlobals = {
  async get(siteSlug: string): Promise<Types.SiteGlobals> {
    const [site, categories, cuisines, tags, units] = await Promise.all([
      Sites.get({ slug: siteSlug }),
      Categories.list({ siteSlug }),
      Cuisines.list({ siteSlug }),
      Tags.list({ siteSlug }),
      Units.list(),
    ]);

    if (!site) throw new Error(`Site not found: ${siteSlug}`);

    return {
      site,
      categories,
      cuisines,
      tags,
      units,
    };
  },
};
