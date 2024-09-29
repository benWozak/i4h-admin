import { GlobalConfig } from 'payload/types';
import ColorPicker from '../fields/ColorPickerField';

export const Brand: GlobalConfig = {
  slug: 'brand',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'brandColors',
      type: 'group',
      fields: [
        {
          name: 'primary',
          type: 'text',
          required: true,
          admin: {
            components: {
              Field: ColorPicker,
            },
          },
        },
        {
          name: 'secondary',
          type: 'text',
          required: true,
          admin: {
            components: {
              Field: ColorPicker,
            },
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          required: true,
        },
        {
          name: 'instagram',
          type: 'text',
          required: true,
        },
        {
          name: 'twitter',
          type: 'text',
          required: true,
        },
        {
          name: 'linkedin',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};

export default Brand;