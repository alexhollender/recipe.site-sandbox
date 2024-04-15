import * as React from 'react';
import * as Utils from '@/lib/utils';

import Link from 'next/link';

type NavItemProps = React.PropsWithChildren<{
  href: string;
  isActive: boolean;
}>;
const NavItem: React.FC<NavItemProps> = (props) => {
  return (
    <li>
      <Link href={props.href}>
        <div
          className={Utils.cx([
            'border-b-2 pb-4 pt-4 hover:text-text cursor-pointer transition-colors',
            {
              'text-text border-b-text': props.isActive,
              'text-emphasis border-b-transparent hover:border-b-outline': !props.isActive,
            },
          ])}
        >
          {props.children}
        </div>
      </Link>
    </li>
  );
};

type HeaderProps = {
  pathname?: string;
};
export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="sticky top-0 border-b border-outline mb-4 bg-background">
      <Container>
        <nav>
          <ul className="flex space-x-7">
            <NavItem href="/" isActive={props.pathname === '/'}>
              Overview
            </NavItem>
            <NavItem href="/recipes" isActive={props.pathname === '/recipes'}>
              Recipes
            </NavItem>
            <NavItem href="/theme" isActive={props.pathname === '/theme'}>
              Theme
            </NavItem>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

type LayoutProps = React.PropsWithChildren<{
  pathname?: string;
}>;
export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Header pathname={props.pathname} />
      {props.children}
    </>
  );
};

export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <div className={Utils.cx(['max-w-[75rem] mx-auto px-4', className])}>{children}</div>;
};
