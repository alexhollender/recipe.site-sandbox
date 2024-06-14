import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  icon: Icons.Site,
  groups: [
    {
      name: 'basic',
      title: 'Basic',
      default: true,
    },
    {
      name: 'recipesAndCollections',
      title: 'Recipes & Collections',
    },
    {
      name: 'products',
      title: 'Products',
    },
    {
      name: 'linkList',
      title: 'Link list',
    },
    {
      name: 'about',
      title: 'About',
    },
    {
      name: 'theme',
      title: 'Theme',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
  // Basic
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
      group: 'basic',
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      validation: (Rule) => Rule.required(),
      group: 'basic',
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
      name: 'socialMediaLinks',
      title: 'Social Media Links',
      group: 'basic',
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
                  { title: 'Discord', value: 'discord' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Substack', value: 'substack' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'X', value: 'x' },
                  { title: 'YouTube', value: 'youtube' },
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
      name: 'customHeaderLinks',
      title: 'Custom Header Links',
      group: 'basic',
      type: 'array',
      of: [
        {
          name: 'headerLink',
          type: 'object',
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
            {
              name: 'openInNewTab',
              title: 'Open link in new new?',
              type: 'boolean',
            },
          ],
        },
      ],
    },
    {
      name: 'defaultMeasurementSystem',
      title: 'Default Measurement System',
      group: 'basic',
      type: 'string',
      initialValue: 'imperial',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Imperial', value: 'imperial' },
          { title: 'Metric', value: 'metric' },
        ],
      },
    },
    {
      name: 'defaultTemperatureSystem',
      title: 'Default Temperature System',
      group: 'basic',
      type: 'string',
      initialValue: 'fahrenheit',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Fahrenheit', value: 'fahrenheit' },
          { title: 'Celsius', value: 'celsius' },
        ],
      },
    },
    {
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      group: 'basic',
    },
    // Recipes & Collections
    {
      name: 'featuredRecipes',
      title: 'Featured Recipes',
      group: 'recipesAndCollections',
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
      group: 'recipesAndCollections',
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
      name: 'recipes',
      title: 'Recipes',
      group: 'recipesAndCollections',
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
    // Products
    {
      name: 'productLinks',
      title: 'Product Links',
      type: 'array',
      group: 'products',
      of: [
        {
          name: 'productLink',
          type: 'object',
          preview: {
            select: {
              title: 'productTitle',
              subtitle: 'href',
              media: 'productImage.image.asset',
            },
          },
          fields: [
            {
              name: 'productTitle',
              title: 'Product Title',
              type: 'richtextSimple',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'productImage',
              title: 'Product Image',
              type: 'image',
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
    // Link list
    {
      name: 'linkList',
      title: 'Link List',
      group: 'linkList',
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
    // About
    {
      name: 'aboutShort',
      title: 'About (short)',
      type: 'richtextSimple',
      validation: (Rule) => Rule.required(),
      group: 'about',
    },
    {
      name: 'aboutHeading',
      title: 'About Heading',
      type: 'richtextSimple',
      description: 'The heading for the about section. Defaults to "About".',
      group: 'about',
    },
    {
      name: 'about',
      title: 'About',
      type: 'richtext',
      group: 'about',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      group: 'about',
    },
    // Theme
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'theme',
    },
    {
      name: 'colorTheme',
      title: 'Color Theme',
      group: 'theme',
      type: 'reference',
      to: [
        {
          type: 'colorTheme',
        },
      ],
    },
    {
      name: 'typeTheme',
      title: 'Type Theme',
      group: 'theme',
      type: 'reference',
      to: [
        {
          type: 'typeTheme',
        },
      ],
    },
    {
      name: 'cssOverrides',
      title: 'CSS Overrides',
      type: 'text',
      rows: 4,
      group: 'theme',
    },
    {
      title: 'Hide sidebar bio on Recipe page?',
      name: 'hideSidebarBio',
      type: 'boolean',
      group: 'theme',
    },
  ],
});
