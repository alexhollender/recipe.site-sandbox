'use client';

import * as Next from 'next';
import * as React from 'react';
import * as RecipeContext from '@/lib/recipeContext';
import * as Site from '@/lib/site';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

import Controls from '@/views/recipesShow/controls';
import Story from '@/views/recipesShow/story';

type RecipesShowProps = {
  site: Types.Site;
  recipe: Types.Recipe;
};

const RecipesShow: Next.NextPage<RecipesShowProps> = (props) => {
  const [isIngredientsDisplayed, setIsIngredientsDisplayed] = React.useState(true);

  const onToggleIngredients = () => {
    setIsIngredientsDisplayed((state) => !state);
  };

  const mediaArray = [props.recipe.featuredMedia, ...(props.recipe.media || [])];

  return (
    <div>
      <Ui.Container className="mb-4">
        <Ui.Grid>
          <div className="col-span-12 md:col-span-9">
            <header className="space-y-4 mb-3">
              <Ui.Text.Lead as="h1">{props.recipe.title}</Ui.Text.Lead>
              {props.recipe.description && (
                <Ui.Text.Tagline>
                  <Ui.Richtext.Inherited content={props.recipe.description} />
                </Ui.Text.Tagline>
              )}
              <Timing recipe={props.recipe} />
            </header>
            <div className="aspect-square relative rounded-md overflow-hidden mb-5">
              <Ui.Media.Media media={props.recipe.featuredMedia} fill />
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
          <div className="hidden md:block col-span-3">
            <div className="border border-tint p-2 rounded-md">
              <Ui.Text.Body>{Site.primaryAuthor(props.site).name}</Ui.Text.Body>
            </div>
          </div>
        </Ui.Grid>
      </Ui.Container>
      <Ui.Container className="py-3 border-y">
        <Controls recipe={props.recipe} />
      </Ui.Container>
      <Ui.Container className="mt-4">
        <Ui.Grid>
          <div className="col-span-12 md:col-span-5">
            <div className="bg-secondary-tint p-4 rounded-md sticky top-5">
              <div className="flex items-center" role="button" onClick={onToggleIngredients}>
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
                <Ui.Text.Title as="h2">{`Ingredients (${props.recipe.ingredientUsageCount})`}</Ui.Text.Title>
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
                                    <Ui.Text.Body className="italic text-primary-tint">
                                      <Ui.Richtext.Styled content={ingredientUsage.note} />
                                    </Ui.Text.Body>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                          {ingredientUsageGroup.note && (
                            <Ui.Text.Body className="italic text-primary-tint">
                              <Ui.Richtext.Styled content={ingredientUsageGroup.note} />
                            </Ui.Text.Body>
                          )}
                        </ol>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="mt-5">
              <Ui.Text.Title as="h2">Instructions</Ui.Text.Title>
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
          <Ui.Text.Highlight as="h3">{instructionGroup.title}</Ui.Text.Highlight>
        </div>
      )}
      {isCollapsed === false && (
        <ol className="space-y-7">
          {instructionGroup.instructions.map((instruction) => {
            return (
              <li
                key={instruction._key}
                role="button"
                className="relative"
                onClick={() => {
                  recipeContext.setSelectedInstruction(instruction._key);
                }}
              >
                <div
                  className={Utils.cx([
                    '-inset-2 absolute bg-secondary-tint rounded-lg -z-10 opacity-0 transition-opacity duration-50',
                    {
                      'opacity-100':
                        recipeContext.state.selectedInstructionKey === instruction._key,
                    },
                  ])}
                ></div>
                <Ui.Richtext.Styled content={instruction.content} />
                {instruction.note && (
                  <div className="pt-2">
                    <Ui.Text.Body className="italic text-primary-tint">
                      <Ui.Richtext.Styled content={instruction.note} />
                    </Ui.Text.Body>
                  </div>
                )}
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
    <div className="flex items-start">
      <input
        type="checkbox"
        className="mr-2 mt-[0.325rem]"
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
      <label htmlFor={ingredientUsage._id}>
        <Ui.Text.Label>
          <Ui.Text.Label as="span" className="pr-2" bold>
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
      <Ui.Text.Body>
        <span>{recipe.ingredientUsageCount} ingredients</span>
        <span className="mx-1">•</span>
        <span>{recipe.timing}</span>
      </Ui.Text.Body>
    );
  }

  return (
    <Ui.Text.Body>
      {recipe.prepTimeMinutes && <span>Prep: {Utils.formatMinutes(recipe.prepTimeMinutes)}</span>}
      {recipe.prepTimeMinutes && recipe.cookTimeMinutes && <span className="mx-1">•</span>}
      {recipe.cookTimeMinutes && <span>Cook: {Utils.formatMinutes(recipe.cookTimeMinutes)}</span>}
    </Ui.Text.Body>
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
