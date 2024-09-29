import { Field } from 'payload/types';

export const heroField: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subline',
      type: 'text',
    },
    {
      name: 'textPlacement',
      type: 'select',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Right', value: 'bottom-right' },
      ],
      defaultValue: 'center',
    },
    {
      name: 'scrim',
      type: 'checkbox',
      label: 'Add dark overlay',
    },
    {
      name: 'background',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'None (Text-only)', value: 'none' },
            { label: 'Image', value: 'image' },
            { label: 'Image Carousel', value: 'carousel' },
            { label: 'Video', value: 'video' },
          ],
          defaultValue: 'none',
        },
        {
          name: 'viewportHeight',
          type: 'select',
          options: [
            { label: 'Full Viewport', value: 'full' },
            { label: 'Partial Viewport', value: 'partial' },
          ],
          defaultValue: 'partial',
          admin: {
            condition: (data, siblingData) => siblingData?.type !== 'none',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'useParallax',
          type: 'checkbox',
          label: 'Enable parallax effect',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'image',
          },
        },
        {
          name: 'carousel',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'carousel',
          },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'video',
          },
        },
      ],
    },
  ],
};

export default heroField;