import { CollectionConfig } from 'payload/types';
import { heroField } from '../fields/heroField';
import { seoField } from '../fields/seo';

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