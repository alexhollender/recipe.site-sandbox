'use client';

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

  const collection = recipe.collections[0];

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
      <div className="mt-2 RecipeCardContent">
        <div className="text-accent">
          <Ui.Text.Title bold>{recipe.title}</Ui.Text.Title>
        </div>
        <div className="mt-1 text-subdued flex flex-wrap gap-x-3 gap-y-1 items-center">
          <Ui.Text.Highlight>{`${recipe.ingredientUsageCount} ingredients • ${RecipeUtils.totalTimeFormatted(recipe)}`}</Ui.Text.Highlight>
          {/* {collection && <Ui.Chips.Primary>{collection.title}</Ui.Chips.Primary>} */}
        </div>
      </div>
    </Link>
  );
};

type CollectionCardProps = {
  collection: Types.CollectionPreview;
};

export const Collection: React.FC<CollectionCardProps> = ({ collection }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const onMouseOver = () => setIsHovered(true);
  const onMouseOut = () => setIsHovered(false);

  return (
    <Link href={`/collections/${collection.slug}`} className="group">
      <div
        className="aspect-square relative rounded-xl overflow-hidden"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {collection.featuredMedia.image && (
          <Ui.Media.Image
            image={collection.featuredMedia.image}
            alt={collection.title}
            fill
            className={Utils.cx([
              'object-cover transition-all z-10 hover:scale-[1.02] duration-300',
              {
                'md:group-hover:opacity-0': !!collection.featuredMedia.video,
              },
            ])}
          />
        )}
        {collection.featuredMedia.video && (
          <Ui.Media.HoverAutoplayVideo
            video={collection.featuredMedia.video}
            isHovered={isHovered}
            className="object-cover absolute inset-0 hidden md:block z-0"
          />
        )}
        <div className="absolute inset-0 z-10 bg-black opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20 text-secondary pointer-events-none">
          <Ui.Text.Lead className="px-6 text-shadow text-center text-white">
            {collection.title}
          </Ui.Text.Lead>
        </div>
      </div>
    </Link>
  );
};

type ProductLinkCardProps = {
  productLink: Types.ProductLink;
};

export const ProductLink: React.FC<ProductLinkCardProps> = ({ productLink }) => {
  return (
    <Link href={productLink.href} className="group" target="_blank">
      <div className="aspect-portrait relative overflow-hidden rounded-xl">
        <Ui.Media.Image
          image={productLink.productImage}
          alt={productLink.productTitlePlaintext}
          fill
          className="object-cover transition-all z-10 hover:scale-[1.02] duration-300"
        />
      </div>
      <div className="mt-3 text-text">
        <Ui.Text.Highlight bold>
          <Ui.Richtext.Inherited content={productLink.productTitle} />
        </Ui.Text.Highlight>
      </div>
    </Link>
  );
};
