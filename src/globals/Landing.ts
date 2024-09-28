import { GlobalConfig } from 'payload/types';
import { heroField } from '../fields/heroField';

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
  ],
  admin: {
    group: 'Content',
  },
};

export default Landing;