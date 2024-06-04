import * as Chef from '@/lib/chef';
import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Views from '@/views';

type Props = Types.PageProps<{ latestRecipes: Types.RecipePreview[] }>;

const SitesShow: Next.NextPage<Next.InferGetStaticPropsType<typeof getStaticProps>> = ({
  site,
  latestRecipes,
}) => {
  return <Views.SitesShow site={site} latestRecipes={latestRecipes} />;
};

export default SitesShow;

export const getStaticProps: Next.GetStaticProps<Props> = async (context) => {
  // @ts-ignore
  const siteSlug: string = context.params.site;
  const [site, latestRecipes, globals] = await Promise.all([
    Chef.Sites.get({ slug: siteSlug }),
    Chef.Recipes.searchBy({ siteSlug, limit: 6 }),
    Chef.SiteGlobals.get(siteSlug),
  ]);

  if (!site) return { notFound: true };
  return { props: { site, latestRecipes, globals } };
};

export const getStaticPaths: Next.GetStaticPaths = async () => {
  const siteSlugs = await Chef.Sites.listSlugs();
  const paths = siteSlugs.map((slug) => ({ params: { site: slug } }));
  return { paths, fallback: false };
};
