'use client';

import * as React from 'react';
import * as RecipeContext from '@/lib/recipeContext';
import * as SiteContext from '@/lib/siteContext';
import * as Types from '@/lib/types';
import * as Utils from '@/lib/utils';

type IngredientUsageProps = {
  ingredientUsage: Types.IngredientUsage;
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
    if (!ingredientUsage.quantityMin) return ` ${ingredientUsage.unit.title}`;
    const pluralized = Utils.pluralizeUnit(
      ingredientUsage.unit.title,
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

  return (
    <>
      {quantity && <span>{quantity}</span>}
      {unit && <span>{unit}</span>}
      {preparation && <span>{preparation}</span>}
    </>
  );
};

export default IngredientUsageAmount;

const multiplyIfNotNull = (a: number | null, b: number) => (a !== null ? a * b : null);

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

  if (!ingredientUsage.unit || measurementSystem === 'us')
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
      quantityMin: totalQuantityMin * ingredientUsage.ingredient.gramsPerCup,
      quantityMax: multiplyIfNotNull(totalQuantityMax, ingredientUsage.ingredient.gramsPerCup),

      unit: unitsByTitle['g'],
    };
  }

  if (ingredientUsage.unit.title === 'cup') {
    return {
      ...ingredientUsage,
      quantityMin: totalQuantityMin * 237,
      quantityMax: multiplyIfNotNull(totalQuantityMax, 237),
      unit: unitsByTitle['ml'],
    };
  }

  if (ingredientUsage.unit.title === 'oz') {
    return {
      ...ingredientUsage,
      quantityMin: totalQuantityMin * 28.35,
      quantityMax: multiplyIfNotNull(ingredientUsage.quantityMax, 28.35),
      unit: unitsByTitle['g'],
    };
  }

  if (ingredientUsage.unit.title === 'lb') {
    return {
      ...ingredientUsage,
      quantityMin: totalQuantityMin * 453.592,
      quantityMax: multiplyIfNotNull(ingredientUsage.quantityMax, 453.592),
      unit: unitsByTitle['g'],
    };
  }

  return {
    ...ingredientUsage,
    quantityMin: totalQuantityMin,
    quantityMax: totalQuantityMax,
  };
};
