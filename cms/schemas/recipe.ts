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
      name: 'notes',
      title: 'Notes',
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
      slug: 'slug.current',
      legacyRecipeData: 'legacyRecipeData',
    },
    prepare: ({ title, slug, legacyRecipeData }) => {
      if (legacyRecipeData) return { title, subtitle: `[LEGACY] ${slug}` };
      return { title, subtitle: slug };
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
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{ type: 'site' }],
      // validation: (Rule) => Rule.required(),
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
      name: 'diets',
      title: 'Diets',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Diet',
          to: [{ type: 'diet' }],
        },
      ],
      group: 'meta',
    },
    {
      name: 'meals',
      title: 'Meals',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Meal',
          to: [{ type: 'meal' }],
        },
      ],
      group: 'meta',
    },
    {
      name: 'methods',
      title: 'Methods',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Method',
          to: [{ type: 'method' }],
        },
      ],
      group: 'meta',
    },
    {
      name: 'prepTimeMinutes',
      title: 'Prep Time (minutes)',
      type: 'number',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cookTimeMinutes',
      title: 'Cook Time (minutes)',
      type: 'number',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'timing',
      title: 'Timing',
      type: 'text',
      rows: 2,
      group: 'meta',
    },
    {
      name: 'totalTimeMinutes',
      title: 'Total Time (minutes)',
      description: 'If not provided, this will be calculated from Prep Time + Cook Time.',
      type: 'number',
      group: 'meta',
    },
    {
      name: 'yieldServings',
      title: 'Yield (servings)',
      type: 'number',
      fieldset: 'servings',
      group: 'meta',
      validation: (Rule) => Rule.required(),
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
      name: 'difficultyLevel',
      title: 'Difficulty Level',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Medium', value: 'medium' },
          { title: 'Hard', value: 'hard' },
        ],
      },
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
                  options: {
                    filter: async ({ document, getClient }) => {
                      const client = getClient({ apiVersion: '2023-12-30' });

                      const ingredientUsageIdsInInstructionsQuery = client.fetch<string[]>(
                        `*[_type == 'recipe' && _id == $recipeId][0]
                        .instructionGroups[]
                        .instructions[]
                        .content[]
                        .markDefs[_type == 'ingredientUsageReference']
                        .ingredientUsage
                        ._ref
                       `,
                        {
                          recipeId: document._id,
                        },
                      );

                      const ingredientUsageIdsQuery = client.fetch<string[]>(
                        `*[_type == 'recipe' && _id == $recipeId][0]
                        .ingredientUsageGroups[]
                        .ingredientUsages[]
                        ._ref`,
                        {
                          recipeId: document._id,
                        },
                      );

                      const [ingredientUsageIdsInInstructions, ingredientUsageIds] =
                        await Promise.all([
                          ingredientUsageIdsInInstructionsQuery,
                          ingredientUsageIdsQuery,
                        ]);

                      return {
                        filter:
                          '(_id in $ingredientUsageIdsInInstructions) && !(_id in $ingredientUsageIds)',
                        params: { ingredientUsageIds, ingredientUsageIdsInInstructions },
                      };
                    },
                  },
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
    {
      name: 'note',
      title: 'Note',
      type: 'richtext',
      group: 'notes',
    },
    {
      name: 'legacyRecipeData',
      title: 'Legacy Recipe Data',
      type: 'object',
      readOnly: true,
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'content',
          title: 'Content',
          type: 'string',
        },
      ],
    },
  ],
});

export default Recipe;
