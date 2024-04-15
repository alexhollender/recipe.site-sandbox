import * as PrivateChef from '@/lib/privateChef';
import * as Next from 'next';
import * as NextNavigation from 'next/navigation';
import * as React from 'react';
import * as Views from '@/views';

export type Props = {
  params: {
    site: string;
  };
};

const Overview: Next.NextPage<Props> = async ({ params }) => {
  const globals = await PrivateChef.Globals.get({ siteSlug: params.site });

  if (!globals) return NextNavigation.notFound();

  return <Views.Overview globals={globals} />;
};

export default Overview;
