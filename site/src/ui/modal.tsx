'use client';

import * as React from 'react';
import * as Navigation from 'next/navigation';
import * as Utils from '@/lib/utils';

type ModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const pathname = Navigation.usePathname();

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* trigger */}
      <button
        className="ModalTrigger"
        type="button"
        aria-label="Open Menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        {trigger}
      </button>
      {/* modal container */}
      <div
        className={Utils.cx([
          'w-full h-full fixed inset-0 z-50',
          {
            visible: isOpen,
            'invisible pointer-events-none': !isOpen,
          },
        ])}
      >
        {/* modal background */}
        <div
          role="button"
          aria-label="Close Menu"
          onClick={() => setIsOpen(false)}
          className={Utils.cx([
            'fixed inset-0 bg-black z-0 transition-opacity',
            {
              'visible opacity-50': isOpen,
              'invisible opacity-0': !isOpen,
            },
          ])}
        ></div>
        {/* modal content */}
        <menu
          className={Utils.cx([
            'absolute bottom-0 w-full md:max-w-lg max-h-[75vh] md:h-fit md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 overflow-auto rounded-t-lg md:rounded-lg bg-background shadow-xl',
            {
              block: isOpen,
              hidden: !isOpen,
            },
          ])}
        >
          {children}
        </menu>
      </div>
    </>
  );
};
