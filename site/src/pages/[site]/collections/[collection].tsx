import * as Chef from '@/lib/chef';
import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Views from '@/views';

import Head from 'next/head';

type Props = Types.PageProps<{ collection: Types.Collection }>;

const CollectionsShow: Next.NextPage<Next.InferGetStaticPropsType<typeof getStaticProps>> = ({
  site,
  collection,
}) => {
  return (
    <>
      <Head>
        <title>{`${collection.title} • ${site.title}`}</title>
      </Head>
      <Views.CollectionsShow site={site} collection={collection} />
    </>
  );
};

export default CollectionsShow;

export const getStaticProps: Next.GetStaticProps<Props> = async (context) => {
  // @ts-ignore
  const siteSlug: string = context.params.site;
  // @ts-ignore
  const collectionSlug: string = context.params.collection;

  const [site, globals, collection] = await Promise.all([
    Chef.Sites.get({ slug: siteSlug }),
    Chef.SiteGlobals.get(siteSlug),
    Chef.Collections.get({ siteSlug, collectionSlug }),
  ]);

  if (!site || !collection) return { notFound: true };

  return { props: { site, globals, collection } };
};

export const getStaticPaths: Next.GetStaticPaths = async () => {
  const sites = await Chef.Sites.list();

  const paths = sites.flatMap((site) => {
    if (site.collections) {
      return site.collections.map((collection) => {
        return {
          params: {
            site: site.slug,
            collection: collection.slug,
          },
        };
      });
    } else {
      return [];
    }
  });

  return { paths, fallback: false };
};
