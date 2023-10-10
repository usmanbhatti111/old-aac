export const API_ENDPOINTS = {
  EXAMPLE: {
    CREATE_EXAMPLE: '/',
    GET_EXAMPLES: '/',
    EDIT_EXAMPLE: '/:id',
  },
  AUTHENTICATION: {
    SIGNUP: 'signup',
  },
  PLAN: {
    ADD_PLAN: '/',
    PLAN_LIST: '/',
    EDIT_PLAN: '/:plan_id',
    DELETE_PLAN: '/:plan_id',
  },
  SUPER_ADMIN: {
    BILLING_INVOICES: {
      ASSIGN_PLAN: 'assign-plan',
    },
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
    DELETE_JOB: '/',
  },
  FAQS: {
    GET_FAQ: '/:id',
    UPDATE_FAQ: '/:id',
    DELETE_FAQ: '/:id',
  },
  PRODUCTS: {
    ADD_PRODUCT: '/',
    GET_PRODUCTS: '/',
    EDIT_PRODUCT: '/:id',
  },

  AIR_SERVICES: {
    TICKETS: {
      ticket: 'ticket',
      ADD_CHILD_TICKET: 'add-child-ticket',
      GET_CHILD_TICKETS: 'get-child-tickets/:ticketId',
      ASSOCIATE_ASSETS: 'associate-assets',
    },
    ASSETS: {
      INVENTORY: 'inventory',
      DELETE_INVENTORY: '/:id',
    },
    TASK: {
      ADD_TASK: '/',
      GET_TASK: '/',
      UPDATE_TASK: '/:id',
      DELETE_TASK: '/:id',
    },
    EXPENSE: {
      ADD_EXPENSE: 'add-expense',
      GET_EXPENSE: 'get-expense',
    },
  },
  PAYMENTS: {
    FIND_ONE: '/:id',
    DELETE_ONE: '/:id',
    UPDATE_ONE: '/:id',
  },
};
