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
      S.listItem().title('Diets').icon(Icons.Diet).child(S.documentTypeList('diet')),
      S.listItem().title('Cuisines').icon(Icons.Cuisine).child(S.documentTypeList('cuisine')),
      S.listItem().title('Meals').icon(Icons.Meal).child(S.documentTypeList('meal')),
      S.listItem().title('Methods').icon(Icons.Method).child(S.documentTypeList('method')),
      S.listItem()
        .title('Ingredients')
        .icon(Icons.Ingredient)
        .child(S.documentTypeList('ingredient')),
      S.listItem().title('Equipment').icon(Icons.Equipment).child(S.documentTypeList('equipment')),
      S.listItem().title('Units').icon(Icons.Unit).child(S.documentTypeList('unit')),
      S.listItem()
        .title('Preparations')
        .icon(Icons.Preparation)
        .child(S.documentTypeList('preparation')),
      S.listItem().title('Tags').icon(Icons.Tag).child(S.documentTypeList('tag')),
      S.listItem()
        .title('Color Themes')
        .icon(Icons.ColorTheme)
        .child(S.documentTypeList('colorTheme')),
      S.listItem()
        .title('Type Themes')
        .icon(Icons.TypeTheme)
        .child(S.documentTypeList('typeTheme')),
    ]);
};

export default structure;
