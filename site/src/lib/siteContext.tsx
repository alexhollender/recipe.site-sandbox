'use client';

import * as Types from '@/lib/types';
import * as React from 'react';

type State = {
  measurementSystem: Types.MeasurementSystem;
  temperatureSystem: Types.TemperatureSystem;
};

type GlobalContext = {
  globals: Types.SiteGlobals & {
    unitsByTitle: Types.UnitsByTitle;
  };
  state: State;
  setMeasurementSystem: (units: Types.MeasurementSystem) => void;
  setTemperatureSystem: (units: Types.TemperatureSystem) => void;
};

const GlobalContext = React.createContext<GlobalContext | null>(null);

export function Provider({
  children,
  globals,
}: {
  children: React.ReactNode;
  globals: Types.SiteGlobals;
}) {
  const [state, setState] = React.useState<State>({
    measurementSystem: globals.site.defaultMeasurementSystem || 'imperial',
    temperatureSystem: globals.site.defaultTemperatureSystem || 'fahrenheit',
  });

  const setMeasurementSystem = (measurementSystem: Types.MeasurementSystem) => {
    setState({ ...state, measurementSystem });
  };

  const setTemperatureSystem = (temperatureSystem: Types.TemperatureSystem) => {
    setState({ ...state, temperatureSystem });
  };

  const unitsByTitle = globals.units.reduce((map, unit) => {
    map[unit.title] = unit;
    return map;
  }, {} as Types.UnitsByTitle);

  return (
    <GlobalContext.Provider
      value={{
        globals: {
          ...globals,
          unitsByTitle,
        },
        setMeasurementSystem,
        setTemperatureSystem,
        state,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === null) {
    throw new Error('useContext must be used within a Context');
  }
  return context;
};
