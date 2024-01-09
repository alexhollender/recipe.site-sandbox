import * as Components from '../lib/components';
import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'ingredientUsage',
  title: 'Ingredient Usage',
  type: 'document',
  icon: Icons.Ingredient,
  fieldsets: [
    {
      name: 'quantities',
      title: 'Quantities',
      options: {
        collapsible: false,
        columns: 2,
      },
    },
  ],
  preview: {
    select: {
      ingredientTitle: 'ingredient.title',
      quantityMin: 'quantityMin',
      quantityMax: 'quantityMax',
      unit: 'unit.title',
      preparation: 'preparation.title',
    },
    prepare: ({ ingredientTitle, quantityMin, quantityMax, unit, preparation }) => {
      const quantity = quantityMax ? `${quantityMin}—${quantityMax}` : quantityMin || null;
      const subtitle = [preparation, quantity, unit].filter((item) => !!item).join(' ');

      return {
        title: ingredientTitle,
        subtitle,
      };
    },
  },
  fields: [
    {
      name: 'ingredient',
      type: 'reference',
      to: [{ type: 'ingredient' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ingredientTitleOverride',
      title: 'Ingredient Title Override',
      type: 'string',
    },
    {
      name: 'quantityMin',
      title: 'Quantity (default or min)',
      description: 'Default quantity and used as minimum in a range if Max Quantity is provided',
      type: 'number',
      fieldset: 'quantities',
      initialValue: 1,
    },
    {
      name: 'quantityMax',
      title: 'Quantity (max)',
      type: 'number',
      validation: (Rule) =>
        Rule.custom((quantityMax, context) => {
          if (!!quantityMax && !context?.document?.quantityMin)
            return 'A min quantity must be provided to define a range';
          return true;
        }),
      fieldset: 'quantities',
    },
    {
      name: 'unit',
      title: 'Unit',
      type: 'reference',
      to: [{ type: 'unit' }],
    },
    {
      name: 'preparation',
      title: 'Preparation',
      type: 'reference',
      to: [{ type: 'preparation' }],
    },
    {
      name: 'preperationModifier',
      title: 'Preperation Modifier',
      type: 'text',
      rows: 1,
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
    },
    {
      name: 'note',
      title: 'Note',
      type: 'richtextSimple',
    },
    // {
    //   name: 'ingredientTitle',
    //   title: 'Ingredient Title',
    //   description: 'For internal search purposes',
    //   type: 'string',
    //   components: {
    //     input: Components.ProxyStringInput,
    //   },
    //   options: {
    //     field: 'ingredient',
    //   },
    // },
  ],
});
