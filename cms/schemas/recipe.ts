import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

const Recipe = Sanity.defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon: Icons.Recipe,
  groups: [
    {
      name: 'intro',
      title: 'Intro',
      default: true,
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
    },
    {
      name: 'instructions',
      title: 'Instructions',
    },
    {
      name: 'equipment',
      title: 'Equipment',
    },
    {
      name: 'meta',
      title: 'Meta',
    },
  ],
  fieldsets: [
    {
      name: 'title',
      title: 'Title',
      options: {
        collapsible: false,
        columns: 2,
      },
    },
    {
      name: 'servings',
      title: 'Servings',
      options: {
        collapsible: false,
        columns: 2,
      },
    },
  ],
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
      fieldset: 'title',
      group: 'intro',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
      fieldset: 'title',
      group: 'intro',
    },

    {
      name: 'description',
      title: 'Description',
      type: 'richtextSimple',
      group: 'intro',
    },
    {
      name: 'featuredMedia',
      title: 'Featured Media',
      description:
        'This will be used as the recipe thumbnail, as well as displayed as the first piece of media in the intro media gallery',
      type: 'media',
      validation: (Rule) => Rule.required(),
      group: 'intro',
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
      group: 'intro',
    },
    {
      name: 'storyExcerpt',
      title: 'Story Excerpt',
      type: 'richtext',
      group: 'intro',
    },
    {
      name: 'storyMore',
      title: 'Story More',
      type: 'richtext',
      group: 'intro',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'meta',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'meta',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Category',
          to: [{ type: 'recipeCategory' }],
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'meta',
    },
    {
      name: 'cuisines',
      title: 'Cuisines',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Cuisine',
          to: [{ type: 'cuisine' }],
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'meta',
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
      group: 'meta',
    },
    {
      name: 'prepTimeMinutes',
      title: 'Prep Time (minutes)',
      type: 'number',
      group: 'meta',
    },
    {
      name: 'cookTimeMinutes',
      title: 'Cook Time (minutes)',
      type: 'number',
      group: 'meta',
    },
    {
      name: 'timing',
      title: 'Timing',
      type: 'text',
      rows: 2,
      group: 'meta',
    },
    {
      name: 'yieldServings',
      title: 'Yield (servings)',
      type: 'number',
      fieldset: 'servings',
      group: 'meta',
    },
    {
      name: 'servingDescription',
      title: 'Serving Description',
      description:
        'For example "Loaf" might be used to describe one serving. Use uppercase singular.',
      type: 'string',
      fieldset: 'servings',
      group: 'meta',
    },
    {
      name: 'equipmentUsages',
      title: 'Equipment Usages',
      type: 'array',
      of: [
        {
          name: 'equipmentUsage',
          title: 'Equipment Usage',
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
              validation: (Rule) => Rule.required(),
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
              name: 'equipmentTitleOverride',
              title: 'Equipment Title Override',
              type: 'string',
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
      group: 'equipment',
    },
    {
      name: 'ingredientUsageGroups',
      title: 'Ingredient Usage Groups',
      type: 'array',
      of: [
        {
          name: 'ingredientUsageGroup',
          title: 'Ingredient Usage Group',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'ingredientUsages',
              title: 'Ingredient Usages',
              type: 'array',
              validation: (Rule) => Rule.required(),
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'ingredientUsage' }],
                  /*
                  TODO: Filter these references by:
                  - Is referred to in instruction content
                  - Is not currently referred above
                  */
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
      group: 'ingredients',
    },
    {
      name: 'instructionGroups',
      title: 'Instruction Groups',
      type: 'array',
      of: [
        {
          name: 'instructionGroup',
          title: 'Instruction Group',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'instructions',
              title: 'Instructions',
              type: 'array',
              validation: (Rule) => Rule.required(),
              of: [
                {
                  name: 'instruction',
                  title: 'Instruction',
                  type: 'object',
                  preview: {
                    select: {
                      title: 'content',
                      subtitle: 'note',
                      media: 'media.0',
                    },
                  },
                  fields: [
                    {
                      name: 'content',
                      title: 'Content',
                      type: 'richtextRecipe',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'timerMinutes',
                      title: 'Timer (minutes)',
                      type: 'number',
                    },
                    {
                      name: 'note',
                      title: 'Note',
                      type: 'richtextSimple',
                    },
                    {
                      name: 'media',
                      title: 'Media',
                      type: 'array',
                      of: [{ type: 'media' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      group: 'instructions',
    },
  ],
});

export default Recipe;
