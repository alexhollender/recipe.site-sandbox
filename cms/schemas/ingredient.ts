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
        list: ['solid', 'liquid'],
      },
      initialValue: 'solid',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gramsPerCup',
      title: 'Grams Per Cup (g/cup)',
      description: 'Mostly for dry ingredients. To convert between volume and weight measurements.',
      type: 'number',
    },
    {
      name: 'mlPerCup',
      title: 'Millileters Per Cup (ml/cup)',
      description: 'Mostly for wet ingredients. To convert between volume and weight measurements.',
      type: 'number',
    },
  ],
});
