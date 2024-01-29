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
    {
      name: 'featuredRecipes',
      title: 'Featured Recipes',
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
          options: {
            filter: async ({ document, getClient }) => {
              const client = getClient({ apiVersion: '2023-12-30' });

              const recipeIds = await client.fetch(
                `*[_type == 'site' && _id == $siteId][0].recipes[]->._id`,
                {
                  siteId: document._id,
                },
              );

              return {
                filter: '_id in $recipeIds',
                params: { recipeIds },
              };
            },
          },
        },
      ],
    },
    {
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'collection',
              title: 'Collection',
            },
          ],
        },
      ],
    },
    {
      name: 'socialMediaLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          name: 'socialMediaLink',
          title: 'Social Media Link',
          type: 'object',
          fields: [
            {
              name: 'plaform',
              title: 'Platform',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
});
