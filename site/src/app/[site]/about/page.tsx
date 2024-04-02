import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Chef from '@/lib/chef';
import * as SitesShow from '@/app/[site]/page';
import * as Views from '@/views';

type AboutProps = {
  params: SitesShow.Props['params'];
};

const About: Next.NextPage<AboutProps> = async ({ params }) => {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return <Views.About site={site} />;
};

export default About;

export async function generateMetadata({ params }: AboutProps): Promise<Next.Metadata> {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return {
    title: `About • ${site.title}`,
  };
}
