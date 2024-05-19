import * as Types from '@/lib/types';

export const getCurrent = (recipeDocument: Types.RecipeDocument) => {
  if (recipeDocument.draft) return recipeDocument.draft;
  return recipeDocument.published;
};

export const publishedId = (recipe: Types.Recipe) => {
  return recipe._id.replace('drafts.', '');
};

export const draftStatus = (recipeDocument: Types.RecipeDocument): Types.RecipeDraftStatus => {
  if (recipeDocument.published === null) return 'unpublished';
  if (recipeDocument.published !== null && recipeDocument.draft !== null)
    return 'published_with_draft';
  return 'published_only';
};
