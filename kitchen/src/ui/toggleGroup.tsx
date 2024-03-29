'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Ui from '@/ui';

export const Root: React.FC<React.ComponentProps<typeof ToggleGroup.Root>> = ({
  children,
  ...props
}) => {
  return (
    <ToggleGroup.Root className="divide-x-2 divide-secondary" {...props}>
      {children}
    </ToggleGroup.Root>
  );
};

export const Item: React.FC<React.ComponentProps<typeof ToggleGroup.Item>> = ({
  children,
  ...props
}) => {
  return (
    <ToggleGroup.Item
      className="py-1 px-3 h-8 bg-primary-tint text-secondary data-[state=off]:bg-secondary-tint data-[state=off]:text-primary last:rounded-r-full first:rounded-l-full last:pr-4 first:pl-4 data-[state=off]:hover:opacity-60 transition-opacity data-[state=on]:cursor-default"
      {...props}
    >
      <Ui.Text.Label bold>{children}</Ui.Text.Label>
    </ToggleGroup.Item>
  );
};
