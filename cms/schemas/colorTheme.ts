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
      title: 'Text Color (default #000000)',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorAccent',
      title: 'Accent Color (default #000000)',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorSubdued',
      title: 'Subdued Color (default #5b5b5b)',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorOverlay',
      title: 'Overlay Color (default #ffffff)',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorBackground',
      title: 'Background Color (default #ffffff)',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorPanel',
      title: 'Panel Color (default #f2f2f2)',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorEmphasis',
      title: 'Emphasis Color (default #8d8d8d)',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colorOutline',
      title: 'Outline Color (default #d9d9d9)',
      type: 'color',
      validation: (Rule) => Rule.required(),
    },
  ],
});
