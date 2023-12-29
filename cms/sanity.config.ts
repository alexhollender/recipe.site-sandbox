import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'

import Structure from './lib/structure'

export default defineConfig({
  name: 'default',
  title: 'Recipe.Site',

  projectId: 'r6z49mh7',
  dataset: 'production',

  plugins: [deskTool({structure: Structure}), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
