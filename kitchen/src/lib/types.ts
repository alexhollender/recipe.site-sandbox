export type PortableText = {
  _type: 'block' | string;
  _key?: string;
}[];

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
  ingredientType: 'solid' | 'liquid';
  gramsPerCup: number | null;
  mlPerCup: number | null;
};

export type Unit = {
  _type: 'unit';
  _id: string;
  title: string;
  slug: string;
  abbreviation: string | null;
};

export type Preparation = {
  _type: 'preparation';
  _id: string;
  title: string;
  pastTense: string;
  featuredImage: Image | null;
};

export type IngredientUsage = {
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

export type IngredientConversion = {
  quantityMin: IngredientUsage['quantityMin'];
  quantityMax: IngredientUsage['quantityMax'];
  unitSlug: Unit['slug'];
  gramsPerCup: Ingredient['gramsPerCup'];
  recipeUnits: string | string[];
  quantityMultiplier: number;
};

export type ConversionSettings = {
  recipeUnits: string | string[];
  quantityMultiplier: number;
};

export type Recipe = {
  _type: 'recipe';
  _id: string;
  title: string;
  slug: string;
  createdAt: string; // Date
  keywords: string[] | null;
  categories: RecipeCategory[];
  cuisines: Cuisine[];
  tags: Tag[];
  description: PortableText | null;
  featuredMedia: Media;
  media: Media[];
  prepTimeMinutes: number | null;
  cookTimeMinutes: number | null;
  timing: string | null;
  yieldServings: number | null;
  yieldDescription: string | null;
  storyExcerpt: PortableText | null;
  storyMore: PortableText | null;
  note: PortableText | null;
  equipmentUsages:
    | {
        equipment: Equipment;
        note: string | null;
        imageOverride: Image | null;
        equipmentTitleOverride: string | null;
        link: string;
      }[]
    | null;
  ingredientUsageCount: number;
  ingredientUsageGroups:
    | {
        _key: string;
        title: string | null;
        note: PortableText | null;
        ingredientUsages: IngredientUsage[];
      }[]
    | null;
  instructionGroups:
    | {
        _key: string;
        title: string | null;
        instructions: {
          _key: string;
          content: PortableText;
          timerMinutes: number | null;
          note: PortableText | null;
          media: Media[] | null;
        }[];
      }[]
    | null;
};

export type Site = {
  _type: 'site';
  _id: string;
  title: string;
  slug: string;
  authors: Author[];
  recipes: Recipe[];
  featuredRecipes: Recipe[];
};
