'use client';

import * as JsonLd from '@/lib/jsonLd';
import * as Next from 'next';
import * as React from 'react';
import * as RecipeContext from '@/lib/recipeContext';
import * as Site from '@/lib/site';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

import Link from 'next/link';
import Script from 'next/script';

import Controls from '@/views/recipesShow/controls';
import Story from '@/views/recipesShow/story';

type RecipesShowProps = {
  site: Types.Site;
  recipe: Types.Recipe;
};

const RecipesShow: Next.NextPage<RecipesShowProps> = (props) => {
  const [isIngredientsDisplayed, setIsIngredientsDisplayed] = React.useState(true);

  const mediaArray = [props.recipe.featuredMedia, ...(props.recipe.media || [])];

  const [activeMediaIndex, setActiveMediaIndex] = React.useState(0);
  const [videoPlayStates, setVideoPlayStates] = React.useState<('paused' | 'playing')[]>(
    mediaArray.map(() => 'paused'),
  );

  const activeMediaPlayState = videoPlayStates[activeMediaIndex];

  const onPlayVideo = () => {
    setVideoPlayStates((state) => {
      const newState = [...state];
      newState[activeMediaIndex] = 'playing';
      return newState;
    });
  };

  const onPauseVideo = () => {
    setVideoPlayStates((state) => {
      const newState = [...state];
      newState[activeMediaIndex] = 'paused';
      return newState;
    });
  };

  const onToggleIngredients = () => {
    setIsIngredientsDisplayed((state) => !state);
  };

  const onNextMedia = () => {
    onPauseVideo();
    setActiveMediaIndex((state) => {
      if (state + 1 >= mediaArray.length) return 0;
      return state + 1;
    });
  };

  const onPreviousMedia = () => {
    onPauseVideo();
    setActiveMediaIndex((state) => {
      if (state - 1 < 0) return mediaArray.length - 1;
      return state - 1;
    });
  };

  const onChangeMedia = (index: number) => {
    onPauseVideo();
    setActiveMediaIndex(index);
  };

  return (
    <div>
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
              <Ui.Text.Lead as="h1" bold>
                {props.recipe.title}
              </Ui.Text.Lead>
              {props.recipe.description && (
                <Ui.Text.Tagline>
                  <Ui.Richtext.Inherited content={props.recipe.description} />
                </Ui.Text.Tagline>
              )}
              <Timing recipe={props.recipe} />
            </header>
            <div className="aspect-sd relative rounded-md overflow-hidden mb-5">
              {mediaArray.length > 1 && (
                <div className="absolute top-0 bottom-0 left-0 flex items-center pl-8 z-20 pointer-events-none">
                  <button
                    type="button"
                    onClick={onPreviousMedia}
                    className={Utils.cx([
                      'h-12 w-12 text-secondary-tint opacity-90 pointer-events-auto',
                    ])}
                    aria-label="Previous Image"
                  >
                    <Ui.Icons.Previous />
                  </button>
                </div>
              )}
              {mediaArray.length > 1 && (
                <div className="absolute top-0 bottom-0 right-0 flex items-center pr-8 z-20 pointer-events-none">
                  <button
                    type="button"
                    onClick={onNextMedia}
                    className={Utils.cx([
                      'h-12 w-12 text-secondary-tint opacity-90 pointer-events-auto',
                    ])}
                    aria-label="Next Image"
                  >
                    <Ui.Icons.Next />
                  </button>
                </div>
              )}
              {mediaArray.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 z-20 pointer-events-none">
                  <div className="flex space-x-4 p-3 bg-secondary-tint rounded-full">
                    {mediaArray.map((media, index) => {
                      return (
                        <button
                          key={media._key}
                          type="button"
                          onClick={() => onChangeMedia(index)}
                          className={Utils.cx([
                            'h-4 w-4 rounded-full pointer-events-auto transition-opacity',
                            {
                              'bg-primary opacity-50': activeMediaIndex === index,
                              'bg-primary opacity-20': activeMediaIndex !== index,
                            },
                          ])}
                          aria-label="Change Image"
                        ></button>
                      );
                    })}
                  </div>
                </div>
              )}
              {mediaArray.map((media, index) => {
                return (
                  <div
                    key={media._key}
                    className={Utils.cx([
                      'absolute inset-0 transition-opacity duration-300',
                      {
                        'opacity-100 z-10': activeMediaIndex === index,
                        'opacity-0 z-0': activeMediaIndex !== index,
                      },
                    ])}
                  >
                    <Ui.Media.Media
                      videoOnPause={onPauseVideo}
                      videoOnPlay={onPlayVideo}
                      videoPlayState={activeMediaPlayState}
                      media={media}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
            <div>
              <Overview site={props.site} recipe={props.recipe} />
            </div>
            {props.recipe.storyExcerpt && (
              <div className="mt-3">
                <Story
                  storyExcerpt={props.recipe.storyExcerpt}
                  storyMore={props.recipe.storyMore}
                />
              </div>
            )}
          </div>
          <div className="hidden lg:block col-start-10 col-span-3">
            <Bio site={props.site} />
          </div>
        </Ui.Grid>
      </Ui.Container>
      <Ui.Container>
        <div className="py-3 border-y">
          <Controls recipe={props.recipe} />
        </div>
      </Ui.Container>
      <Ui.Container className="mt-4">
        <Ui.Grid>
          <div className="col-span-12 md:col-span-5">
            <div className="bg-secondary-tint p-4 rounded-md sticky top-5">
              <div
                className="flex md:hidden items-center"
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
                <Ui.Text.Title
                  bold
                  as="h2"
                >{`Ingredients (${props.recipe.ingredientUsageCount})`}</Ui.Text.Title>
              </div>

              <div className="hidden md:block">
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
                          <div className="border-b border-primary-tint mb-3 pb-0.5">
                            <Ui.Text.Highlight as="h3">
                              {ingredientUsageGroup.title}
                            </Ui.Text.Highlight>
                          </div>
                        )}
                        <ol className="space-y-2">
                          {ingredientUsageGroup.ingredientUsages.map((ingredientUsage) => {
                            return (
                              <li key={ingredientUsage._id}>
                                <IngredientUsage ingredientUsage={ingredientUsage} />
                                {ingredientUsage.note && (
                                  <div className="pl-6">
                                    <div className="italic text-primary-tint">
                                      <Ui.Richtext.Styled
                                        style="interface"
                                        content={ingredientUsage.note}
                                      />
                                    </div>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                          {ingredientUsageGroup.note && (
                            <div className="italic text-primary-tint">
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
            <div className="mt-5">
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
    </div>
  );
};

export default RecipesShow;

const Bio = ({ site }: { site: Types.Site }) => {
  return (
    <div className="border border-tint p-6 rounded-md text-center">
      {site.featuredImage && (
        <div className="px-2">
          <div className="rounded-full aspect-square relative overflow-hidden">
            <Ui.Media.Image
              image={site.featuredImage}
              alt={`Profile picture`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      {site.aboutShort && (
        <div className="mt-6">
          <Ui.Text.Tagline>
            <Ui.Richtext.Inherited content={site.aboutShort} />
          </Ui.Text.Tagline>
        </div>
      )}

      <div className="mt-6">
        <Link href="/about">
          <Ui.Text.Label bold className="hover:opacity-60 transition-opacity">
            Learn More
          </Ui.Text.Label>
        </Link>
      </div>

      {site.socialMediaLinks.length > 0 && (
        <div className="mt-6 justify-center flex space-x-5">
          {site.socialMediaLinks.slice(0, 3).map((socialMediaLink) => {
            return (
              <div key={socialMediaLink._key} className="w-8">
                <Ui.SocialMediaLink socialMediaLink={socialMediaLink} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const InstructionGroup = ({ instructionGroup }: { instructionGroup: Types.InstructionGroup }) => {
  const recipeContext = RecipeContext.useContext();

  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const onToggleIsCollapsed = () => {
    setIsCollapsed((state) => !state);
  };

  return (
    <div>
      {instructionGroup.title && (
        <div
          className={Utils.cx([
            'flex items-center',
            {
              'mb-3': isCollapsed === false,
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
      {isCollapsed === false && (
        <ol className="space-y-7">
          {instructionGroup.instructions.map((instruction) => {
            return (
              <li
                key={instruction._key}
                role="button"
                className={Utils.cx([
                  'relative instruction flex before:inline-flex before:border before:transition-colors before:border-primary before:w-6 before:h-6 before:items-center before:justify-center before:flex-shrink-0 before:mr-2 before:rounded-full before:text-[0.75rem] before:font-interface before:font-bold group before:-left-1 before:relative',
                  {
                    'before:bg-primary before:text-secondary':
                      recipeContext.state.selectedInstructionKey === instruction._key,
                    'before:bg-secondary before:text-primary':
                      recipeContext.state.selectedInstructionKey !== instruction._key,
                  },
                ])}
                onClick={() => {
                  recipeContext.setSelectedInstruction(instruction._key);
                }}
              >
                <div>
                  <div
                    className={Utils.cx([
                      '-inset-x-3 -inset-y-2 absolute bg-secondary-tint rounded-lg -z-10 opacity-0 transition-opacity duration-50 ',
                      {
                        'opacity-100':
                          recipeContext.state.selectedInstructionKey === instruction._key,
                        'group-hover:opacity-40':
                          recipeContext.state.selectedInstructionKey !== instruction._key,
                      },
                    ])}
                  ></div>
                  <Ui.Richtext.Styled style="interface" content={instruction.content} />
                  {instruction.note && (
                    <div className="pt-2">
                      <Ui.Text.Label className="italic text-primary-tint">
                        <Ui.Richtext.Inherited content={instruction.note} />
                      </Ui.Text.Label>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

const IngredientUsage: React.FC<{ ingredientUsage: Types.IngredientUsage }> = ({
  ingredientUsage,
}) => {
  const recipeContext = RecipeContext.useContext();

  const title = ingredientUsage.ingredientTitleOverride || ingredientUsage.ingredient.title;

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
      <label htmlFor={ingredientUsage._id} className="cursor-pointer">
        <Ui.Text.Label>
          <Ui.Text.Label as="span" className="pr-1" bold>
            {title}
          </Ui.Text.Label>
          (<Ui.IngredientUsageAmount ingredientUsage={ingredientUsage} />)
        </Ui.Text.Label>
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
      {recipe.prepTimeMinutes && <span>Prep: {Utils.formatMinutes(recipe.prepTimeMinutes)}</span>}
      {recipe.prepTimeMinutes && recipe.cookTimeMinutes && <span className="mx-1">•</span>}
      {recipe.cookTimeMinutes && <span>Cook: {Utils.formatMinutes(recipe.cookTimeMinutes)}</span>}
    </Ui.Text.Label>
  );
};

const Overview: React.FC<{ site: Types.Site; recipe: Types.Recipe }> = ({ site, recipe }) => {
  const author = Site.primaryAuthor(site);

  return (
    <div className="flex space-x-3 items-center">
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
