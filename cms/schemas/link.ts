import * as Icons from '../lib/icons';
import * as Sanity from 'sanity';

export default Sanity.defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: Icons.Link,
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'URL',
      validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
    },
    {
      name: 'openInNewTab',
      title: 'Open in new tab',
      description: "By default, internal links won't open a new tab, whereas external links will",
      type: 'boolean',
    },
  ],
});
