import * as React from 'react';
import * as SiteContext from '@/lib/siteContext';
import * as Types from '@/lib/types';

const Measurement: React.FC<React.PropsWithChildren<{ unit: Types.Unit; quantity: number }>> = ({
  unit,
  quantity,
}) => {
  const siteContext = SiteContext.useContext();

  /*
  If our unit isn't temperature, we don't currently support conversion.
  If the unit is in Fahrenheit and the site is in Fahrenheit, we don't convert.
  If the unit is in Celsius and the site is in Celsius, we don't convert.
  */
  if (
    (unit.slug !== 'fahrenheit' && unit.slug !== 'celsius') ||
    (unit.slug === 'fahrenheit' && siteContext.state.temperatureSystem === 'fahrenheit') ||
    (unit.slug === 'celsius' && siteContext.state.temperatureSystem === 'celsius')
  ) {
    return (
      <span>
        {quantity}
        {unit.title}
      </span>
    );
  }

  if (unit.slug === 'fahrenheit') {
    const celsius = (quantity - 32) * (5 / 9);
    const roundedCelsius = Math.round(celsius / 5) * 5;

    return (
      <span>
        {roundedCelsius}
        {'°C'}
      </span>
    );
  }

  const fahrenheit = quantity * (9 / 5) + 32;
  const roundedFahrenheit = Math.round(fahrenheit / 5) * 5;

  return (
    <span>
      {roundedFahrenheit}
      {'°F'}
    </span>
  );
};

export default Measurement;
