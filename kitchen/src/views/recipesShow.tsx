'use client';

import * as Adapter from '@/lib/privateChef/adapter';
import * as Next from 'next';
import * as PrivateChef from '@/lib/privateChef';
import * as React from 'react';
import * as Recipes from '@/lib/recipes';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';

import * as Tiptap from '@tiptap/react';

type RecipesShowProps = {
  globals: Types.Globals;
  recipe: Types.Recipe;
};

const RecipesShow: Next.NextPage<RecipesShowProps> = (props) => {
  const [description, setDescription] = React.useState<Tiptap.JSONContent[]>([]);
  const [title, setTitle] = React.useState<string>(props.recipe.title);

  // React.useEffect(() => {
  //   const transaction = PrivateChef.Transaction.new();
  //   PrivateChef.Recipes.update(transaction, props.recipe.id, {
  //     ...props.recipe,
  //     title,
  //   });
  //   transaction.commit();
  // }, [title]);

  console.log('Description as Portable Text', Adapter.tiptapToPortableText(description));

  // const getDraftStatus = () => {
  //   const status = Recipes.draftStatus(props.recipe);
  //   if (status === 'unpublished') return 'Unpublished';
  //   if (status === 'published_with_draft') return 'Unsaved changes';
  //   return null;
  // };

  return (
    <Ui.Site.Layout>
      <Ui.Site.Container>
        <div className="flex justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {/* <p>{getDraftStatus()}</p> */}
        </div>
        <div className="flex space-x-24 mt-8">
          <div className="min-w-[300px]">
            <h2 className="font-bold mb-5">Ingredients</h2>

            {props.recipe.ingredientUsageGroups && (
              <ol className="divide-y divide-y-outline *:py-4 first:*:pt-0 last:*:pb-0">
                {recipe.ingredientUsageGroups.map((ingredientUsageGroup, index) => (
                  <li key={index}>
                    <h3 className="mb-3">{ingredientUsageGroup.title}</h3>
                    <ol>
                      {ingredientUsageGroup.ingredientUsages.map((ingredientUsage, index) => {
                        return (
                          <li key={index} className="flex">
                            <input type="number" value={ingredientUsage.quantityMin || ''} />
                            <select value={ingredientUsage.ingredient._id}>
                              {props.globals.ingredients.map((ingredient) => {
                                return (
                                  <option key={ingredient._id} value={ingredient._id}>
                                    {ingredient.title}
                                  </option>
                                );
                              })}
                            </select>
                            <p>{ingredientUsage.unit?.title}</p>
                          </li>
                        );
                      })}
                    </ol>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className="flex-1 divide-y divide-y-outline">
            <div className="pb-10">
              <h2 className="font-bold mb-2">Description</h2>
              <Ui.RichtextEditor value={description} onChange={setDescription} />
            </div>
            <div className="pt-6 pb-10">
              <h2 className="font-bold mb-2">Instructions</h2>
              {recipe.instructionGroups && (
                <ol>
                  {recipe.instructionGroups.map((instructionGroup, index) => (
                    <li key={index}>
                      <h3>{instructionGroup.title}</h3>
                      <ol>
                        {instructionGroup.instructions.map((instruction, index) => {
                          return (
                            <li key={index} className="flex">
                              {/* {instruction.content} */}
                            </li>
                          );
                        })}
                      </ol>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </Ui.Site.Container>
    </Ui.Site.Layout>
  );
};

export default RecipesShow;
