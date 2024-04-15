'use client';

import * as React from 'react';
import * as Types from '@/lib/types';

type State = {
  recipe: Types.Recipe;
};

type RecipeContext = ReturnType<typeof _useRecipeContext>;

export const RecipeContext = React.createContext<RecipeContext | null>(null);

const _useRecipeContext = ({ recipe }: { recipe: Types.Recipe }) => {
  const [state, setState] = React.useState<State>({
    recipe,
  });

  return {
    state,
  };
};

export const Provider = ({
  children,
  recipe,
}: {
  children: React.ReactNode;
  recipe: Types.Recipe;
}) => {
  const recipeContext = _useRecipeContext({ recipe });
  return <RecipeContext.Provider value={recipeContext}>{children}</RecipeContext.Provider>;
};

export const useRecipeContext = () => {
  const context = React.useContext(RecipeContext);
  if (context === null) {
    throw new Error('useRecipeContext must be used within a PrivateChef.RecipeContext');
  }
  return context;
};
