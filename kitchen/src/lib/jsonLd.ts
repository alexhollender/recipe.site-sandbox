import * as PortableText from '@portabletext/react';
import * as Site from '@/lib/site';
import * as Types from '@/lib/types';
import * as Sanity from '@/lib/sanity';
import * as Utils from '@/lib/utils';

export const createRecipeSchema = (site: Types.Site, recipe: Types.Recipe) => {
  const author = Site.primaryAuthor(site);
  /*
  https://schema.org/Recipe
  */
  return {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.title,
    image: recipe.featuredMedia.image
      ? Sanity.ImageBuilder.image(recipe.featuredMedia.image).url()
      : undefined,
    thumbnail: recipe.featuredMedia.image
      ? Sanity.ImageBuilder.image(recipe.featuredMedia.image).url()
      : undefined,
    author: {
      '@type': 'Person',
      name: author.name,
    },
    datePublished: recipe.createdAt,
    description: recipe.description || null,
    prepTime: `PT${recipe.prepTimeMinutes}M`,
    cookTime: `PT${recipe.cookTimeMinutes}M`,
    totalTime: `PT${recipe.prepTimeMinutes + recipe.cookTimeMinutes}M`,
    keywords: recipe.keywords || null,
    recipeYield: recipe.yieldServings,
    recipeCategory: recipe.categories.map((category) => category.title),
    recipeCuisine: recipe.cuisines.map((cuisine) => cuisine.title),
    recipeIngredient: recipe.ingredientUsageGroups
      ? generateIngredientArray(recipe.ingredientUsageGroups)
      : null,
    recipeInstructions: recipe.instructionGroups
      ? generateInstructionsArray(recipe.instructionGroups)
      : undefined,
  };
};

// generate array of ingredients
const generateIngredientArray = (ingredientUsageGroups: Types.IngredientUsageGroup[]) => {
  return ingredientUsageGroups.flatMap((ingredientUsageGroup) => {
    return ingredientUsageGroup.ingredientUsages.map((ingredientUsage) => {
      const {
        quantityMin,
        quantityMax,
        unit,
        ingredientTitleOverride,
        ingredient,
        preparation,
        preperationModifier,
      } = ingredientUsage;

      // Create an array of the individual parts of the ingredient
      const parts = [
        quantityMin,
        quantityMax && `-${quantityMax}`,
        unit && Utils.pluralizeUnit(unit.title, quantityMin || 0, quantityMax),
        ingredientTitleOverride || ingredient.title,
        preparation && preparation.pastTense,
        preperationModifier,
      ];

      /*
      Filter out null or undefined parts and join them with spaces
      */
      return parts.filter((part) => part != null).join(' ');
    });
  });
};

/*
https://schema.org/HowToSection
*/
type HowToSection = {
  '@type': 'HowToSection';
  name: string;
  position: string;
  itemListElement: {
    '@type': 'HowToStep';
    position: string;
    text: string;
  }[];
};

/*
Generate instructions as HowToSections with HowToSteps
*/
const generateInstructionsArray = (instructionGroups: Types.InstructionGroup[]): HowToSection[] => {
  return instructionGroups.map((instructionGroup, sectionIndex) => {
    return {
      '@type': 'HowToSection',
      name:
        instructionGroup.title || (sectionIndex === 1 && 'Main') || `Section ${sectionIndex + 1}`,
      position: `${sectionIndex + 1}`,
      itemListElement: instructionGroup.instructions.map((instruction, instructionIndex) => {
        return {
          '@type': 'HowToStep',
          position: `${instructionIndex + 1}`,
          text: PortableText.toPlainText(instruction.content),
        };
      }),
    };
  });
};
