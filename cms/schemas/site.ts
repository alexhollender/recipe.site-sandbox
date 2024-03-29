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
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'X', value: 'x' },
                  { title: 'YouTube', value: 'youtube' },
                  {
                    title: 'TikTok',
                    value: 'tiktok',
                  },
                  {
                    title: 'Discord',
                    value: 'discord',
                  },
                ],
              },
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
      name: 'aboutShort',
      title: 'About (short)',
      type: 'richtextSimple',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'about',
      title: 'About',
      type: 'richtext',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'linkList',
      title: 'Link List',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          validation: (Rule) => Rule.required(),
          of: [
            {
              name: 'link',
              type: 'object',
              preview: {
                select: {
                  label: 'label',
                  href: 'href',
                },
                prepare({ label, href }) {
                  return {
                    title: label,
                    subtitle: href,
                    media: Icons.Link,
                  };
                },
              },
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                  validation: (Rule) =>
                    Rule.uri({ allowRelative: false, scheme: ['http', 'https', 'mailto'] }),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
