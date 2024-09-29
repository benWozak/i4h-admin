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
      required: false,
    },
    {
      name: 'brandColors',
      type: 'group',
      fields: [
        {
          name: 'primary',
          type: 'text',
          required: false,
          admin: {
            components: {
              Field: ColorPicker,
            },
          },
        },
        {
          name: 'secondary',
          type: 'text',
          required: false,
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
          required: false,
        },
        {
          name: 'instagram',
          type: 'text',
          required: false,
        },
        {
          name: 'twitter',
          type: 'text',
          required: false,
        },
        {
          name: 'linkedin',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
};

export default Brand;