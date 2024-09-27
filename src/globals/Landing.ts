import { GlobalConfig } from 'payload/types';

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
    // Add more fields as needed
  ],
};

export default Landing;