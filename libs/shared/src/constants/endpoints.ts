export const API_ENDPOINTS = {
  EXAMPLE: {
    CREATE_EXAMPLE: '/',
    GET_EXAMPLES: '/',
    EDIT_EXAMPLE: '/:id',
  },
  AUTHENTICATION: {
    SIGNUP: 'signup',
  },
  ORGANIZATION: {
    CREATE_ORGANIZATION: 'create',
    UPDATE_ORGANIZATION: 'update',
    GET_ORGANIZATION: 'get',
  },
  ORGANIZATION_COMPANY_ACCOUNT: {
    CREATE_ORGANIZATION_COMPANY_ACCOUNT: 'create',
    GET_ORGANIZATION_COMPANY_ACCOUNTS: 'get-accounts/:organization_id',
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
