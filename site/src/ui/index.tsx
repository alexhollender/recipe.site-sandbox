import * as Utils from '@/lib/utils';

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className={Utils.cx(['max-w-[75rem] mx-auto px-4 md:px-6', className])}>{children}</div>
  );
};

export const Grid: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="grid gap-x-2 md:gap-x-10 gap-y-10 grid-cols-12">{children}</div>;
};

export * as Cards from '@/ui/cards';
export * as Chips from '@/ui/chips';
export * as Icons from '@/ui/icons';
export * as Media from '@/ui/media';
export * as Modal from '@/ui/modal';
export * as Nav from '@/ui/nav';
export * as Popover from '@/ui/popover';
export * as Richtext from '@/ui/richtext';
export * as Select from '@/ui/select';
export * as ShareMenu from '@/ui/shareMenu';
export * as Slider from '@/ui/slider';
export * as Text from '@/ui/text';
export * as ToggleGroup from '@/ui/toggleGroup';

export { default as Measurement } from '@/ui/measurement';
export { default as IngredientUsageAmount } from '@/ui/ingredientUsageAmount';
export { default as SocialMediaLinks } from '@/ui/socialMedia';
