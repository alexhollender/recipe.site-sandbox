'use client';

import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import Link from 'next/link';

type CollectionsShowProps = {
  site: Types.Site;
  collection: Types.Collection;
};

const CollectionsShow: Next.NextPage<CollectionsShowProps> = (props) => {
  return (
    <Ui.Container>
      <div className="mb-3">
        <Ui.Text.Title as="h1">{props.collection.title}</Ui.Text.Title>
      </div>
      <div className="mb-5">
        <Ui.Text.Tagline>
          <Ui.Richtext.Inherited content={props.collection.description} />
        </Ui.Text.Tagline>
      </div>
      <section>
        <Ui.Grid>
          {props.collection.recipes.map((recipe) => {
            return (
              <div key={recipe._id} className="col-span-12 sm:col-span-6 md:col-span-4">
                <Ui.Cards.Recipe recipe={recipe} />
              </div>
            );
          })}
        </Ui.Grid>
      </section>
    </Ui.Container>
  );
};

export default CollectionsShow;
