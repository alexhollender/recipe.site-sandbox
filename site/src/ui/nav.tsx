'use client';

import * as Navigation from 'next/navigation';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

import Link from 'next/link';

type MainNavProps = {
  site: Types.Site;
};

export const Main: React.FC<{ site: Types.Site }> = ({ site }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = Navigation.usePathname();

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="mb-7 SiteHeaderWrapper">
        <div className="relative border-b border-outline z-50 bg-background SiteHeader">
          <Ui.Container>
            <div className="min-h-14 flex justify-between items-center text-accent SiteHeaderInner">
              <Link href="/">
                {site.logo ? (
                  <Ui.Media.Image
                    image={site.logo}
                    alt={site.title}
                    placeholder="empty"
                    className="h-9 w-auto"
                  />
                ) : (
                  <Ui.Text.Title>{site.title}</Ui.Text.Title>
                )}
              </Link>

              {/* legacy support for Jerumai's site (social media links instead of menu) */}
              {site.slug !== 'jerumai' ? (
                <>
                  <nav className="hidden md:block">
                    <ul className="flex space-x-4">
                      <MenuItems site={site} />
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
                </>
              ) : (
                <SocialMediaLinks site={site} />
              )}
            </div>
          </Ui.Container>
        </div>
        {/* Dropdown menu (mobile only) */}
        <div
          className={Utils.cx([
            'md:hidden absolute left-0 right-0 z-40',
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
                <MenuItems site={site} />
              </ul>
            </Ui.Container>
          </nav>
          <div
            role="button"
            aria-label="Close Menu"
            onClick={() => setIsMenuOpen(false)}
            className={Utils.cx([
              'h-screen fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-0 transition-opacity',
              {
                'opacity-100': isMenuOpen,
                'opacity-0 pointer-events-none': !isMenuOpen,
              },
            ])}
          ></div>
        </div>
      </div>
    </>
  );
};

const MenuItems: React.FC<{ site: Types.Site }> = ({ site }) => {
  return (
    <>
      <li>
        <Link href="/recipes" className="hover:opacity-60 transition-opacity">
          <Ui.Text.Label>All Recipes</Ui.Text.Label>
        </Link>
      </li>
      {site.linkList && (
        <li>
          <Link href="/links" className="hover:opacity-60 transition-opacity">
            <Ui.Text.Label>My Links</Ui.Text.Label>
          </Link>
        </li>
      )}
      {site.customHeaderLinks && (
        <>
          {site.customHeaderLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                target={link.openInNewTab ? '_blank' : '_self'}
                className="hover:opacity-60 transition-opacity"
              >
                <Ui.Text.Label>{link.label}</Ui.Text.Label>
              </Link>
            </li>
          ))}
        </>
      )}
      <li>
        <Link href="/about" className="hover:opacity-60 transition-opacity">
          <Ui.Text.Label>About</Ui.Text.Label>
        </Link>
      </li>
    </>
  );
};

const SocialMediaLinks: React.FC<{ site: Types.Site }> = ({ site }) => {
  return (
    <div className="flex gap-x-4">
      <Ui.SocialMediaLinks socialMediaLinks={site.socialMediaLinks} />
    </div>
  );
};
