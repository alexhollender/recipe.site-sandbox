'use client';

import * as Next from 'next';
import * as React from 'react';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

type SitesShowProps = {
  site: Types.Site;
};

const SitesShow: Next.NextPage<SitesShowProps> = (props) => {
  const slider = Ui.Slider.useSlider();

  return (
    <div>
      <Ui.Text.Title as="h1" className="sr-only">
        {props.site.title}
      </Ui.Text.Title>
      <Ui.Container className="flex justify-between mb-3 items-center">
        <Ui.Text.Title as="h2">Featured recipes</Ui.Text.Title>
        <div className="flex justify-between space-x-5">
          <button
            type="button"
            className="w-7 h-7 color-primary disabled:text-primary-tint transition-colors"
            onClick={slider.onPrevious}
            disabled={slider.isPreviousDisabled}
          >
            <Ui.Icons.Previous />
          </button>
          <button
            type="button"
            className="w-7 h-7 color-primary disabled:text-primary-tint transition-colors"
            onClick={slider.onNext}
            disabled={slider.isNextDisabled}
          >
            <Ui.Icons.Next />
          </button>
        </div>
      </Ui.Container>
      <Ui.Slider.Soufflé onScroll={slider.onScroll} ref={slider.ref}>
        {props.site.featuredRecipes.map((recipe) => {
          return (
            <div className="flex-shrink-0 snap-start ps-4 slider-item-container" key={recipe.slug}>
              <div className="max-w-[80vw] w-[36rem] slider-item-inner">
                <Ui.Cards.Recipe recipe={recipe} />
              </div>
            </div>
          );
        })}
      </Ui.Slider.Soufflé>

      {/* <div className="overflow-scroll">
        <div className="flex pl-6">
          {site.featuredRecipes.map((recipe) => {
            return (
              <div className="flex-shrink-0 w-[500px]" key={recipe.slug}>
                <Ui.Cards.Recipe recipe={recipe} />
              </div>
            );
          })}
        </div>
      </div> */}
      {/* <ul>
        {site.recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link href={`/${recipe.slug}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default SitesShow;

/*

calc(
  max(
    ((100vw-75rem)/2)
    ,0rem
  )-
  max(
    ((100vw-120rem)/2),
    0rem
  )
)

*/
