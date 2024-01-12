import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Chef from '@/lib/chef';

import Link from 'next/link';

export type Props = {
  params: {
    site: string;
  };
};

const SitesShow: Next.NextPage<Props> = async ({ params }) => {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return (
    <div>
      <h1>{site.title}</h1>
      <ul>
        {site.recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link href={`/${recipe.slug}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SitesShow;

export async function generateMetadata({ params }: Props): Promise<Next.Metadata> {
  const site = await Chef.Sites.get({ slug: params.site });
  if (!site) return NextNavigation.notFound();

  return {
    title: site.title,
  };
}
