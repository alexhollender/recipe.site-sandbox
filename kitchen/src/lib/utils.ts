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
