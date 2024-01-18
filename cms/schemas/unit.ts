import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'unit',
  title: 'Units',
  type: 'document',
  icon: Icons.Unit,
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      abbreviation: 'abbreviation',
    },
    prepare: ({ title, slug, abbreviation }) => {
      const subtitle = abbreviation || slug;
      return { title, subtitle };
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
      name: 'abbreviation',
      title: 'Abbreviation',
      type: 'string',
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
      name: 'pluralTitle',
      title: 'Plural Title',
      type: 'string',
    },
    {
      name: 'conversions',
      title: 'Conversions',
      type: 'array',
      of: [
        {
          name: 'conversion',
          title: 'Conversion',
          type: 'object',
          preview: {
            select: {
              quantity: 'quantity',
              unitTitle: 'unit.title',
            },
            prepare: ({ quantity, unitTitle }) => {
              return { title: `${quantity} ${unitTitle}`, media: Icons.Unit };
            },
          },
          fields: [
            {
              name: 'quantity',
              title: 'Quantity',
              description: 'How many units of the other unit, per one of this unit',
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
  ],
});
