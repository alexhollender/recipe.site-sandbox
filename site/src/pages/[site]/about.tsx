import * as Next from 'next';
import * as React from 'react';
import * as Chef from '@/lib/chef';
import * as Types from '@/lib/types';
import * as Views from '@/views';

import Head from 'next/head';

const About: Next.NextPage<Next.InferGetStaticPropsType<typeof getStaticProps>> = ({ site }) => {
  return (
    <>
      <Head>
        <title>{`About • ${site.title}`}</title>
      </Head>
      <Views.About site={site} />
    </>
  );
};

export default About;

export const getStaticProps: Next.GetStaticProps<Types.PageProps> = async (context) => {
  // @ts-ignore
  const siteSlug: string = context.params.site;
  const [site, globals] = await Promise.all([
    Chef.Sites.get({ slug: siteSlug }),
    Chef.SiteGlobals.get(siteSlug),
  ]);
  if (!site) return { notFound: true };
  return { props: { site, globals } };
};

export const getStaticPaths: Next.GetStaticPaths = async () => {
  const siteSlugs = await Chef.Sites.listSlugs();
  const paths = siteSlugs.map((slug) => ({ params: { site: slug } }));
  return { paths, fallback: false };
};
