'use client';

import * as Navigation from 'next/navigation';
import * as React from 'react';
import * as Site from '@/lib/site';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

import Link from 'next/link';

type MainNavProps = {
  site: Types.Site;
};

export const Main: React.FC<MainNavProps> = ({ site }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = Navigation.usePathname();

  const primaryAuthor = Site.primaryAuthor(site);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="relative mb-7">
      <div className="border-b py-3">
        <Ui.Container>
          <div className="flex justify-between items-center">
            <Link href="/">
              {site.logo ? (
                <Ui.Media.Image image={site.logo} alt={site.title} className="h-9 w-auto" />
              ) : (
                <Ui.Text.Title>{primaryAuthor.name}</Ui.Text.Title>
              )}
            </Link>

            <nav className="hidden md:block">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/recipes" className="hover:opacity-60 transition-opacity">
                    <Ui.Text.Label>All Recipes</Ui.Text.Label>
                  </Link>
                </li>
                {site.linkList && (
                  <li>
                    <Link href="/links" className="hover:opacity-60 transition-opacity">
                      <Ui.Text.Label>My links</Ui.Text.Label>
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/about" className="hover:opacity-60 transition-opacity">
                    <Ui.Text.Label>About</Ui.Text.Label>
                  </Link>
                </li>
              </ul>
            </nav>
            <button
              className="md:hidden"
              type="button"
              aria-label="Open Menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <div className="w-5 h-5">
                <Ui.Icons.Openface />
              </div>
            </button>
          </div>
        </Ui.Container>
      </div>
      <div className="md:hidden absolute left-0 right-0 z-50 ">
        <nav
          className={Utils.cx([
            'transition-opacity bg-secondary py-3 shadow-lg',
            {
              'opacity-0': !isMenuOpen,
              'opacity-100': isMenuOpen,
            },
          ])}
        >
          <Ui.Container>
            <ul className="space-y-4">
              <li>
                <Link href="/recipes" className="hover:opacity-60 transition-opacity">
                  <Ui.Text.Label>All Recipes</Ui.Text.Label>
                </Link>
              </li>
              {site.linkList && (
                <li>
                  <Link href="/links" className="hover:opacity-60 transition-opacity">
                    <Ui.Text.Label>My links</Ui.Text.Label>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/about" className="hover:opacity-60 transition-opacity">
                  <Ui.Text.Label>About</Ui.Text.Label>
                </Link>
              </li>
            </ul>
          </Ui.Container>
        </nav>
      </div>
    </div>
  );
};
