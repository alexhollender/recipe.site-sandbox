import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import Link from 'next/link';

type LinksIndexProps = {
  site: Types.Site;
  linkList: NonNullable<Types.Site['linkList']>;
};

const LinksIndex: Next.NextPage<LinksIndexProps> = (props) => {
  return (
    <Ui.Container className="text-center">
      <div className="mb-4 text-accent">
        <Ui.Text.Lead as="h1">{props.linkList.title}</Ui.Text.Lead>
      </div>
      <div className="space-y-5">
        {props.linkList.links.map((link) => {
          return (
            <div key={link._key} className="max-w-[40rem] mx-auto">
              <Link
                href={link.href}
                className="block bg-accent text-background p-4 rounded-lg hover:opacity-60 transition-opacity"
                target="_blank"
              >
                <Ui.Text.Label bold>{link.label}</Ui.Text.Label>
              </Link>
            </div>
          );
        })}
      </div>
    </Ui.Container>
  );
};

export default LinksIndex;
