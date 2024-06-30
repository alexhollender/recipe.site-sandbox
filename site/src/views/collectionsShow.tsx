'use client';

import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

type CollectionsShowProps = {
  site: Types.Site;
  collection: Types.Collection;
};

const CollectionsShow: Next.NextPage<CollectionsShowProps> = (props) => {
  return (
    <Ui.Container>
      <div className="mb-3 text-accent">
        <Ui.Text.Lead as="h1">{props.collection.title}</Ui.Text.Lead>
      </div>
      <div className="mb-5 text-text">
        <Ui.Text.Body>
          <Ui.Richtext.Inherited content={props.collection.description} />
        </Ui.Text.Body>
      </div>
      <section>
        <Ui.Grid>
          {props.collection.recipes.map((recipe) => {
            return (
              <div key={recipe._id} className="col-span-12 md:col-span-6 lg:col-span-4">
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
