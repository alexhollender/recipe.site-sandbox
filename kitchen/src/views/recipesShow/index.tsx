import * as Next from 'next';
import * as React from 'react';
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

const RecipesShow: Next.NextPage<RecipesShowProps> = async (props) => {
  const author = Site.primaryAuthor(props.site);

  const mediaArray = [props.recipe.featuredMedia, ...props.recipe.media];

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
              <Ui.Text.Body>{author.name}</Ui.Text.Body>
            </div>
          </div>
        </Ui.Grid>
      </Ui.Container>
      <Ui.Container className="py-3 border-y">
        <Controls recipe={props.recipe} />
      </Ui.Container>
      <Ui.Container className="mt-4">
        {props.recipe.instructionGroups &&
          props.recipe.instructionGroups.map((instructionGroup) => {
            return (
              <div key={instructionGroup.title}>
                <h2>{instructionGroup.title}</h2>
                <ol>
                  {instructionGroup.instructions.map((instruction) => {
                    return (
                      <li key={instruction._key}>
                        <Ui.Richtext.Styled content={instruction.content} />
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
      </Ui.Container>
    </div>
  );
};

export default RecipesShow;

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
