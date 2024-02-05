import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: Icons.Collection,
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'featuredMedia.image',
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
      name: 'recipes',
      title: 'Recipes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'recipe',
              title: 'Recipe',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richtextSimple',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuredMedia',
      title: 'Featured Media',
      type: 'media',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
  ],
});
