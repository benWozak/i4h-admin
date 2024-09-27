import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      if (user && user.role === 'admin') return true;
      return {
        id: {
          equals: user.id,
        },
      };
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
      defaultValue: 'editor',
    },
  ],
};

export default Users
