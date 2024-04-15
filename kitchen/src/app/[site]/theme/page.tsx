import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as PrivateChef from '@/lib/privateChef';
import * as React from 'react';
import * as Overview from '@/app/[site]/page';
import * as Views from '@/views';

type ThemeProps = {
  params: Overview.Props['params'];
};

const Theme: Next.NextPage<ThemeProps> = async ({ params }) => {
  const globals = await PrivateChef.Globals.get({ siteSlug: params.site });

  if (!globals) return NextNavigation.notFound();

  return <Views.Theme globals={globals} />;
};

export default Theme;

export async function generateMetadata({ params }: ThemeProps): Promise<Next.Metadata> {
  const site = await PrivateChef.Sites.get({ slug: params.site });

  if (!site) return NextNavigation.notFound();

  return {
    title: `Theme • ${site.title}`,
  };
}
