export const API_ENDPOINTS = {
  EXAMPLE: {
    CREATE_EXAMPLE: '/',
    GET_EXAMPLES: '/',
    EDIT_EXAMPLE: '/:id',
  },
  AUTHENTICATION: {
    SIGNUP: 'signup',
  },
  SUPER_ADMIN: {
    ADD_USER: 'add-user',
    USER_LIST: 'user-list',
    USER_PROFILE: 'user-profile/:userId',
    UPDATE_PROFILE: 'update-profile/:userId',
    ADD_ACCOUNTS: 'add-accounts',
    ACCOUNTS_LIST: 'accounts-list',
  },

  JOBS: {
    GET_JOB: '/:id',
    UPDATE_JOB: '/:id',
    DELETE_JOB: '/:id',
  },
  PRODUCTS: {
    ADD_PRODUCT: '/',
    GET_PRODUCTS: '/',
    EDIT_PRODUCT: '/:id',
  },

  AIR_SERVICES: {
    TICKETS: {
      ticket: 'ticket',
    },
    ASSETS: {
      INVENTORY: 'inventory',
    },
    TASK: {
      ADD_TASK: 'add-task',
    },
  },
};
