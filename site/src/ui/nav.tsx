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
    <>
      <div className="mb-7">
        <div className="relative border-b border-outline z-50 bg-background SiteHeader">
          <Ui.Container>
            <div className="h-14 flex justify-between items-center text-accent">
              <Link href="/">
                {site.logo ? (
                  <Ui.Media.Image image={site.logo} alt={site.title} className="h-9 w-auto" />
                ) : (
                  <Ui.Text.Title>{site.title}</Ui.Text.Title>
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
      </div>
      <div
        className={Utils.cx([
          'md:hidden absolute top-14 left-0 right-0 bottom-0 z-40',
          {
            visible: isMenuOpen,
            'invisible pointer-events-none': !isMenuOpen,
          },
        ])}
      >
        <nav
          className={Utils.cx([
            'relative bg-background py-3 shadow-xl z-10 transition-transform',
            {
              'transform translate-y-0': isMenuOpen,
              'transform -translate-y-full': !isMenuOpen,
            },
          ])}
        >
          <Ui.Container>
            <ul className="py-2 space-y-6 text-accent">
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
        <div
          role="button"
          aria-label="Close Menu"
          onClick={() => setIsMenuOpen(false)}
          className={Utils.cx([
            'fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-0 transition-opacity',
            {
              'opacity-100': isMenuOpen,
              'opacity-0 pointer-events-none': !isMenuOpen,
            },
          ])}
        ></div>
      </div>
    </>
  );
};
