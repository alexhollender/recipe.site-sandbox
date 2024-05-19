'use client';

import * as Next from 'next';
import * as React from 'react';
import * as Recipes from '@/lib/recipes';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import Link from 'next/link';

type RecipesIndexProps = {
  globals: Types.Globals;
  recipes: Types.Recipe[];
};

const RecipesIndex: Next.NextPage<RecipesIndexProps> = (props) => {
  console.log('recipes', props.recipes);
  return (
    <Ui.Site.Layout pathname="/recipes">
      <Ui.Site.Container>
        <div className="divide-y">
          {props.recipes.map((recipe) => {
            // const currentRecipe = Recipes.getCurrent(recipe);

            const getDraftStatus = () => {
              if (!recipe.isPublished) return 'Draft';
              return null;
            };

            // const draftStatus = getDraftStatus();

            return (
              <Link
                key={recipe.publishedId}
                href={`/recipes/${recipe.publishedId}`}
                className="flex py-3 hover:bg-panel cursor-pointer justify-between"
              >
                <p>
                  {recipe.title || 'Untitled'} ({recipe.slug})
                </p>
                <div className="flex space-x-8">
                  <p>{getDraftStatus()}</p>
                  {/* <p>{new Date(recipe.createdAt).toLocaleDateString()}</p> */}
                </div>
              </Link>
            );
          })}
        </div>
      </Ui.Site.Container>
    </Ui.Site.Layout>
  );
};

export default RecipesIndex;
