import * as Pt from '@portabletext/types';
import * as Tiptap from '@tiptap/react';

export type PortableText = Pt.PortableTextBlock[];
export type Richtext = Tiptap.JSONContent[];

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
  title: string;
  slug: string;
  publishedId: string;
  isPublished: boolean;
  description: Richtext | null;
  featuredMedia: Sanity.Media;
  media: Sanity.Media[];
  storyExcerpt: Richtext | null;
  story: Richtext | null;
  createdAt: string | null;
  categoryIds: string[];
  cuisineIds: string[];
  tagIds: string[];
  dietIds: string[];
  mealIds: string[];
  methodIds: string[];
  prepTimeMinutes: number | null;
  cookTimeMinutes: number | null;
  totalTimeMinutes: number | null;
  timing: string | null;
  yieldServings: number | null;
  servingDescription: string | null;
  difficultyLevel: string | null;
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
    ingredient: Ingredient;
    ingredientTitleOverride: string | null;
    link: string;
    quantityMin: number | null;
    quantityMax: number | null;
    unit: Unit | null;
    preparation: Preparation | null;
    preperationModifier: string | null;
    note: PortableText | null;
  };

  export type IngredientUsageGroup = {
    _key: string;
    title?: string | null;
    note?: PortableText | null;
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
    publishedId: string;
    isPublished: boolean;
    title: string;
    slug: string;
    createdAt: string; // Date
    categories: null | RecipeCategory[];
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
