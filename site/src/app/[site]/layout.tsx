import * as Chef from '@/lib/chef';
import * as Config from '@/lib/config';
import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as Sanity from '@/lib/sanity';
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

  return (
    <>
      {site.colorTheme && (
        <style>{`
          :root {
            --color-text: ${site.colorTheme.colorText.hex};
            --color-accent: ${site.colorTheme.colorAccent.hex};
            --color-subdued: ${site.colorTheme.colorSubdued.hex};
            --color-overlay: ${site.colorTheme.colorOverlay.hex};
            --color-background: ${site.colorTheme.colorBackground.hex};
            --color-panel: ${site.colorTheme.colorPanel.hex};
            --color-emphasis: ${site.colorTheme.colorEmphasis.hex};
            --color-outline: ${site.colorTheme.colorOutline.hex};
          }
      `}</style>
      )}
      {site.typeTheme && (
        <style>{`
          :root {
            --font-family-display: ${Config.FontFamilies[site.typeTheme.displayFont.family]};
            --font-family-interface: ${Config.FontFamilies[site.typeTheme.interfaceFont.family]};
            --font-family-narrative: ${Config.FontFamilies[site.typeTheme.narrativeFont.family]};
            --font-weight-normal: ${site.typeTheme.displayFont.weights.normal};
            --font-weight-bold: ${site.typeTheme.displayFont.weights.bold};
          }
      `}</style>
      )}
      {site.cssOverrides && (
        <style>{`
          ${site.cssOverrides}
        `}</style>
      )}
      <SiteContext.Provider globals={globals}>
        <div className="flex flex-col min-h-screen bg-background">
          <Ui.Nav.Main site={site} />
          <main className="flex-1">{props.children}</main>
          <footer className="mt-6 border-t border-outline py-6 text-subdued">
            <Ui.Container>
              <div className="flex justify-between items-center">
                <Ui.Text.Label>
                  © {new Date().getFullYear()} — {site.title}
                </Ui.Text.Label>
                <nav>
                  <Link
                    href="https://www.recipe.site"
                    className="hover:opacity-60 transition-opacity"
                  >
                    <Ui.Text.Label>
                      Built with <span className="underline">Recipe.site</span>
                    </Ui.Text.Label>
                  </Link>
                </nav>
              </div>
            </Ui.Container>
          </footer>
        </div>
      </SiteContext.Provider>
    </>
  );
};

export async function generateMetadata({ params }: Props): Promise<Next.Metadata> {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  const primaryAuthor = Site.primaryAuthor(site);

  return {
    title: site.title,
    authors: {
      name: primaryAuthor.name,
    },
    openGraph: {
      title: site.title,
      description: site.aboutShortPlaintext,
      locale: 'en_US',
      type: 'website',
      images: site.featuredImage
        ? [
            {
              url: Sanity.ImageBuilder.image(site.featuredImage).url(),
              width: site.featuredImage.asset.metadata.dimensions.width,
              height: site.featuredImage.asset.metadata.dimensions.height,
            },
          ]
        : undefined,
    },
    twitter: {
      images: site.featuredImage
        ? [
            {
              url: Sanity.ImageBuilder.image(site.featuredImage).url(),
              width: site.featuredImage.asset.metadata.dimensions.width,
              height: site.featuredImage.asset.metadata.dimensions.height,
            },
          ]
        : undefined,
    },
  };
}

export default SiteLayout;
