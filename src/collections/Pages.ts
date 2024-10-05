import { CollectionConfig } from 'payload/types';
import { heroField, seoField, PreviewButton } from '../fields';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'livePreview',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: PreviewButton
        }
      }
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    heroField,
    seoField
  ],
};

export default Pages;