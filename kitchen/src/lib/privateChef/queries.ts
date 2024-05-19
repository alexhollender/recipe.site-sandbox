import groq from 'groq';

export const IMAGE_QUERY = groq`
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

export const LINK_QUERY = groq`{
  _type,
  href,
  openInNewTab
}`;

export const AUTHOR_QUERY = groq`
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

export const RECIPE_CATEGORY_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

export const METHOD_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

export const MEAL_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

export const DIET_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

export const CUISINE_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

export const TAG_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current
  }
`;

export const FILE_QUERY = groq`
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

export const MEDIA_QUERY = groq`
  {
    _type,
    _key,
    "image": image ${IMAGE_QUERY},
    "video": video ${FILE_QUERY},
    alternateText,
    caption
  }
`;

export const EQUIPMENT_QUERY = groq`
  {
    _type,
    _id,
    title,
    "slug": slug.current,
    "featuredImage": featuredImage ${IMAGE_QUERY}
  }
`;

export const INGREDIENT_QUERY = groq`
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

export const UNIT_QUERY = groq`
  {
    _type,
    _id,
    title,
    pluralTitle,
    "slug": slug.current,
    abbreviation,
  }
`;

export const PREPARTION_QUERY = groq`
  {
    _type,
    _id,
    title,
    pastTense,
    "slug": slug.current,
    "featuredImage": featuredImage ${IMAGE_QUERY}
  }
`;

export const INGREDIENT_USAGE_QUERY = groq`
{
  _id,
  _createdAt,
  _updatedAt,
  _ref,
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

export const RICHTEXT_QUERY = groq`
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

export const COLLECTION_PREVIEW_QUERY = groq`
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

export const RECIPE_PREVIEW_QUERY = groq`
{
  _type,
  _id,
  _createdAt,
  _updatedAt,
  title,
  site -> {
    _id,
    _type,
    title,
    "slug": slug.current
  },
  "publishedId": select(
    string::startsWith(_id, "drafts.") => string::split(_id, "drafts.")[1],
    _id
  ),
  "isDraft": string::startsWith(_id, "drafts."),
  "isPublished": defined(*[_type == "recipe" && _id == select(
    string::startsWith(^._id, "drafts.") => string::split(^._id, "drafts.")[1],
    _id
  )][0]),
  "slug": slug.current,
  createdAt,
  difficultyLevel,
  "categories": categories[] -> ${RECIPE_CATEGORY_QUERY},
  "methods": methods[] -> ${METHOD_QUERY},
  "meals": meals[] -> ${MEAL_QUERY},
  "diets": diets[] -> ${DIET_QUERY},
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

export const RECIPE_QUERY = groq`
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
        media[] ${MEDIA_QUERY}
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

export const COLLECTION_QUERY = groq`
  {
    ...${COLLECTION_PREVIEW_QUERY},
    recipes[] -> ${RECIPE_PREVIEW_QUERY}
  }
`;

export const COLOR_QUERY = groq`{
  _type,
  hex,
}`;

export const THEME_QUERY = groq`
  {
    _type,
    _id,
    title,
    colorText ${COLOR_QUERY},
    colorAccent ${COLOR_QUERY},
    colorSubdued ${COLOR_QUERY},
    colorOverlay ${COLOR_QUERY},
    colorBackground ${COLOR_QUERY},
    colorPanel ${COLOR_QUERY},
    colorEmphasis ${COLOR_QUERY},
    colorOutline ${COLOR_QUERY}
  }
`;

export const SITE_QUERY = groq`
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
    "aboutShortPlaintext": pt::text(aboutShort),
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
    logo ${IMAGE_QUERY},
    linkList {
      title,
      links[] {
        _key,
        label,
        href
      }
    },
    customHeaderLinks[] {
      _key,
      label,
      href,
      openInNewTab,
    },
    theme -> ${THEME_QUERY},
    defaultMeasurementSystem,
    defaultTemperatureSystem
  }
`;
