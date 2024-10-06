import { GlobalConfig } from 'payload/types';
import { heroField } from '../fields/heroField';
import { seoField } from '../fields/seo';
import { PreviewButton } from '../fields/PreviewButton';

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
    seoField,
    {
      name: 'livePreview',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: PreviewButton
        }
      }
    }
  ],
  admin: {
    group: 'Content',
  },
};

export default Landing;