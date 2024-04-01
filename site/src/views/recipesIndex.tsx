'use client';

import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import Fuse from 'fuse.js';

type RecipesIndexProps = {
  site: Types.Site;
};

const RecipesIndex: Next.NextPage<RecipesIndexProps> = (props) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  // const [isFilterPaneDisplayed, setIsFilterPaneDisplayed] = React.useState(false);

  const fuse = React.useMemo(() => {
    return new Fuse(props.site.recipes, {
      includeMatches: true,
      includeScore: true,
      threshold: 0.2,
      keys: [
        {
          name: 'title',
          weight: 0.5,
        },
        {
          name: 'descriptionPlaintext',
          weight: 0.3,
        },
        {
          name: 'cuisines.title',
          weight: 0.1,
        },
        {
          name: 'categories.title',
          weight: 0.1,
        },
        {
          name: 'tags.title',
          weight: 0.1,
        },
      ],
    });
  }, [props.site.recipes]);

  const getRecipes = () => {
    if (searchTerm.trim() === '') return props.site.recipes;
    return fuse.search(searchTerm).map((result) => result.item);
  };

  return (
    <Ui.Container>
      <div className="flex space-x-3 mb-7">
        <div className="relative py-2 px-2 space-x-2 flex bg-secondary-tint rounded-xl flex-1 focus-within:ring-1 focus-within:ring-primary-tint">
          <div className="w-7 h-7">
            <Ui.Icons.Search />
          </div>
          <input
            type="text"
            placeholder="Search for chicken, dessert, tofu, vegan..."
            className="flex-1 font-label text-md bg-transparent focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <button
            type="button"
            className="flex items-center space-x-2 bg-secondary-tint hover:bg-opacity-50 px-3 rounded-xl transition-colors"
            onClick={() => {
              setIsFilterPaneDisplayed((displayed) => !displayed);
            }}
          >
            <div className="w-5 h-5">
              <Ui.Icons.Filter />
            </div>
            <Ui.Text.Label as="span">Filters</Ui.Text.Label>
          </button> */}
      </div>
      {/* {isFilterPaneDisplayed && (
          <section className="border-y border-secondary-tint py-2 my-4">
            <Ui.Grid>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Ui.Text.Title>Collection</Ui.Text.Title>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Ui.Text.Title>Meal</Ui.Text.Title>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Ui.Text.Title>Category</Ui.Text.Title>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Ui.Text.Title>Method</Ui.Text.Title>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Ui.Text.Title>Cuisine</Ui.Text.Title>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Ui.Text.Title>Diet</Ui.Text.Title>
              </div>
            </Ui.Grid>
          </section>
        )} */}
      {/* <div className="pb-6 flex space-x-4 w-full overflow-x-scroll">
          <button
            type="button"
            className="bg-secondary-tint hover:bg-opacity-50 px-3 py-2 rounded-xl transition-colors"
          >
            <Ui.Text.Label>Meal</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="bg-secondary-tint hover:bg-opacity-50 px-3 py-2 rounded-xl transition-colors"
          >
            <Ui.Text.Label>Cuisine</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="bg-secondary-tint hover:bg-opacity-50 px-3 py-2 rounded-xl transition-colors"
          >
            <Ui.Text.Label>Category</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="bg-secondary-tint hover:bg-opacity-50 px-3 py-2 rounded-xl transition-colors"
          >
            <Ui.Text.Label>Method</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="bg-secondary-tint hover:bg-opacity-50 px-3 py-2 rounded-xl transition-colors"
          >
            <Ui.Text.Label>Cuisine</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="bg-secondary-tint hover:bg-opacity-50 px-3 py-2 rounded-xl transition-colors"
          >
            <Ui.Text.Label>Diet</Ui.Text.Label>
          </button>
        </div> */}
      <Ui.Grid>
        {getRecipes().length === 0 && (
          <div className="col-span-12 text-center mt-2">
            <Ui.Text.Title>No recipes found for this search</Ui.Text.Title>
          </div>
        )}
        {getRecipes().map((recipe) => {
          return (
            <div className="col-span-12 sm:col-span-6 lg:col-span-4" key={recipe._id}>
              <Ui.Cards.Recipe recipe={recipe} />
            </div>
          );
        })}
      </Ui.Grid>
    </Ui.Container>
  );
};

export default RecipesIndex;
