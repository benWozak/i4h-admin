import { CollectionConfig } from 'payload/types';
import { heroField, seoField, PreviewButton } from '../fields';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'name',
  },
  versions: {
    drafts: true,
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
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            width: '50%',
            description: 'This field will auto-generate based on the Name field.',
            readOnly: true,
          },
          hooks: {
            beforeValidate: [
              ({ data }) => {
                if (data.name) {
                  return data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                }
                return data.slug;
              },
            ],
          },
        },
      ],
    },
    heroField,
    seoField
  ],
};

export default Pages;