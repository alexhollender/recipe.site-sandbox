import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'meal',
  title: 'Meal',
  type: 'document',
  icon: Icons.Meal,
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
