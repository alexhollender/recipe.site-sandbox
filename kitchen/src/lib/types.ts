import * as Pt from '@portabletext/types';
import * as Tiptap from '@tiptap/react';

export type PortableText = Pt.PortableTextBlock[];
export type Richtext = {
  type: 'doc';
  content: Tiptap.JSONContent[];
};

export type RecipeDocument =
  | {
      published: Sanity.Recipe;
      draft: Sanity.Recipe;
    }
  | {
      published: Sanity.Recipe;
      draft: null;
    }
  | {
      published: null;
      draft: Sanity.Recipe;
    };

export type RecipeDraftStatus = 'unpublished' | 'published_with_draft' | 'published_only';

export type Globals = {
  site: Sanity.Site;
  categories: Sanity.RecipeCategory[];
  cuisines: Sanity.Cuisine[];
  tags: Sanity.Tag[];
  units: Sanity.Unit[];
  ingredients: Sanity.Ingredient[];
};

export type Recipe = {
  id: string;
  title: string | null;
  slug: string | null;
  siteId: string;
  publishedId: string;
  isPublished: boolean;
  _updatedAt: string;
  _createdAt: string;
  createdAt: string | null;
  categoryIds: string[];
  cuisineIds: string[];
  tagIds: string[];
  description: Richtext | null;
  featuredMedia: Sanity.Media | null;
  difficultyLevel: 'easy' | 'medium' | 'hard' | null;
  prepTimeMinutes: number | null;
  cookTimeMinutes: number | null;
  totalTimeMinutes: number | null;
  keywords: string[] | null;
  media: Sanity.Media[];

  yieldServings: number | null;
  servingDescription: string | null;
  storyExcerpt: Richtext | null;
  storyMore: Richtext | null;
  note: Richtext | null;

  dietIds: string[];
  mealIds: string[];
  methodIds: string[];
  timing: string | null;

  ingredientUsageGroups: {
    key: string;
    title: string | null;
    note: Richtext | null;
    ingredientUsages: {
      id: string;
      _createdAt: string;
      ingredientId: string | null;
      ingredientTitleOverride: string | null;
      link: string | null;
      quantityMin: number | null;
      quantityMax: number | null;
      unitId: string | null;
      preparationId: string | null;
      preperationModifier: string | null;
      note: Richtext | null;
    }[];
  }[];

  instructionGroups: {
    key: string;
    title: string | null;
    instructions: {
      key: string;
      content: Richtext | null;
      timerMinutes: number | null;
      note: Richtext | null;
      media: Sanity.Media[];
    }[];
  }[];

  legacyRecipeData: any;
};

export namespace Sanity {
  export type ArrayItem<TObject> = { _key: string } & TObject;

  export type Link = {
    _type: 'link';
    href: string;
    openInNewTab: boolean;
  };

  export type Author = {
    _type: 'author';
    _id: string;
    name: string;
    slug: string;
    avatar: Image | null;
  };

  export type RecipeCategory = {
    _type: 'recipeCategory';
    _id: string;
    title: string;
    slug: string;
  };

  export type Cuisine = {
    _type: 'cuisine';
    _id: string;
    title: string;
    slug: string;
  };

  export type Method = {
    _type: 'method';
    _id: string;
    title: string;
    slug: string;
  };

  export type Meal = {
    _type: 'method';
    _id: string;
    title: string;
    slug: string;
  };

  export type Diet = {
    _type: 'method';
    _id: string;
    title: string;
    slug: string;
  };

  export type Tag = {
    _type: 'tag';
    _id: string;
    title: string;
    slug: string;
  };

  export type Image = {
    _type: 'image';
    _key: string;
    asset: {
      _id: string;
      _type: 'sanity.imageAsset';
      metadata: {
        lqip: string;
        dimensions: {
          aspectRatio: number;
          width: number;
          height: number;
        };
      };
      caption: string;
      crop: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    };
  };

  export type File = {
    _type: 'file';
    asset: {
      _id: string;
      _type: string;
      url: string;
    };
  };

  export type Media = {
    _type: 'media';
    _key: string;
    image: Image | null;
    video: File | null;
    alternateText: string | null;
    caption: string | null;
  };

  export type Equipment = {
    _type: 'equipment';
    _id: string;
    title: string;
    slug: string;
    featuredImage: Image | null;
  };

