import * as Chef from '@/lib/chef';
import * as NextNavigation from 'next/navigation';
import * as Site from '@/lib/site';
import * as Ui from '@/ui';

export type Props = {
  params: {
    site: string;
  };
};

const SiteLayout: React.FC<React.PropsWithChildren<Props>> = async (props) => {
  const site = await Chef.Sites.get({ slug: props.params.site });
  if (!site) return NextNavigation.notFound();

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
      <div className="border-b py-3 mb-3">
        <Ui.Container>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl">{primaryAuthor.name}</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="/site1">Site 1</a>
                </li>
                <li>
                  <a href="/site2">Site 2</a>
                </li>
              </ul>
            </nav>
          </div>
        </Ui.Container>
      </div>
      <main>{props.children}</main>
    </>
  );
};

export default SiteLayout;
