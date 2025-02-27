'use client';

import * as JsonLd from '@/lib/jsonLd';
import * as Next from 'next';
import * as React from 'react';
import * as RecipeContext from '@/lib/recipeContext';
import * as Site from '@/lib/site';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

import Script from 'next/script';

import Controls from '@/views/recipesShow/controls';
import Story from '@/views/recipesShow/story';
import SidebarBio from '@/views/recipesShow/sidebarBio';

import Timer from '@/ui/timer';

type RecipesShowProps = {
  site: Types.Site;
  recipe: Types.Recipe;
};

const RecipesShow: Next.NextPage<RecipesShowProps> = (props) => {
  const [isIngredientsDisplayed, setIsIngredientsDisplayed] = React.useState<boolean>(true);
  const [isNotesDisplayed, setIsNotesDisplayed] = React.useState<boolean>(true);

  const mediaArray = [props.recipe.featuredMedia, ...(props.recipe.media || [])];

  const onToggleIngredients = () => {
    setIsIngredientsDisplayed((state) => !state);
  };

  const onToggleNotes = () => {
    setIsNotesDisplayed((state) => !state);
  };

  Utils.useWakeLock();

  return (
    <div className="RecipePage">
      <Script
        id="json-ld-recipe"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JsonLd.createRecipeSchema(props.site, props.recipe)),
        }}
      ></Script>
      <Ui.Container className="mb-4">
        <Ui.Grid>
          <div className="col-span-12 lg:col-span-8">
            <header className="space-y-2 mb-3">
              <div className="text-accent flex items-baseline">
                <div className="grow">
                  <Ui.Text.Lead as="h1" bold>
                    {props.recipe.title}
                  </Ui.Text.Lead>
                </div>
                <Ui.ShareMenu.ShareMenu />
              </div>
              {props.recipe.description && (
                <Ui.Text.Body className="text-subdued">
                  <Ui.Richtext.Inherited content={props.recipe.description} />
                </Ui.Text.Body>
              )}
              <div className="text-text">
                <Timing recipe={props.recipe} />
              </div>
            </header>
            <div className="mb-5 -mx-4 md:-mx-6 lg:mx-0 lg:rounded-lg overflow-hidden RecipePageSliderContainer">
              <Ui.Slider.Slider
                items={mediaArray.length}
                controlType="overlay"
                itemsContainerClasses="aspect-sd"
              >
                {({ onPauseVideo, onPlayVideo, videoPlayStates }) =>
                  mediaArray.map((media, index) => (
                    <div
                      key={media._key}
                      className="aspect-sd min-w-full min-h-full relative snap-start"
                    >
                      <Ui.Media.Media
                        videoOnPause={onPauseVideo}
                        videoOnPlay={onPlayVideo}
                        videoPlayState={videoPlayStates[index]}
                        media={media}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))
                }
              </Ui.Slider.Slider>
            </div>
            <div>
              <Overview site={props.site} recipe={props.recipe} />
            </div>
            {props.recipe.storyExcerpt && (
              <div className="mt-3 text-text">
                <Story
                  storyExcerpt={props.recipe.storyExcerpt}
                  storyMore={props.recipe.storyMore}
                />
              </div>
            )}
          </div>
          {!props.site.hideSidebarBio && (
            <div className="hidden lg:block col-start-10 col-span-3">
              <SidebarBio site={props.site} />
            </div>
          )}
        </Ui.Grid>
      </Ui.Container>
      <Ui.Container>
        <div className="py-3 border-y border-outline">
          <Controls recipe={props.recipe} />
        </div>
      </Ui.Container>
      <Ui.Container className="mt-4">
        <Ui.Grid>
          <div className="col-span-12 md:col-span-5">
            <div className="bg-panel p-4 md:p-6 rounded-lg sticky top-5 md:max-h-[calc(100vh-2.5rem)] overflow-y-auto scrollbar-thumb-custom scrollbar-track-custom">
              <div
                className="flex md:hidden items-center text-text"
                role="button"
                onClick={onToggleIngredients}
              >
                <div
                  className={Utils.cx([
                    'h-4 w-4 mr-2 transition-transform',
                    {
                      '-rotate-90': isIngredientsDisplayed === false,
                    },
                  ])}
                >
                  <Ui.Icons.DownCarrot />
                </div>
                <div className="IngredientsHeading">
                  <Ui.Text.Title
                    bold
                    as="h2"
                  >{`Ingredients (${props.recipe.ingredientUsageCount})`}</Ui.Text.Title>
                </div>
              </div>

              <div className="hidden md:block text-text IngredientsHeading">
                <Ui.Text.Title
                  bold
                  as="h2"
                >{`Ingredients (${props.recipe.ingredientUsageCount})`}</Ui.Text.Title>
              </div>

              {isIngredientsDisplayed && props.recipe.ingredientUsageGroups && (
                <div className="mt-4 mb-2 space-y-5">
                  {props.recipe.ingredientUsageGroups.map((ingredientUsageGroup) => {
                    return (
                      <div key={ingredientUsageGroup.title}>
                        {ingredientUsageGroup.title && (
                          <div className="border-b border-outline mb-3 pb-0.5 text-text">
                            <Ui.Text.Label as="h3">{ingredientUsageGroup.title}</Ui.Text.Label>
                          </div>
                        )}
                        <ol className="space-y-2">
                          {ingredientUsageGroup.ingredientUsages.map((ingredientUsage) => {
                            return (
                              <li key={ingredientUsage._id}>
                                <IngredientUsage ingredientUsage={ingredientUsage} />
                              </li>
                            );
                          })}
                          {ingredientUsageGroup.note && (
                            <div className="italic text-subdued">
                              <Ui.Richtext.Styled
                                style="interface"
                                content={ingredientUsageGroup.note}
                              />
                            </div>
                          )}
                        </ol>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 instruction-counter">
            <div className="md:mt-6 text-text InstructionsHeading">
              <Ui.Text.Title bold as="h2">
                Instructions
              </Ui.Text.Title>
            </div>
            <div className="divide-y">
              {props.recipe.instructionGroups &&
                props.recipe.instructionGroups.map((instructionGroup) => {
                  return (
                    <div className="py-5" key={instructionGroup._key}>
                      <InstructionGroup instructionGroup={instructionGroup} />
                    </div>
                  );
                })}
            </div>
          </div>
        </Ui.Grid>
      </Ui.Container>
      {props.recipe.note && (
        <Ui.Container className="mt-4">
          <div className="pt-3 border-t border-outline">
            <div className="bg-panel p-4 md:p-6 rounded-lg">
              <div className="flex items-center text-text" role="button" onClick={onToggleNotes}>
                <div
                  className={Utils.cx([
                    'h-4 w-4 mr-2 transition-transform',
                    {
                      '-rotate-90': isNotesDisplayed === false,
                    },
                  ])}
                >
                  <Ui.Icons.DownCarrot />
                </div>
                <Ui.Text.Title bold as="h2">
                  Notes
                </Ui.Text.Title>
              </div>
              {isNotesDisplayed && (
                <div className="mt-4 mb-2 space-y-5">
                  <Ui.Richtext.Styled style="narrative" content={props.recipe.note} />
                </div>
              )}
            </div>
          </div>
        </Ui.Container>
      )}
    </div>
  );
};

export default RecipesShow;

const InstructionGroup = ({ instructionGroup }: { instructionGroup: Types.InstructionGroup }) => {
  const recipeContext = RecipeContext.useContext();

  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  const onToggleIsCollapsed = () => {
    setIsCollapsed((state) => !state);
  };

  const media = instructionGroup.instructions.reduce((allMedia: Types.Media[], instruction) => {
    return [...allMedia, ...(instruction.media || [])];
  }, []);

  return (
    <div>
      {instructionGroup.title && (
        <div
          className={Utils.cx([
            'flex items-center text-text',
            {
              'mb-5': isCollapsed === false,
            },
          ])}
          role="button"
          onClick={onToggleIsCollapsed}
        >
          <div
            className={Utils.cx([
              'h-4 w-4 mr-2 transition-transform',
              {
                '-rotate-90': isCollapsed === true,
              },
            ])}
          >
            <Ui.Icons.DownCarrot />
          </div>
          <Ui.Text.Highlight bold as="h3">
            {instructionGroup.title}
          </Ui.Text.Highlight>
        </div>
      )}
      <div className={isCollapsed ? 'invisible h-0' : 'block'}>
        <ol className="space-y-7">
          {instructionGroup.instructions.map((instruction) => {
            return (
              <li
                key={instruction._key}
                role="button"
                className={Utils.cx([
                  'relative z-10 instruction flex before:inline-flex before:z-10 before:border before:transition-colors before:w-6 before:h-6 before:items-center before:justify-center before:flex-shrink-0 before:mr-2 before:rounded-full before:text-[0.75rem] before:font-interface before:font-bold group before:-left-1 before:relative',
                  {
                    'before:bg-text before:text-background before:border-text':
                      recipeContext.state.selectedInstructionKey === instruction._key,
                    'before:text-text before:border-emphasis':
                      recipeContext.state.selectedInstructionKey !== instruction._key,
                  },
                ])}
                onClick={() => {
                  recipeContext.setSelectedInstruction(instruction._key);
                }}
              >
                <div
                  className={Utils.cx([
                    '-inset-x-4 md:-inset-x-3 -inset-y-3 absolute bg-panel md:rounded-lg z-0 opacity-0 transition-opacity duration-50 ',
                    {
                      'opacity-100':
                        recipeContext.state.selectedInstructionKey === instruction._key,
                      'group-hover:opacity-40':
                        recipeContext.state.selectedInstructionKey !== instruction._key,
                    },
                  ])}
                ></div>
                <div className="flex flex-col">
                  <div className="text-text relative z-10">
                    <Ui.Richtext.Styled style="interface" content={instruction.content} />
                  </div>
                  {instruction.timerMinutes && <Timer minutes={instruction.timerMinutes} />}
                  {instruction.note && (
                    <div className="pt-1 relative z-10">
                      <Ui.Text.Label className="italic text-subdued">
                        <Ui.Richtext.Inherited content={instruction.note} />
                      </Ui.Text.Label>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        {media.length > 0 && (
          <div className="mt-6 -mx-4 md:mx-0 md:rounded-lg overflow-hidden">
            <Ui.Slider.Slider
              items={media.length}
              controlType="overlay"
              itemsContainerClasses="aspect-sd"
            >
              {({ onPauseVideo, onPlayVideo, videoPlayStates }) =>
                media.map((media, index) => (
                  <div
                    key={media._key}
                    className="aspect-sd min-w-full min-h-auto relative snap-start"
                  >
                    <Ui.Media.Media
                      videoOnPause={onPauseVideo}
                      videoOnPlay={onPlayVideo}
                      videoPlayState={videoPlayStates[index]}
                      media={media}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              }
            </Ui.Slider.Slider>
          </div>
        )}
      </div>
    </div>
  );
};

const IngredientUsage: React.FC<{ ingredientUsage: Types.IngredientUsage }> = ({
  ingredientUsage,
}) => {
  const recipeContext = RecipeContext.useContext();

  const displayTitle = ingredientUsage.ingredientTitleOverride || ingredientUsage.ingredient.title;

  // Need to do this inside of ingredientUsageAmount
  const title =
    ingredientUsage.quantityMin &&
    ingredientUsage.quantityMax === null &&
    ingredientUsage.unit === null
      ? ingredientUsage.quantityMin <= 1
        ? Utils.pluralize.singular(displayTitle)
        : Utils.pluralize(displayTitle)
      : displayTitle;

  return (
    <div
      className={Utils.cx([
        'flex items-start transition-opacity',
        {
          'opacity-50': recipeContext.state.selectedIngredientUsageIds.includes(
            ingredientUsage._id,
          ),
        },
      ])}
    >
      <input
        type="checkbox"
        className="mr-2 mt-[0.325rem] cursor-pointer"
        id={ingredientUsage._id}
        name={ingredientUsage._id}
        value={ingredientUsage._id}
        onChange={(e) => {
          if (e.target.checked) {
            recipeContext.selectIngredientUsage(ingredientUsage);
            return;
          }
          recipeContext.unselectIngredientUsage(ingredientUsage);
        }}
        checked={recipeContext.state.selectedIngredientUsageIds.includes(ingredientUsage._id)}
      ></input>
      <label htmlFor={ingredientUsage._id} className="cursor-pointer text-text">
        <Ui.Text.Label>
          {ingredientUsage.link ? (
            <Ui.Text.Label
              as="a"
              href={ingredientUsage.link}
              className="pr-1 underline"
              target="_blank"
              rel="external"
              bold
            >
              {title}
            </Ui.Text.Label>
          ) : (
            <Ui.Text.Label as="span" className="pr-1" bold>
              {title}
            </Ui.Text.Label>
          )}
          <Ui.IngredientUsageAmount
            ingredientUsage={ingredientUsage}
            onRender={({ quantity, unit, preparation }) => {
              return (
                <span>
                  ({quantity && <span>{quantity}</span>}
                  {unit && <span>{unit}</span>}
                  {preparation && <span className="italic">{preparation}</span>})
                </span>
              );
            }}
          />
        </Ui.Text.Label>
        {ingredientUsage.note && (
          <div>
            <div className="italic text-subdued">
              <Ui.Richtext.Styled style="interface" content={ingredientUsage.note} />
            </div>
          </div>
        )}
      </label>
    </div>
  );
};

const Timing: React.FC<{ recipe: Types.Recipe }> = ({ recipe }) => {
  if (recipe.timing) {
    return (
      <Ui.Text.Label>
        <span>{recipe.ingredientUsageCount} ingredients</span>
        <span className="mx-1">•</span>
        <span>{recipe.timing}</span>
      </Ui.Text.Label>
    );
  }

  return (
    <Ui.Text.Label>
      <span>{recipe.ingredientUsageCount} ingredients</span>
      {recipe.cookTimeMinutes === 0 ? (
        <>
          <span className="mx-1">•</span>
          <span>Time: {Utils.formatMinutes(recipe.prepTimeMinutes)}</span>
        </>
      ) : (
        <>
          <span className="mx-1">•</span>
          <span>Prep: {Utils.formatMinutes(recipe.prepTimeMinutes)}</span>
          <span className="mx-1">•</span>
          <span>Cook: {Utils.formatMinutes(recipe.cookTimeMinutes)}</span>
        </>
      )}
    </Ui.Text.Label>
  );
};

const Overview: React.FC<{ site: Types.Site; recipe: Types.Recipe }> = ({ site, recipe }) => {
  const author = Site.primaryAuthor(site);

  return (
    <div className="flex space-x-3 items-center text-text">
      {author.avatar && (
        <div className="rounded-full w-10 h-10 relative overflow-hidden">
          <Ui.Media.Image image={author.avatar} alt={`${author.name} profile picture`} fill />
        </div>
      )}
      <Ui.Text.Label>
        {author.name}
        <span className="mx-2">•</span>
        {Utils.formatDate(recipe.createdAt)}
      </Ui.Text.Label>
    </div>
  );
};