  export type Ingredient = {
    _type: 'ingredient';
    _id: string;
    title: string;
    slug: string;
    alternateTitles: string[] | null;
    featuredImage: Image | null;
    description: PortableText;
  } & (
    | {
        ingredientType: 'solid';
        gramsPerCup: number;
      }
    | {
        ingredientType: 'liquid';
        gramsPerCup: null;
      }
  );

  export type Unit = {
    _type: 'unit';
    _id: string;
    title: string;
    pluralTitle: string | null;
    slug: string;
    abbreviation: string | null;
  };

  export type UnitsByTitle = Record<string, Unit>;

  export type Preparation = {
    _type: 'preparation';
    _id: string;
    title: string;
    pastTense: string;
    featuredImage: Image | null;
  };

  export type IngredientUsage = {
    _type: 'ingredientUsage';
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    ingredient: Ingredient | null;
    ingredientTitleOverride: string | null;
    link: string | null;
    quantityMin: number | null;
    quantityMax: number | null;
    unit: Unit | null;
    preparation: Preparation | null;
    preperationModifier: string | null;
    note: PortableText | null;
  };

  export type IngredientUsageGroup = {
    _key: string;
    title: string | null;
    note: PortableText | null;
    ingredientUsages: IngredientUsage[];
  };

  export type Instruction = {
    _key: string;
    content: PortableText;
    timerMinutes: number | null;
    note: PortableText | null;
    media: Media[] | null;
  };

  export type InstructionGroup = {
    _key: string;
    title: string | null;
    instructions: Instruction[];
  };

  export type RecipePreview = {
    _type: 'recipe';
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    publishedId: string;
    isDraft: boolean;
    isPublished: boolean;
    site: {
      _id: string;
      _type: 'site';
      title: string;
      slug: string;
    };
    title: string | null;
    slug: string | null;
    createdAt: string; // Date
    categories: null | RecipeCategory[];
    methods: null | Method[];
    meals: null | Meal[];
    diets: null | Diet[];
    cuisines: null | Cuisine[];
    tags: null | Tag[];
    description: PortableText | null;
    descriptionPlaintext: string | null;
    featuredMedia: Media;
    difficultyLevel: 'easy' | 'medium' | 'hard' | null;
    ingredientUsageCount: number;
    prepTimeMinutes: null | number;
    cookTimeMinutes: null | number;
    totalTimeMinutes: number | null;
    collections: null | CollectionPreview[];
  };

  export type Recipe = RecipePreview & {
    keywords: string[] | null;
    media: Media[] | null;
    yieldServings: number;
    servingDescription: string | null;
    storyExcerpt: PortableText | null;
    storyMore: PortableText | null;
    note: PortableText | null;
    timing: string | null;
    equipmentUsages:
      | {
          equipment: Equipment;
          note: string | null;
          imageOverride: Image | null;
          equipmentTitleOverride: string | null;
          link: string;
        }[]
      | null;
    ingredientUsageGroups: IngredientUsageGroup[] | null;
    instructionGroups: InstructionGroup[] | null;
  } & (
      | {
          legacyRecipeData: null;
        }
      | {
          legacyRecipeData: {
            featuredImage: {
              src: string;
              width: number;
              height: number;
            };
            content: string;
          };
        }
    );

  export type MediaForUpload = {
    _type: 'media';
    image:
      | {
          _type: 'image';
          asset: {
            _type: 'reference';
            _ref: string;
          };
        }
      | undefined;
    video:
      | {
          _type: 'file';
          asset: {
            _type: 'reference';
            _ref: string;
          };
        }
      | undefined;
  };

  export type BaseRecipeForUpload = {
    _id: string;
    _type: 'recipe';
    site: {
      _type: 'reference';
      _ref: string;
    };
  };

