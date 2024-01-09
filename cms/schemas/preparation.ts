import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'preparation',
  title: 'Preparation',
  type: 'document',
  icon: Icons.Preparation,
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'featuredImage',
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
      name: 'pastTense',
      title: 'Past Tense',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
    },
  ],
});
