import * as Utils from '@/lib/utils';

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <div className={Utils.cx(['max-w-[75rem] mx-auto px-4', className])}>{children}</div>;
};

export const SouffléContainer: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className={Utils.cx(['max-w-[120rem] mx-auto souffle-container', className])}>
      {children}
    </div>
  );
};

export const Grid: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="grid gap-x-7 gap-y-10 grid-cols-12">{children}</div>;
};

export * as Cards from '@/ui/cards';
export * as Chips from '@/ui/chips';
export * as Icons from '@/ui/icons';
export * as Media from '@/ui/media';
export * as Nav from '@/ui/nav';
export * as Richtext from '@/ui/richtext';
export * as Select from '@/ui/select';
export * as Slider from '@/ui/slider';
export * as Text from '@/ui/text';
export * as ToggleGroup from '@/ui/toggleGroup';

export { default as IngredientUsageAmount } from '@/ui/ingredientUsageAmount';
export { default as SocialMediaLink } from '@/ui/socialMediaLink';
