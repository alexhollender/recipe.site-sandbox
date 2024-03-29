import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Chef from '@/lib/chef';
import * as SitesShow from '@/app/[site]/page';
import * as Views from '@/views';

type LinksIndexProps = {
  params: SitesShow.Props['params'];
};

const LinksIndex: Next.NextPage<LinksIndexProps> = async ({ params }) => {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site || !site.linkList) return NextNavigation.notFound();

  return <Views.LinksIndex site={site} linkList={site.linkList} />;
};

export default LinksIndex;

export async function generateMetadata({ params }: LinksIndexProps): Promise<Next.Metadata> {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return {
    title: `Links · ${site.title}`,
  };
}
