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
      name: 'weightToVolumeConversion',
      title: 'Weight to Volume Conversion',
      type: 'object',
      fields: [
        {
          name: 'weightGrams',
          title: 'Weight (grams)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'volumeCups',
          title: 'Volume (cups)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
});
