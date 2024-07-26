'use client';

import * as React from 'react';
import * as Navigation from 'next/navigation';
import * as Utils from '@/lib/utils';

type PopoverProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position: 'left' | 'right';
};

export const Popover: React.FC<PopoverProps> = ({ trigger, position, children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const pathname = Navigation.usePathname();
  const positionClass = `-${position}-2`;

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      {/* trigger */}
      <button
        className="PopoverTrigger"
        type="button"
        aria-label="Open Menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        {trigger}
      </button>
      {/* modal container */}
      <div
        className={Utils.cx([
          `absolute z-50`,
          positionClass,
          {
            visible: isOpen,
            'invisible pointer-events-none': !isOpen,
          },
        ])}
      >
        {/* popover background */}
        <div
          role="button"
          aria-label="Close Menu"
          onClick={() => setIsOpen(false)}
          className={Utils.cx([
            'fixed inset-0 bg-transparent z-0 transition-opacity',
            {
              block: isOpen,
              hidden: !isOpen,
            },
          ])}
        ></div>
        {/* popover content */}
        <menu
          className={Utils.cx([
            `relative z-10 rounded-lg bg-background shadow-xl border border-panel`,
            {
              block: isOpen,
              hidden: !isOpen,
            },
          ])}
        >
          {children}
        </menu>
      </div>
    </div>
  );
};
