'use client';

import * as Ui from '@/ui';

type RootProps = {
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;
export const Root: React.FC<RootProps> = ({ children, ...props }) => {
  return (
    <select
      {...props}
      className="py-1 px-5 bg-secondary-tint text-primary rounded-full font-interface text-base font-bold"
    >
      {children}
    </select>
  );
};

type OptionProps = {
  children: React.ReactNode;
} & React.OptionHTMLAttributes<HTMLOptionElement>;
export const Option: React.FC<OptionProps> = ({ children, ...props }) => {
  return <option {...props}>{children}</option>;
};
