import * as React from 'react';
import * as RecipeUtils from '@/lib/recipe';
import * as Types from '@/lib/types';
import * as Ui from '@/ui';
import * as Utils from '@/lib/utils';

import Link from 'next/link';

type RecipeCardProps = {
  recipe: Types.RecipePreview;
};

export const Recipe: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const onMouseOver = () => setIsHovered(true);
  const onMouseOut = () => setIsHovered(false);

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group">
      {recipe.featuredMedia.image && (
        <div
          className="aspect-sd relative rounded-xl overflow-hidden"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          <Ui.Media.Image
            image={recipe.featuredMedia.image}
            alt={recipe.title}
            fill
            className={Utils.cx([
              'object-cover transition-all z-10 hover:scale-[1.02] duration-300',
              {
                'md:group-hover:opacity-0': !!recipe.featuredMedia.video,
              },
            ])}
          />
          {recipe.featuredMedia.video && (
            <Ui.Media.HoverAutoplayVideo
              video={recipe.featuredMedia.video}
              isHovered={isHovered}
              className="object-cover absolute inset-0 hidden md:block z-0"
            />
          )}
        </div>
      )}
      <div className="mt-2">
        <div>
          <Ui.Text.Title bold>{recipe.title}</Ui.Text.Title>
        </div>
        <div className="mt-1">
          <Ui.Text.Highlight>{`${recipe.ingredientUsageCount} ingredients • ${RecipeUtils.totalTimeFormatted(recipe)}`}</Ui.Text.Highlight>
        </div>
      </div>
    </Link>
  );
};
