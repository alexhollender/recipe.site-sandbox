import * as Utils from '@/lib/utils';

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <div className={Utils.cx(['max-w-[1200px] mx-auto px-2', className])}>{children}</div>;
};

export const Grid: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="grid gap-4 grid-cols-12">{children}</div>;
};

export * as Icons from '@/ui/icons';
export * as Media from '@/ui/media';
export * as Richtext from '@/ui/richtext';
export * as Select from '@/ui/select';
export * as Text from '@/ui/text';
export * as ToggleGroup from '@/ui/toggleGroup';
