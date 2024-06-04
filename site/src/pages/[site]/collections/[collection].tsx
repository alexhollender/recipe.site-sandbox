import * as Chef from '@/lib/chef';
import * as Next from 'next';
import * as React from 'react';
import * as Sanity from '@/lib/sanity';
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
        {/* Title */}
        <title>{`${collection.title} • ${site.title}`}</title>
        <meta property="og:title" content={`${collection.title} • ${site.title}`} key="ogTitle" />
        <meta
          name="twitter:title"
          content={`${collection.title} • ${site.title}`}
          key="twitterTitle"
        />
        {/* Description */}
        {collection.descriptionPlaintext && (
          <>
            <meta name="description" content={collection.descriptionPlaintext} key="description" />
            <meta
              property="og:description"
              content={collection.descriptionPlaintext}
              key="ogDescription"
            />
            <meta
              name="twitter:description"
              content={collection.descriptionPlaintext}
              key="twitterDescription"
            />
          </>
        )}
        {/* Image */}
        {collection.featuredMedia.image && (
          <>
            <meta
              property="og:image:type"
              content={collection.featuredMedia.image.asset.mimeType}
              key="ogImageType"
            />
            <meta property="og:image:width" content="800" key="ogImageWidth" />
            <meta property="og:image:height" content="600" key="ogImageHeight" />
            <meta
              property="og:image"
              content={Sanity.ImageBuilder.image(collection.featuredMedia.image)
                .height(800)
                .width(600)
                .url()}
              key="ogImage"
            />
            <meta
              name="twitter:image:type"
              content={collection.featuredMedia.image.asset.mimeType}
              key="twitterImageType"
            />
            <meta name="twitter:image:width" content="800" key="twitterImageWidth" />
            <meta name="twitter:image:height" content="600" key="twitterImageHeight" />
            <meta
              name="twitter:image"
              content={Sanity.ImageBuilder.image(collection.featuredMedia.image)
                .width(800)
                .height(600)
                .url()}
              key="twitterImage"
            />
          </>
        )}
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
