import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export const Font = Sanity.defineType({
  name: 'font',
  title: 'Font',
  type: 'object',
  fields: [
    {
      name: 'family',
      title: 'Family',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          // Display
          { title: 'Ivy Presto Display', value: 'ivypresto-display' },
          { title: 'Moret', value: 'moret' },
          { title: 'Graphik', value: 'graphik' },
          { title: 'Roboto Mono', value: 'roboto-mono' },
          // Narrative
          { title: 'Ivy Presto Text', value: 'ivypresto-text' },
          // Interface
          { title: 'Helvetica', value: 'helvetica' },
          { title: 'Franklin Gothic', value: 'franklin-gothic' },
          { title: 'Inter', value: 'inter' },
        ],
      },
    },
    {
      name: 'weights',
      title: 'Weights',
      type: 'object',
      fields: [
        {
          name: 'normal',
          title: 'Normal',
          type: 'number',
          options: {
            list: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'bold',
          title: 'Bold',
          type: 'number',
          options: {
            list: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
});

export default Sanity.defineType({
  name: 'typeTheme',
  title: 'Type Theme',
  type: 'document',
  icon: Icons.TypeTheme,
  preview: {
    select: {
      title: 'title',
    },
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: "This is used for internal reference and won't be displayed on the site.",
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'displayFont',
      title: 'Display Font',
      type: 'font',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'interfaceFont',
      title: 'Interface Font',
      type: 'font',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'narrativeFont',
      title: 'Narrative Font',
      type: 'font',
      validation: (Rule) => Rule.required(),
    },
  ],
});
