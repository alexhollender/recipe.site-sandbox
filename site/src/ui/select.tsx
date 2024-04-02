'use client';

import * as Ui from '@/ui';

type RootProps = {
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;
export const Root: React.FC<RootProps> = ({ children, ...props }) => {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0 bottom-0 flex items-center z-10 pr-4">
        <div className="w-[10px] h-[10px]">
          <Ui.Icons.DownCarrot />
        </div>
      </div>
      <select
        {...props}
        className="py-1 pl-5 pr-8 bg-panel text-text rounded-full font-interface text-base font-bold h-8 cursor-pointer hover:opacity-60 transition-opacity appearance-none"
      >
        {children}
      </select>
    </div>
  );
};

type OptionProps = {
  children: React.ReactNode;
} & React.OptionHTMLAttributes<HTMLOptionElement>;
export const Option: React.FC<OptionProps> = ({ children, ...props }) => {
  return <option {...props}>{children}</option>;
};
