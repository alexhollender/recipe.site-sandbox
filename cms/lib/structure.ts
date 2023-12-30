import type { StructureResolver } from 'sanity/desk';

import * as Icons from './icons';

const structure: StructureResolver = (S, _context) => {
  return S.list()
    .title('Table of Contents')
    .items([
      S.listItem().title('Sites').icon(Icons.Site).child(S.documentTypeList('site')),
      S.listItem().title('Authors').icon(Icons.Author).child(S.documentTypeList('author')),
      S.listItem().title('Recipes').icon(Icons.Recipe).child(S.documentTypeList('recipe')),
      S.listItem()
        .title('Categories')
        .icon(Icons.RecipeCategory)
        .child(S.documentTypeList('recipeCategory')),
      S.listItem().title('Cuisines').icon(Icons.Cuisine).child(S.documentTypeList('cuisine')),
      S.listItem()
        .title('Ingredients')
        .icon(Icons.Ingredient)
        .child(S.documentTypeList('ingredient')),
      S.listItem().title('Equipment').icon(Icons.Equipment).child(S.documentTypeList('equipment')),
      S.listItem()
        .title('Ingredient Units')
        .icon(Icons.IngredientUnit)
        .child(S.documentTypeList('ingredientUnit')),
      S.listItem()
        .title('Yield Units')
        .icon(Icons.YieldUnit)
        .child(S.documentTypeList('yieldUnit')),
      S.listItem()
        .title('Preparations')
        .icon(Icons.Preparation)
        .child(S.documentTypeList('preparation')),
    ]);
};

export default structure;
