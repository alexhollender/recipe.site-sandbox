import * as React from 'react';
export { default as pluralize } from 'pluralize';

// export * from '@shared/utils';

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

import * as Types from '@/lib/types';

export const formatSeconds = (totalSeconds: number): string => {
  let formattedSeconds = new Date(totalSeconds * 1000).toISOString();
  if (totalSeconds < 540) {
    return formattedSeconds.substring(15, 19);
  } else if (totalSeconds < 3600) {
    return formattedSeconds.substring(14, 19);
  } else {
    return formattedSeconds.substring(12, 19);
  }
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

// Returns the pluralized version of the unit
export const pluralizeUnit = (unit: Types.Unit, min: number, max: number | null): string => {
  if ((min > 1 || (max !== null && max > 1)) && unit.pluralTitle !== null) {
    return unit.pluralTitle;
  }
  return unit.title;
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
  // using `\u00A0` instead of a space, because in Graphik font it was rendering a kind of ghost " instead of a space
  return `${Math.floor(number)}\u00A0${fractionSymbol || ''}`;
};

type WakeLockSentinel = {
  release: () => Promise<void>;
  addEventListener: (type: 'release', listener: () => void) => void;
};

export const useWakeLock = (): void => {
  const wakeLockRef = React.useRef<WakeLockSentinel | null>(null);

  const release = () => {
    if (wakeLockRef.current !== null) {
      wakeLockRef.current
        .release()
        .then(() => {
          wakeLockRef.current = null;
          console.log('Wake lock released');
        })
        .catch((err) => {
          console.error(`Failed to release wake lock: ${(err as Error).message}`);
        });
    }
  };

  const handleReFocus = async () => {
    if (document.visibilityState === 'visible') {
      try {
        const lock = await navigator.wakeLock.request('screen');
        wakeLockRef.current = lock;
        console.log('Handle refocus');
      } catch (err) {
        console.error(`Failed to re-request wake lock: ${(err as Error).message}`);
      }
    }
  };

  React.useEffect(() => {
    if ('wakeLock' in navigator) {
      const requestWakeLock = async () => {
        try {
          const lock = await navigator.wakeLock.request('screen');
          wakeLockRef.current = lock;

          console.log('Wake lock on');
        } catch (err) {
          console.error(`Failed to request wake lock: ${(err as Error).message}`);
        }
      };

      requestWakeLock();

      document.addEventListener('visibilitychange', handleReFocus);

      return () => {
        if (wakeLockRef.current) {
          release();
        }

        document.removeEventListener('visibilitychange', handleReFocus);
      };
    }
  }, []);
};
