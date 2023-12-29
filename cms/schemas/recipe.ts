import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

const Recipe = Sanity.defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon: Icons.Recipe,
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'recipeCategories',
      title: 'Recipe Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Recipe Category',
          to: [{ type: 'recipeCategory' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'recipeCuisine',
      title: 'Recipe Cuisines',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Recipe Cuisine',
          to: [{ type: 'recipeCuisine' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Tag',
          to: [{ type: 'tag' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richtextSimple',
    },
    {
      name: 'featuredMedia',
      title: 'Featured Media',
      description:
        'This will be used as the recipe thumbnail, as well as displayed as the first piece of media in the intro media gallery',
      type: 'media',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'media',
      title: 'Media',
      description: 'This is used in the intro section.',
      type: 'array',
      of: [
        {
          type: 'media',
        },
      ],
    },
    {
      name: 'prepTimeMinutes',
      title: 'Prep Time (minutes)',
      type: 'number',
    },
    {
      name: 'cookTimeMinutes',
      title: 'Cook Time (minutes)',
      type: 'number',
    },
    {
      name: 'timing',
      title: 'Timing',
      type: 'text',
      rows: 2,
    },
    {
      name: 'yield',
      title: 'Yield',
      type: 'object',
      fields: [
        {
          name: 'quantity',
          title: 'Quantity',
          type: 'number',
        },
        {
          name: 'unit',
          title: 'Unit',
          type: 'reference',
          to: [{ type: 'yieldUnit' }],
        },
      ],
    },
    {
      name: 'equipment',
      title: 'Equipment',
      type: 'array',
      of: [
        {
          name: 'equipment',
          title: 'Equipment',
          type: 'object',
          preview: {
            select: {
              title: 'equipment.title',
              subtitle: 'note',
              media: 'equipment.featuredImage',
            },
          },
          fields: [
            {
              name: 'equipment',
              title: 'Equipment',
              type: 'reference',
              to: [{ type: 'equipment' }],
            },
            {
              name: 'note',
              title: 'Note',
              type: 'string',
            },
            {
              name: 'imageOverride',
              title: 'Image Override',
              type: 'image',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
            },
          ],
        },
      ],
    },
    {
      name: 'ingredientApplicationGroups',
      title: 'Ingredient Application Groups',
      type: 'array',
      of: [
        {
          name: 'ingredientApplicationGroup',
          title: 'Ingredient Application Group',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'ingredients',
              title: 'Ingredients',
              type: 'array',
              of: [
                {
                  name: 'ingredientApplication',
                  title: 'Ingredient Application',
                  type: 'object',
                  preview: {
                    select: {
                      ingredientTitle: 'ingredient.title',
                      quantity: 'quantity',
                      unit: 'unit.title',
                      preparation: 'preparation.title',
                    },
                    prepare: ({ ingredientTitle, quantity, unit, preparation }) => {
                      const subtitle = [preparation, quantity, unit]
                        .filter((item) => !!item)
                        .join(' ');

                      return {
                        title: ingredientTitle,
                        subtitle,
                      };
                    },
                  },
                  fields: [
                    {
                      name: 'ingredient',
                      type: 'reference',
                      to: [{ type: 'ingredient' }],
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'quantity',
                      title: 'Quantity',
                      type: 'number',
                    },
                    {
                      name: 'unit',
                      title: 'Unit',
                      type: 'reference',
                      to: [{ type: 'ingredientUnit' }],
                    },
                    {
                      name: 'preparation',
                      title: 'Preparation',
                      type: 'reference',
                      to: [{ type: 'preparation' }],
                    },
                    {
                      name: 'note',
                      title: 'Note',
                      type: 'richtextSimple',
                    },
                  ],
                },
              ],
            },
            {
              name: 'note',
              title: 'Note',
              type: 'richtextSimple',
            },
          ],
        },
      ],
    },
    {
      name: 'storeExcerpt',
      title: 'Story Excerpt',
      type: 'richtext',
    },
    {
      name: 'storeMore',
      title: 'Story More',
      type: 'richtext',
    },
  ],
});

export default Recipe;
