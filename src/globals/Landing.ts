import { GlobalConfig } from 'payload/types';
import { heroField } from '../fields/heroField';
import { seoField } from '../fields/seo';

export const Landing: GlobalConfig = {
  slug: 'landing-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    heroField,
    seoField
  ],
  admin: {
    group: 'Content',
  },
};

export default Landing;