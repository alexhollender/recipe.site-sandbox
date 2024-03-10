import * as UiMedia from '@/ui/media';
import * as UiRichtext from '@/ui/richtext';
import * as UiSelect from '@/ui/select';
import * as UiText from '@/ui/text';
import * as UiToggleGroup from '@/ui/toggleGroup';

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

export const Media = UiMedia;
export const Richtext = UiRichtext;
export const Select = UiSelect;
export const Text = UiText;
export const ToggleGroup = UiToggleGroup;
