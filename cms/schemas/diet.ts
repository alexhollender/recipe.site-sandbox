import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'diet',
  title: 'Diet',
  type: 'document',
  icon: Icons.Diet,
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
    },
  ],
});
