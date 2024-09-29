import { Field } from 'payload/types';

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      // required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      // required: false,
    },
    {
      name: 'keywords',
      type: 'array',
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
      ],
    },
    {
      name: 'image',
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'width',
          type: 'number',
          required: false,
        },
        {
          name: 'height',
          type: 'number',
          required: false,
        },
        {
          name: 'alt',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: false,
    },
  ],
};