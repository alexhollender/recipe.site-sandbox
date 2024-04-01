export { default as pluralize } from 'pluralize';

const addClass = (base: string, newClass: string) => {
  if (!newClass) return base;
  if (base === '') return newClass;
  return `${base} ${newClass}`;
};

type Classes =
  | Array<string | Record<string, boolean> | null | undefined>
  | string
  | Record<string, boolean>
  | null
  | undefined;
export const cx = (classes: Classes) => {
  const arrayified = Array.isArray(classes) ? classes : [classes];
  return arrayified.reduce((toApply: string, newClass) => {
    if (!newClass) return toApply;
    if (typeof newClass === 'string') return addClass(toApply, newClass);

    return Object.keys(newClass).reduce((conditionals, className) => {
      if (!!newClass[className]) return addClass(conditionals, className);
      return conditionals;
    }, toApply);
  }, '');
};

export const formatMinutes = (totalMinutes: number): string => {
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  let result = '';

  if (days > 0) {
    result += `${days} day${days > 1 ? 's' : ''}`;
  }

  if (hours > 0) {
    if (result) result += ', '; // Separate days and hours with a comma
    result += `${hours} hr${hours > 1 ? 's' : ''}`;
  }

  if (minutes > 0) {
    if (result) result += ', '; // Separate hours and minutes with a comma
    result += `${minutes} min${minutes > 1 ? 's' : ''}`;
  }

  return result;
};

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

const unitMap: Record<string, string> = {
  cup: 'cups',
  piece: 'pieces',
  serving: 'servings',
  block: 'blocks',
  fillet: 'fillets',
  clove: 'cloves',
  bunch: 'bunches',
  handful: 'handfuls',
  knob: 'knobs',
};

// Returns the pluralized version of the unit
export const pluralizeUnit = (unit: string, min: number, max: number | null): string => {
  // Check if the unit exists in the unitMap and the quantity is greater than one
  if (unitMap[unit] && (min > 1 || (max !== null && max > 1))) {
    // Return the pluralized form of the unit
    return unitMap[unit];
  }

  // If the unit is not in the unitMap or the quantity is not greater than one,
  // return the original unit
  return unit;
};

const fractionMap: Record<number, string | null> = {
  0.0: null,
  0.2: '⅕',
  0.125: '⅛',
  0.25: '¼',
  0.3: '⅓',
  0.4: '⅖',
  0.5: '½',
  0.6: '⅔',
  0.75: '¾',
  0.8: '⅘',
};

// Rounds the number to a given fraction, then converts to fraction symbol
export const toRoundedFraction = (number: number): string => {
  // Check if the number is a whole number
  if (number % 1 === 0) {
    return number.toString();
  }

  // Directly round to the nearest fraction in the fractionMap
  const roundedFraction = Object.keys(fractionMap).reduce((prev: string, curr: string) =>
    Math.abs(parseFloat(curr) - (number % 1)) < Math.abs(parseFloat(prev) - (number % 1))
      ? curr
      : prev,
  );

  // Convert roundedFraction to a number
  const roundedNumber = Math.floor(number) + parseFloat(roundedFraction);

  // If the whole part of the number is 0, return only the fraction symbol
  if (Math.floor(number) === 0) {
    return fractionMap[parseFloat(roundedFraction)] || '';
  }

  // If the rounded fraction part is 0 (and maps to null), return just the whole part
  if (parseFloat(roundedFraction) === 0.0) {
    return roundedNumber.toString();
  }

  // Get the fraction symbol from the fractionMap
  const fractionSymbol = fractionMap[parseFloat(roundedFraction)];

  // Return the combined string of the whole part and the fraction symbol
  return `${Math.floor(number)} ${fractionSymbol || ''}`;
};
