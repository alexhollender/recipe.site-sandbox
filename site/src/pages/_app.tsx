import * as Config from '@/lib/config';
import * as Google from '@next/third-parties/google';
import * as Sanity from '@/lib/sanity';
import * as NextApp from 'next/app';
import * as SiteContext from '@/lib/siteContext';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import Head from 'next/head';
import Link from 'next/link';

import '@/globals.css';

const App: React.FC<NextApp.AppProps> = ({ Component, pageProps }) => {
  const {
    site,
    globals,
  }: {
    site: Types.Site;
    globals: Types.SiteGlobals;
  } = pageProps;

  if (!site || !globals) return <Component {...pageProps} />;

  return (
    <>
      <Head>
        <title>{site.title}</title>

        <meta name="description" content={site.aboutShortPlaintext} />
        <meta property="og:title" content={site.title} />
        <meta property="og:description" content={site.aboutShortPlaintext} />
        <meta property="og:site_name" content={site.title} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta
          property="og:image"
          content={Sanity.ImageBuilder.image(site.featuredImage).width(800).height(600).url()}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={site.title} />
        <meta name="twitter:description" content={site.aboutShortPlaintext} />
        <meta name="twitter:image:type" content="image/jpeg" />
        <meta name="twitter:image:width" content="800" />
        <meta name="twitter:image:height" content="600" />
        <meta
          name="twitter:image"
          content={Sanity.ImageBuilder.image(site.featuredImage).width(800).height(600).url()}
        />
      </Head>
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
          --font-weight-display-normal: ${site.typeTheme.displayFont.weights.normal};
          --font-weight-display-bold: ${site.typeTheme.displayFont.weights.bold};
          --font-weight-narrative-normal: ${site.typeTheme.narrativeFont.weights.normal};
          --font-weight-narrative-bold: ${site.typeTheme.narrativeFont.weights.bold};
          --font-weight-interface-normal: ${site.typeTheme.interfaceFont.weights.normal};
          --font-weight-interface-bold: ${site.typeTheme.interfaceFont.weights.bold};
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
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
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
      {site.googleAnalyticsId && <Google.GoogleAnalytics gaId={site.googleAnalyticsId} />}
    </>
  );
};

export default App;
