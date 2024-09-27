import { GlobalConfig } from 'payload/types';

export const MainNavigation: GlobalConfig = {
  slug: 'main-navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Navigation Items',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Navigation Item',
        plural: 'Navigation Items',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'radio',
          options: [
            {
              label: 'Single Link',
              value: 'link',
            },
            {
              label: 'Dropdown',
              value: 'dropdown',
            },
          ],
          defaultValue: 'link',
          required: true,
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'link',
          },
        },
        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'dropdown',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default MainNavigation;