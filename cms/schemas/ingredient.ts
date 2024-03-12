import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  icon: Icons.Ingredient,
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'featuredImage',
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
      name: 'alternateTitles',
      title: 'Alternate Titles',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richtextSimple',
    },
    {
      name: 'ingredientType',
      title: 'Ingredient Type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Solid',
            value: 'solid',
          },
          {
            title: 'Liquid (water-like)',
            value: 'liquid',
          },
        ],
      },
      initialValue: 'solid',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gramsPerCup',
      title: 'Grams Per Cup (g/cup)',
      description:
        'Mostly for solid ingredients. To convert between volume and weight measurements.',
      type: 'number',
      hidden: ({ parent }) => parent?.ingredientType !== 'solid',
      validation: (Rule) =>
        Rule.custom((gramsPerCup, context) => {
          const parent = context.parent as any;
          if (!gramsPerCup && parent?.ingredientType === 'solid') {
            return 'Grams Per Cup is required for solid ingredients';
          }
          return true;
        }),
    },
  ],
});
