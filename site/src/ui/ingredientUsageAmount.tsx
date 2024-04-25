'use client';

import * as React from 'react';
import * as RecipeContext from '@/lib/recipeContext';
import * as SiteContext from '@/lib/siteContext';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type IngredientUsageProps = {
  ingredientUsage: Types.IngredientUsage;
  onRender: (formatted: {
    quantity: string | null;
    unit: string | null;
    preparation: string | null;
  }) => React.ReactNode;
};

const IngredientUsageAmount: React.FC<IngredientUsageProps> = (props) => {
  const siteContext = SiteContext.useContext();
  const recipeContext = RecipeContext.useContext();

  const ingredientUsage = convertIngredientUsage({
    ingredientUsage: props.ingredientUsage,
    quantityMultiplier: recipeContext.state.quantityMultiplier,
    measurementSystem: siteContext.state.measurementSystem,
    unitsByTitle: siteContext.globals.unitsByTitle,
  });

  const getQuantity = () => {
    if (!ingredientUsage.quantityMin) return null;
    if (ingredientUsage.quantityMax)
      return `${Utils.toRoundedFraction(ingredientUsage.quantityMin)} - ${Utils.toRoundedFraction(ingredientUsage.quantityMax)}`;
    return Utils.toRoundedFraction(ingredientUsage.quantityMin);
  };

  const quantity = getQuantity();

  const getUnit = () => {
    if (!ingredientUsage.unit) return null;
    if (!ingredientUsage.quantityMin) return `${ingredientUsage.unit.title}`;
    const pluralized = Utils.pluralizeUnit(
      ingredientUsage.unit,
      ingredientUsage.quantityMin,
      ingredientUsage.quantityMax,
    );
    return ` ${pluralized}`;
  };

  const unit = getUnit();

  const getPreparation = () => {
    if (!ingredientUsage.preparation) return null;
    const optionalComma = quantity ? ', ' : '';

    if (ingredientUsage.preperationModifier)
      return `${optionalComma}${ingredientUsage.preparation.pastTense} ${ingredientUsage.preperationModifier}`;

    return `${optionalComma}${ingredientUsage.preparation.pastTense}`;
  };

  const preparation = getPreparation();

  if (!quantity && !unit && !preparation) return null;

  console.log(quantity, unit, preparation);

  return props.onRender({
    quantity,
    unit,
    preparation,
  });
};

export default IngredientUsageAmount;

const multiplyAndRoundIfNotNull = (a: number | null, b: number) =>
  a !== null ? roundAboveThreshold(a * b) : null;

const DEFAULT_ROUNDING_THRESHOLD = 25;
const roundAboveThreshold = (number: number, threshold: number = DEFAULT_ROUNDING_THRESHOLD) => {
  if (number > threshold) {
    return Math.round(number);
  }
  return number;
};

export const convertIngredientUsage = ({
  ingredientUsage,
  quantityMultiplier,
  measurementSystem,
  unitsByTitle: unitsByTitle,
}: {
  ingredientUsage: Types.IngredientUsage;
  quantityMultiplier: number;
  measurementSystem: Types.MeasurementSystem;
  unitsByTitle: Types.UnitsByTitle;
}): Types.IngredientUsage => {
  if (!ingredientUsage.quantityMin) return ingredientUsage;

  const totalQuantityMin = ingredientUsage.quantityMin * quantityMultiplier;
  const totalQuantityMax = ingredientUsage.quantityMax
    ? ingredientUsage.quantityMax * quantityMultiplier
    : null;

  if (!ingredientUsage.unit || measurementSystem === 'imperial')
    return {
      ...ingredientUsage,
      quantityMin: totalQuantityMin,
      quantityMax: totalQuantityMax,
    };

  if (
    ingredientUsage.unit.title === 'cup' &&
    ingredientUsage.ingredient.ingredientType === 'solid'
  ) {
    return {
      ...ingredientUsage,
      quantityMin: roundAboveThreshold(totalQuantityMin * ingredientUsage.ingredient.gramsPerCup),
      quantityMax: multiplyAndRoundIfNotNull(
        totalQuantityMax,
        ingredientUsage.ingredient.gramsPerCup,
      ),

      unit: unitsByTitle['g'],
    };
  }

  if (ingredientUsage.unit.title === 'cup') {
    return {
      ...ingredientUsage,
      quantityMin: roundAboveThreshold(totalQuantityMin * 237),
      quantityMax: multiplyAndRoundIfNotNull(totalQuantityMax, 237),
      unit: unitsByTitle['ml'],
    };
  }

  if (ingredientUsage.unit.title === 'oz') {
    return {
      ...ingredientUsage,
      quantityMin: roundAboveThreshold(totalQuantityMin * 28.35),
      quantityMax: multiplyAndRoundIfNotNull(ingredientUsage.quantityMax, 28.35),
      unit: unitsByTitle['g'],
    };
  }

  if (ingredientUsage.unit.title === 'lb') {
    return {
      ...ingredientUsage,
      quantityMin: roundAboveThreshold(totalQuantityMin * 453.592),
      quantityMax: multiplyAndRoundIfNotNull(ingredientUsage.quantityMax, 453.592),
      unit: unitsByTitle['g'],
    };
  }

  return {
    ...ingredientUsage,
    quantityMin: totalQuantityMin,
    quantityMax: totalQuantityMax,
  };
};
