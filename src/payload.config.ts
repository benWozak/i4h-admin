import path from 'path'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Landing from './globals/Landing'
import MainNavigation from './globals/MainNavigation'
import Brand from './globals/Brand'
import Users from './collections/Users'
import Pages from './collections/Pages'
import Media from './collections/Media'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            '@': path.resolve(__dirname, 'src'),
          },
        },
      }
    },
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:5555',
  editor: slateEditor({}),
  collections: [
    Users,
    Pages,
    Media,
  ],
  globals: [
    Landing,
    MainNavigation,
    Brand
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})