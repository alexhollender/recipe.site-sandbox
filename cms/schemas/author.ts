import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: Icons.Author,
  preview: {
    select: {
      name: 'name',
      slug: 'slug.current',
      avatar: 'avatar',
    },
    prepare({ name, slug, avatar }) {
      return {
        title: name,
        subtitle: slug,
        media: avatar,
      };
    },
  },
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      // validation: (Rule) => Rule.required(),
    },
  ],
});