  export type RecipeForUpload = BaseRecipeForUpload & {
    _createdAt: string;
    title: string;
    slug:
      | {
          _type: 'slug';
          current: string;
        }
      | undefined;
    categories: {
      _type: 'reference';
      _ref: string;
    }[];
    cuisines: {
      _type: 'reference';
      _ref: string;
    }[];
    tags: {
      _type: 'reference';
      _ref: string;
    }[];
    diets: {
      _type: 'reference';
      _ref: string;
    }[];
    meals: {
      _type: 'reference';
      _ref: string;
    }[];
    methods: {
      _type: 'reference';
      _ref: string;
    }[];
    createdAt: string | undefined;
    description: PortableText | undefined;
    featuredMedia: MediaForUpload | undefined;
    difficultyLevel: 'easy' | 'medium' | 'hard' | undefined;
    prepTimeMinutes: number | undefined;
    cookTimeMinutes: number | undefined;
    totalTimeMinutes: number | undefined;
    keywords: string[] | undefined;
    yieldServings: number | undefined;
    servingDescription: string | undefined;
    storyExcerpt: PortableText | undefined;
    storyMore: PortableText | undefined;
    note: PortableText | undefined;
    timing: string | undefined;
    legacyRecipeData:
      | {
          featuredImage: {
            src: string;
            width: number;
            height: number;
          };
          content: string;
        }
      | undefined;
    ingredientUsageGroups: {
      _type: 'ingredientUsageGroup';
      title: string | undefined;
      note: PortableText | undefined;
      ingredientUsages: {
        _type: 'reference';
        _ref: string;
      }[];
    }[];
    instructionGroups: {
      _type: 'instructionGroup';
      title: string | undefined;
      instructions: {
        _type: 'instruction';
        timerMinutes: number | undefined;
        note: PortableText | undefined;
        media: MediaForUpload[] | undefined;
        content: PortableText | undefined;
      }[];
    }[];
  };

  export type IngredientUsageForUpload = {
    _id: string;
    _type: 'ingredientUsage';
    _createdAt: string;
    ingredient:
      | {
          _type: 'reference';
          _ref: string;
        }
      | undefined;
    ingredientTitleOverride: string | undefined;
    link: string | undefined;
    quantityMin: number | undefined;
    quantityMax: number | undefined;
    unit:
      | {
          _type: 'reference';
          _ref: string;
        }
      | undefined;
    preparation:
      | {
          _type: 'reference';
          _ref: string;
        }
      | undefined;
    preperationModifier: string | undefined;
    note: PortableText | undefined;
  };

  export type SocialMediaLink = {
    _key: string;
    platform: 'discord' | 'instagram' | 'pinterest' | 'substack' | 'tiktok' | 'x' | 'youtube';
    url: string;
  };

  export type ProductLink = {
    productTitle: PortableText;
    productTitlePlaintext: string;
    productImage: Image;
    href: string;
  };

  export type Color = {
    _type: 'color';
    hex: HexColor;
  };

  export type Theme = {
    _id: string;
    _type: 'theme';
    title: string;
    colorText: Color;
    colorAccent: Color;
    colorSubdued: Color;
    colorOverlay: Color;
    colorBackground: Color;
    colorPanel: Color;
    colorEmphasis: Color;
    colorOutline: Color;
  };

  export type HexColor = string;

  export type Site = {
    _type: 'site';
    _id: string;
    title: string;
    slug: string;
    authors: Author[];
    recipes: Recipe[];
    featuredRecipes: Recipe[];
    collections: Collection[];
    socialMediaLinks: SocialMediaLink[];
    aboutShort: PortableText;
    aboutShortPlaintext: string;
    aboutHeading: PortableText | null;
    about: PortableText;
    featuredImage: Image;
    productLinks: Sanity.ArrayItem<ProductLink>[];
    logo: Image | null;
    theme: Theme | null;
    linkList: null | {
      title: string;
      links: {
        label: string;
        href: string;
        _key: string;
      }[];
    };
    customHeaderLinks:
      | null
      | {
          label: string;
          href: string;
          openInNewTab: boolean;
          _key: string;
        }[];
    defaultMeasurementSystem: MeasurementSystem;
    defaultTemperatureSystem: TemperatureSystem;
    googleAnalyticsId: string;
  };

  export type MeasurementSystem = 'imperial' | 'metric';
  export type TemperatureSystem = 'celsius' | 'fahrenheit';

  export type CollectionPreview = {
    _type: 'collection';
    _id: string;
    title: string;
    slug: string;
    description: PortableText;
    featuredMedia: Media;
    color: string;
  };

  export type Collection = CollectionPreview & {
    _type: 'collection';
    _id: string;
    title: string;
    slug: string;
    description: PortableText;
    featuredMedia: Media;
    color: string;
    recipes: RecipePreview[];
  };
}
