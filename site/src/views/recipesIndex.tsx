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
      threshold: 0.3,
      keys: [
        {
          name: 'title',
          weight: 1,
        },
        {
          name: 'descriptionPlaintext',
          weight: 1,
        },
        // {
        //   name: 'cuisines.title',
        //   weight: 0.1,
        // },
        // {
        //   name: 'categories.title',
        //   weight: 0.1,
        // },
        // {
        //   name: 'tags.title',
        //   weight: 0.1,
        // },
      ],
    });
  }, [props.site.recipes]);

  const getRecipes = () => {
    if (searchTerm.trim() === '') return props.site.recipes;
    return fuse.search(searchTerm).map((result) => result.item);
  };

  return (
    <div className="min-h-[75vh] mb-12">
      <Ui.Container>
        {/* Search & filtering */}
        <div className="flex space-x-3 mb-7">
          <div className="relative py-2 px-2 space-x-2 flex bg-panel rounded-lg flex-1 focus-within:ring-1 focus-within:ring-outline">
            <div className="w-7 h-7 text-text">
              <Ui.Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Search for chicken, dessert, tofu, vegan..."
              className="flex-1 font-label text-md bg-transparent text-text focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <button
            type="button"
            className="flex items-center space-x-2 hover:bg-opacity-50 px-3 rounded-lg transition-colors"
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
      </Ui.Container>
      {/* {isFilterPaneDisplayed && (
          <section className="border-y py-2 my-4">
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
            className="hover:bg-opacity-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Ui.Text.Label>Meal</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="hover:bg-opacity-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Ui.Text.Label>Cuisine</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="hover:bg-opacity-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Ui.Text.Label>Category</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="hover:bg-opacity-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Ui.Text.Label>Method</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="hover:bg-opacity-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Ui.Text.Label>Cuisine</Ui.Text.Label>
          </button>
          <button
            type="button"
            className="hover:bg-opacity-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Ui.Text.Label>Diet</Ui.Text.Label>
          </button>
        </div> */}

      {/* Collections */}
      {props.site.collections && searchTerm.trim() === '' && (
        <section>
          <Ui.Slider.Slider
            items={props.site.collections.length}
            controlType="header"
            heading="Recipe collections"
            wrapperClasses="max-w-[120rem] mx-auto"
          >
            {() =>
              props.site.collections.map((collection) => (
                <div
                  key={collection._id}
                  className="flex-shrink-0 snap-start ps-4 slider-item-container"
                >
                  <div className="slider-item-inner">
                    <div className="max-w-[80vw] w-[24rem]">
                      <Ui.Cards.Collection collection={collection} />
                    </div>
                  </div>
                </div>
              ))
            }
          </Ui.Slider.Slider>
        </section>
      )}

      {/* All recipes */}
      <Ui.Container>
        {props.site.collections && searchTerm.trim() === '' && (
          <div className={`mb-3 ${props.site.collections && 'mt-7 pt-7 border-t border-outline'}`}>
            <h2 className="type-title text-text">All recipes</h2>
          </div>
        )}
        <Ui.Grid>
          {getRecipes().length === 0 && (
            <div className="col-span-12 text-center mt-2 text-text">
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
    </div>
  );
};

export default RecipesIndex;
