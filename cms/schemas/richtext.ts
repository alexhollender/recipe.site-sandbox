import * as Sanity from 'sanity'

export default Sanity.defineType({
  name: 'richtext',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto']}),
              },
            ],
          },
        ],
      },
    },
  ],
})

export const RichtextSimple = Sanity.defineType({
  name: 'richtextSimple',
  title: 'Rich Text (simple)',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
      },
    },
  ],
})
