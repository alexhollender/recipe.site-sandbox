import * as Chef from '@/lib/chef';
import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Views from '@/views';

export type SitesShowProps = {
  params: {
    site: string;
  };
};

const SitesShow: Next.NextPage<SitesShowProps> = async ({ params }) => {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return <Views.SitesShow site={site} />;
};

export default SitesShow;

export async function generateMetadata({ params }: SitesShowProps): Promise<Next.Metadata> {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return {
    title: site.title,
  };
}
