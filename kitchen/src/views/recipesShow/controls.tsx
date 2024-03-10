'use client';

import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

type RecipeProps = {
  recipe: Types.Recipe;
};

const Controls: React.FC<RecipeProps> = ({ recipe }) => {
  const [servings, setServings] = React.useState('4');
  const [measurementSystem, setMeasurementSystem] = React.useState('us');
  const [temperatureSystem, setTemperatureSystem] = React.useState('fahrenheit');

  return (
    <div className="flex space-x-5">
      <Ui.Select.Root
        name="servings"
        id="servings"
        aria-label="Servings"
        value={servings}
        onChange={(e) => {
          setServings(e.target.value);
        }}
      >
        <Ui.Select.Option value="1">1 serving</Ui.Select.Option>
        <Ui.Select.Option value="2">2 servings</Ui.Select.Option>
        <Ui.Select.Option value="4">4 servings</Ui.Select.Option>
        <Ui.Select.Option value="6">6 servings</Ui.Select.Option>
        <Ui.Select.Option value="8">8 Servings</Ui.Select.Option>
      </Ui.Select.Root>
      <Ui.ToggleGroup.Root
        value={measurementSystem}
        onValueChange={(newValue) => {
          setMeasurementSystem((currentValue) => {
            if (newValue === '') return currentValue;
            return newValue;
          });
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
        value={temperatureSystem}
        onValueChange={(newValue) => {
          setTemperatureSystem((currentValue) => {
            if (newValue === '') return currentValue;
            return newValue;
          });
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
