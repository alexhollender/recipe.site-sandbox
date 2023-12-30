import * as Sanity from 'sanity';
import * as Icons from '../lib/icons';

const RichtextBaseBlock = {
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'H1', value: 'h1' },
    { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' },
  ],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
    ],
    annotations: [
      {
        name: 'link',
        title: 'Link',
        type: 'object',
        fields: [
          {
            name: 'href',
            type: 'url',
            title: 'URL',
            validation: (Rule: Sanity.Rule) =>
              Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
          },
        ],
      },
    ],
  },
};

const Richtext = Sanity.defineType({
  name: 'richtext',
  title: 'Rich Text',
  type: 'array',
  of: [RichtextBaseBlock],
});

export default Richtext;

export const RichtextRecipe = Sanity.defineType({
  name: 'richtextRecipe',
  title: 'Rich Text (recipe)',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: RichtextBaseBlock.styles,
      marks: {
        decorators: RichtextBaseBlock.marks.decorators,
        annotations: [
          ...RichtextBaseBlock.marks.annotations,
          {
            name: 'ingredientUsageReference',
            title: 'Ingredient Usage Reference',
            type: 'reference',
            to: [{ type: 'ingredientUsage' }],
            icon: Icons.Ingredient,
            // options: {
            //   filter: async ({ document, getClient }) => {
            //     const client = getClient({ apiVersion: '2023-12-30' });

            //     /*
            //     TODO: Fix why we need the last [0]. Something is wrong there.
            //     */
            //     const ingredientUsageIds = await client.fetch(
            //       `*[_type == 'recipe' && _id == $recipeId][0] {
            //         "ingredientUsageGroups": ingredientUsageGroups[] {
            //           "ingredientUsages": ingredientUsages[] -> { _id }._id
            //         }.ingredientUsages
            //       }.ingredientUsageGroups`,
            //       {
            //         recipeId: document._id,
            //       },
            //     );

            //     return {
            //       filter: '_id in $ingredientUsageIds',
            //       params: { ingredientUsageIds: ingredientUsageIds },
            //     };
            //   },
            // },
          },
          {
            name: 'measurement',
            title: 'Measurement',
            type: 'object',
            icon: Icons.Unit,
            fields: [
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
                validation: (Rule) => Rule.required(),
              },
              {
                name: 'unit',
                title: 'Unit',
                type: 'reference',
                to: [{ type: 'unit' }],
                validation: (Rule) => Rule.required(),
              },
            ],
          },
        ],
      },
    },
  ],
});

export const RichtextSimple = Sanity.defineType({
  name: 'richtextSimple',
  title: 'Rich Text (simple)',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
      },
    },
  ],
});
