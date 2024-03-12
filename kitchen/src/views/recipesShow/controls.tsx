'use client';

import * as React from 'react';
import * as RecipeContext from '@/lib/recipeContext';
import * as SiteContext from '@/lib/siteContext';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

type RecipeProps = {
  recipe: Types.Recipe;
};

const QUANTITY_MULTIPLIERS = [0.5, 1, 2, 3, 4];

const Controls: React.FC<RecipeProps> = ({ recipe }) => {
  const recipeContext = RecipeContext.useContext();
  const siteContext = SiteContext.useContext();

  const getServingLabel = (servings: number): string => {
    /*
    True for 1, 0.5, etc., implying singular or fractional but not multiple
    */
    const isOneOrLess = servings <= 1;

    if (isOneOrLess && recipe.servingDescription) {
      return Utils.pluralize.singular(recipe.servingDescription);
    }

    if (recipe.servingDescription) {
      return Utils.pluralize.plural(recipe.servingDescription);
    }

    if (isOneOrLess) {
      return 'serving';
    }

    return 'servings';
  };

  const servingString = (multiplier: number): string => {
    const totalServings = recipe.yieldServings * multiplier;
    const servingLabel = getServingLabel(totalServings);
    return `${Utils.toRoundedFraction(totalServings)} ${servingLabel}`;
  };

  return (
    <div className="flex space-x-5">
      <Ui.Select.Root
        name="servings"
        id="servings"
        aria-label="Servings"
        value={recipeContext.state.quantityMultiplier}
        onChange={(e) => {
          recipeContext.setQuantityMultiplier(parseFloat(e.target.value));
        }}
      >
        {QUANTITY_MULTIPLIERS.map((multiplier) => {
          return (
            <Ui.Select.Option key={multiplier} value={multiplier}>
              {servingString(multiplier)}
            </Ui.Select.Option>
          );
        })}
      </Ui.Select.Root>
      <Ui.ToggleGroup.Root
        value={siteContext.state.measurementSystem}
        onValueChange={(newValue: Types.MeasurementSystem | '') => {
          if (newValue !== '') siteContext.setMeasurementSystem(newValue);
        }}
        type="single"
        defaultValue="us"
        aria-label="Measurement System"
      >
        <Ui.ToggleGroup.Item value="us" aria-label="US">
          US
        </Ui.ToggleGroup.Item>
        <Ui.ToggleGroup.Item value="metric" aria-label="Metric">
          Metric
        </Ui.ToggleGroup.Item>
      </Ui.ToggleGroup.Root>
      <Ui.ToggleGroup.Root
        value={siteContext.state.temperatureSystem}
        onValueChange={(newValue: Types.TemperatureSystem | '') => {
          if (newValue !== '') siteContext.setTemperatureSystem(newValue);
        }}
        type="single"
        defaultValue="fahrenheit"
        aria-label="Temperature System"
      >
        <Ui.ToggleGroup.Item value="fahrenheit" aria-label="Fahrenheit">
          °F
        </Ui.ToggleGroup.Item>
        <Ui.ToggleGroup.Item value="celsius" aria-label="Celsius">
          °C
        </Ui.ToggleGroup.Item>
      </Ui.ToggleGroup.Root>
    </div>
  );
};

export default Controls;
