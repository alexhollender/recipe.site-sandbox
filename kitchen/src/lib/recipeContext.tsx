'use client';

import * as React from 'react';
import * as Types from '@/lib/types';

type State = {
  quantityMultiplier: number;
  selectedInstructionKey: string | null;
  selectedIngredientUsageIds: string[];
};

type RecipeContext = {
  recipe: Types.Recipe;
  state: State;
  setQuantityMultiplier: (quantityMultiplier: number) => void;
  setSelectedInstruction: (instructionKey: string) => void;
  selectIngredientUsage: (ingredientUsage: Types.IngredientUsage) => void;
  unselectIngredientUsage: (ingredientUsage: Types.IngredientUsage) => void;
};

export const RecipeContext = React.createContext<RecipeContext | null>(null);

export const Provider = ({
  children,
  recipe,
}: {
  children: React.ReactNode;
  recipe: Types.Recipe;
}) => {
  const [state, setState] = React.useState<State>({
    quantityMultiplier: 1,
    selectedInstructionKey: recipe.instructionGroups?.[0]?.instructions[0]._key || null,
    selectedIngredientUsageIds: [],
  });

  const setQuantityMultiplier = (quantityMultiplier: number) => {
    setState({ ...state, quantityMultiplier });
  };

  const setSelectedInstruction = (instructionKey: string) => {
    setState({ ...state, selectedInstructionKey: instructionKey });
  };

  const selectIngredientUsage = (ingredientUsage: Types.IngredientUsage) => {
    setState({
      ...state,
      selectedIngredientUsageIds: [...state.selectedIngredientUsageIds, ingredientUsage._id],
    });
  };

  const unselectIngredientUsage = (ingredientUsage: Types.IngredientUsage) => {
    setState({
      ...state,
      selectedIngredientUsageIds: state.selectedIngredientUsageIds.filter((id) => {
        return ingredientUsage._id !== id;
      }),
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        state,
        setQuantityMultiplier,
        setSelectedInstruction,
        selectIngredientUsage,
        unselectIngredientUsage,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useContext = () => {
  const context = React.useContext(RecipeContext);
  if (context === null) {
    throw new Error('useContext must be used within a RecipeContext');
  }
  return context;
};
