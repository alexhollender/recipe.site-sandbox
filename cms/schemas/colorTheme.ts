import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'colorTheme',
  title: 'Color Theme',
  type: 'document',
  icon: Icons.ColorTheme,
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
      name: 'colorText',
      title: 'Text Color',
      type: 'color',
      initialValue: { hex: '#000000' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorAccent',
      title: 'Accent Color',
      type: 'color',
      initialValue: { hex: '#000000' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorSubdued',
      title: 'Subdued Color',
      type: 'color',
      initialValue: { hex: '#5b5b5b' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorOverlay',
      title: 'Overlay Color',
      type: 'color',
      initialValue: { hex: '#ffffff' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorBackground',
      title: 'Background Color',
      type: 'color',
      initialValue: { hex: '#ffffff' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorPanel',
      title: 'Panel Color',
      type: 'color',
      initialValue: { hex: '#f2f2f2' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorEmphasis',
      title: 'Emphasis Color',
      type: 'color',
      initialValue: { hex: '#8d8d8d' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorOutline',
      title: 'Outline Color',
      type: 'color',
      initialValue: { hex: '#d9d9d9' },
      validation: (Rule) => Rule.required(),
    },
  ],
});
