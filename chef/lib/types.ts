export type PortableText = {
  _type: 'block' | string;
  _key?: string;
}[];

export type Author = {
  _type: 'author';
  _id: string;
  name: string;
  slug: string;
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
};

export type YieldUnit = {
  _type: 'yieldUnit';
  _id: string;
  title: string;
  slug: string;
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
  weightToVolumeConversion: {
    weightGrams: number;
    volumeCups: number;
  } | null;
};
export type IngredientUnit = {
  _type: 'ingredientUnit';
  _id: string;
  title: string;
  slug: string;
  abbreviation: string | null;
};

export type Preparation = {
  _type: 'preparation';
  _id: string;
  title: string;
  featuredImage: Image | null;
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
  prepTimeMinutes: number | null;
  cookTimeMinutes: number | null;
  timing: string | null;
  yield: {
    quantity: number;
    unit: YieldUnit;
  } | null;
  equipmentUsed:
    | {
        equipment: Equipment;
        note: string | null;
        imageOverride: Image | null;
        link: string;
      }[]
    | null;
  ingredientApplicationGroups:
    | {
        title: string | null;
        note: string | null;
        ingredients: {
          ingredient: Ingredient;
          quantity: number | null;
          unit: IngredientUnit | null;
          preparation: Preparation | null;
          note: PortableText | null;
        }[];
      }[]
    | null;
  storyExcept: PortableText | null;
  storyMore: PortableText | null;
};

export type Site = {
  _type: 'site';
  _id: string;
  authors: Author[];
  recipes: Recipe[];
};
