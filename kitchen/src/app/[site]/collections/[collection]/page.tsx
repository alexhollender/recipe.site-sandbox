import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Chef from '@/lib/chef';
import * as SitesShow from '@/app/[site]/page';
import * as Views from '@/views';

type CollectionsShowProps = {
  params: SitesShow.Props['params'] & {
    collection: string;
  };
};

const CollectionsShow: Next.NextPage<CollectionsShowProps> = async ({ params }) => {
  const [site, collection] = await Promise.all([
    Chef.Sites.get({ slug: params.site }),
    Chef.Collections.get({ siteSlug: params.site, collectionSlug: params.collection }),
  ]);
  if (!site || !collection) return NextNavigation.notFound();

  return <Views.CollectionsShow site={site} collection={collection} />;
};

export default CollectionsShow;

export async function generateMetadata({ params }: CollectionsShowProps): Promise<Next.Metadata> {
  const [site, collection] = await Promise.all([
    Chef.Sites.get({ slug: params.site }),
    Chef.Collections.get({ siteSlug: params.site, collectionSlug: params.collection }),
  ]);
  if (!site || !collection) return NextNavigation.notFound();

  return {
    title: `${collection.title} • ${site.title}`,
  };
}

export async function generateStaticParams() {
  const sites = await Chef.Sites.list();
  const siteCollections = sites.map((site) => {
    return site.collections.map((collection) => {
      return {
        site: site.slug,
        collection: collection.slug,
      };
    });
  });
  return siteCollections.flat();
}
