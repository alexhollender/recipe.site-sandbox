import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  icon: Icons.Media,
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
  fieldsets: [
    {
      name: 'media',
      title: 'Media',
      options: {
        collapsible: false,
        columns: 2,
      },
    },
    {
      name: 'description',
      title: 'Description',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields?.image && !fields?.video) return 'You must have an Image or Video present.';
      return true;
    }),
  description:
    'If both Image and Video are present, the image will be used as a poster image for the video, before it is played.',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      fieldset: 'media',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      fieldset: 'media',
    },
    {
      name: 'alternateText',
      title: 'Alt Text',
      description:
        "This is used for non-visual users in the alt-text attribute. We'll fallback to the image description if one is not defined here.",
      type: 'text',
      rows: 1,
      fieldset: 'description',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 1,
      fieldset: 'description',
    },
  ],
});
