import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  icon: Icons.Site,
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
      name: 'authors',
      title: 'Authors',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'author',
            },
          ],
        },
      ],
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
              title: 'Recipe',
              type: 'recipe',
            },
          ],
        },
      ],
    },
  ],
});
