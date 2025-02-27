export type SanityArrayItem<TObject> = { _key: string } & TObject;

export type PageProps<TProps = {}> = {
  globals: SiteGlobals;
  site: Site;
} & TProps;

export type PortableText = {
  _type: 'block' | string;
  _key?: string;
}[];

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
    mimeType: string;
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
  title: string;
  slug: string;
  createdAt: string; // Date
  categories: RecipeCategory[];
  cuisines: Cuisine[];
  tags: Tag[];
  description: PortableText | null;
  descriptionPlaintext: string | null;
  featuredMedia: Media;
  difficultyLevel: 'easy' | 'medium' | 'hard' | null;
  ingredientUsageCount: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number | null;
  collections: CollectionPreview[];
};

export type LegacyRecipeData = {
  featuredImage: {
    src: string;
    width: number;
    height: number;
  };
  content: string;
} | null;

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
  legacyRecipeData: LegacyRecipeData;
};

export type SocialMediaLink = {
  _key: string;
  platform:
    | 'discord'
    | 'email'
    | 'instagram'
    | 'pinterest'
    | 'substack'
    | 'tiktok'
    | 'x'
    | 'youtube';
  url: string;
};

export type ProductLink = {
  _key: string;
  productTitle: PortableText;
  productTitlePlaintext: string;
  productImage: Image;
  href: string;
};

export type CustomHeaderLink = {
  label: string;
  href: string;
  openInNewTab: boolean;
  _key: string;
};

export type LinkListLink = {
  title: string;
  links: {
    label: string;
    href: string;
    _key: string;
  }[];
};

export type HexColor = string;

export type Color = {
  _type: 'color';
  hex: HexColor;
};

export type ColorTheme = {
  _id: string;
  _type: 'colorTheme';
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

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type FontFamily =
  // Display
  | 'ivypresto-display'
  | 'moret'
  | 'itc-clearface'
  | 'itc-garamond-condensed'
  | 'family'
  | 'graphik'
  | 'roboto-mono'
  | 'minerva'
  // Narrative
  | 'ivypresto-text'
  | 'calluna'
  // Interface
  | 'franklin-gothic'
  | 'helvetica'
  | 'inter'
  | 'arimo';

export type Font = {
  family: FontFamily;
  weights: {
    normal: FontWeight;
    bold: FontWeight;
  };
};

export type TypeTheme = {
  _type: 'typeTheme';
  displayFont: Font;
  interfaceFont: Font;
  narrativeFont: Font;
};

export type Site = {
  _type: 'site';
  _id: string;
  title: string;
  slug: string;
  authors: Author[];
  socialMediaLinks: SocialMediaLink[];
  customHeaderLinks: null | CustomHeaderLink[];
  defaultMeasurementSystem: MeasurementSystem;
  defaultTemperatureSystem: TemperatureSystem;
  googleAnalyticsId: string;
  featuredRecipes: Recipe[];
  collections: Collection[];
  recipes: Recipe[];
  productLinks: SanityArrayItem<ProductLink>[];
  linkList: null | LinkListLink;
  aboutShort: PortableText;
  aboutShortPlaintext: string;
  aboutHeading: PortableText | null;
  about: PortableText;
  featuredImage: Image;
  logo: Image | null;
  favicon: Image | null;
  colorTheme: ColorTheme | null;
  typeTheme: TypeTheme | null;
  cssOverrides: string | null;
  hideSidebarBio: boolean;
};

export type MeasurementSystem = 'imperial' | 'metric';
export type TemperatureSystem = 'celsius' | 'fahrenheit';

export type CollectionPreview = {
  _type: 'collection';
  _id: string;
  title: string;
  slug: string;
  description: PortableText;
  descriptionPlaintext: string | null;
  featuredMedia: Media;
  color: string;
};

export type Collection = CollectionPreview & {
  recipes: RecipePreview[];
};

export type SiteGlobals = {
  site: Site;
  categories: RecipeCategory[];
  cuisines: Cuisine[];
  tags: Tag[];
  units: Unit[];
};
