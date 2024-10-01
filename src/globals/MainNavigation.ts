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
            {
              name: 'isPrimary',
              type: 'checkbox',
              label: 'Set as Primary Link',
              defaultValue: false,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Short Description',
              validate: (value, { siblingData }) => {
                if (!value) return true; // Allow empty description
                const wordCount = value.trim().split(/\s+/).length;
                const maxWords = siblingData.isPrimary ? 150 : 60;
                if (wordCount > maxWords) {
                  return `Description must not exceed ${maxWords} words`;
                }
                return true;
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data.items) {
          data.items.forEach(item => {
            if (item.type === 'dropdown' && item.dropdownItems) {
              let primaryCount = 0;
              item.dropdownItems.forEach(dropdownItem => {
                if (dropdownItem.isPrimary) {
                  primaryCount++;
                }
              });
              if (primaryCount > 1) {
                throw new Error('Only one primary link is allowed per dropdown.');
              }
            }
          });
        }
        return data;
      },
    ],
  },
};

export default MainNavigation;