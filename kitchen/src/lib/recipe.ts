import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

const getTotalMinutes = (recipe: Types.RecipePreview): number => {
  if (recipe.totalTimeMinutes) return recipe.totalTimeMinutes;
  return recipe.cookTimeMinutes + recipe.prepTimeMinutes;
};

export const totalTimeFormatted = (recipe: Types.RecipePreview): string => {
  const totalMinutes = getTotalMinutes(recipe);

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  let result = '';

  if (days > 0) {
    result += `${days} ${Utils.pluralize('day', days)}`;
  }

  if (hours > 0) {
    if (result) result += ', ';
    result += `${hours} ${Utils.pluralize('hr', hours)}`;
  }

  if (minutes > 0) {
    if (result) result += ', ';
    result += `${minutes} ${Utils.pluralize('min', minutes)}`;
  }

  return result;
};
