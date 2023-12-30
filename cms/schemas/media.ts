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
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
    },
  ],
});
