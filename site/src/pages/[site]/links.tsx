import * as Next from 'next';
import * as React from 'react';
import * as Chef from '@/lib/chef';
import * as Types from '@/lib/types';
import * as Views from '@/views';

import Head from 'next/head';

type Props = Types.PageProps<{ linkList: NonNullable<Types.Site['linkList']> }>;

const LinksIndex: Next.NextPage<Next.InferGetStaticPropsType<typeof getStaticProps>> = ({
  site,
  linkList,
}) => {
  return (
    <>
      <Head>
        <title>{`Links • ${site.title}`}</title>
      </Head>
      <Views.LinksIndex site={site} linkList={linkList} />;
    </>
  );
};

export default LinksIndex;

export const getStaticProps: Next.GetStaticProps<Props> = async (context) => {
  // @ts-ignore
  const siteSlug: string = context.params.site;
  const [site, globals] = await Promise.all([
    Chef.Sites.get({ slug: siteSlug }),
    Chef.SiteGlobals.get(siteSlug),
  ]);
  if (!site || !site.linkList) return { notFound: true };
  return { props: { site, linkList: site.linkList, globals } };
};

export const getStaticPaths: Next.GetStaticPaths = async () => {
  const siteSlugs = await Chef.Sites.listSlugs();
  const paths = siteSlugs.map((slug) => ({ params: { site: slug } }));
  return { paths, fallback: false };
};
