import * as Chef from '@/lib/chef';
import * as NextNavigation from 'next/navigation';
import * as Site from '@/lib/site';
import * as SiteContext from '@/lib/siteContext';
import * as Ui from '@/ui';

import Link from 'next/link';

export type Props = {
  params: {
    site: string;
  };
};

const SiteLayout: React.FC<React.PropsWithChildren<Props>> = async (props) => {
  const site = await Chef.Sites.get({ slug: props.params.site });
  if (!site) return NextNavigation.notFound();

  const globals = await Chef.SiteGlobals.get(props.params.site);

  const primaryAuthor = Site.primaryAuthor(site);

  const ColorTheme = {
    primary: '#000000',
    primaryTint: '#8D8D8D',
    secondary: '#FFFFFF',
    secondaryTint: '#F2F2F2',
  };

  return (
    <>
      <style>{`
        :root {
          --color-primary: ${ColorTheme.primary};
          --color-primary-tint: ${ColorTheme.primaryTint};
          --color-secondary: ${ColorTheme.secondary};
          --color-secondary-tint: ${ColorTheme.secondaryTint};
        }
      `}</style>
      <SiteContext.Provider globals={globals}>
        <div className="flex flex-col min-h-screen">
          <div className="border-b py-3 mb-7">
            <Ui.Container>
              <div className="flex justify-between items-center">
                <Link href="/">
                  <p className="text-2xl">{primaryAuthor.name}</p>
                </Link>
                <nav>
                  <ul className="flex space-x-4">
                    <li>
                      <Link href="/recipes" className="hover:opacity-60 transition-opacity">
                        All Recipes
                      </Link>
                    </li>
                    {site.linkList && (
                      <li>
                        <Link href="/links" className="hover:opacity-60 transition-opacity">
                          My links
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link href="/about" className="hover:opacity-60 transition-opacity">
                        About
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </Ui.Container>
          </div>
          <main className="flex-1">{props.children}</main>
          <footer className="mt-6 border-t border-secondary-tint py-6">
            <Ui.Container>
              <div className="flex justify-between items-center">
                <p>
                  © {new Date().getFullYear()} — {site.title}
                </p>
                <nav>
                  <p>
                    Built with{' '}
                    <Link
                      href="https://www.recipe.site"
                      className="underline hover:opacity-60 transition-opacity"
                    >
                      Recipe.site
                    </Link>
                  </p>
                </nav>
              </div>
            </Ui.Container>
          </footer>
        </div>
      </SiteContext.Provider>
    </>
  );
};

export default SiteLayout;
