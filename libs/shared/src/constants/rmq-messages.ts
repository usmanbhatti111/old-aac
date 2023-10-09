export const RMQ_MESSAGES = {
  EXAMPLE: {
    CREATE_EXAMPLE: 'create-example',
    GET_EXAMPLES: 'get-examples',
    EDIT_EXAMPLE: 'edit-example',
  },
  AUTHENTICATION: {
    SIGNUP: 'auth-login',
  },
  SUPER_ADMIN: {
    BILLING_INVOICES: {
      ASSIGN_PLAN: 'assign-plan',
    },
    ADD_USER: 'add-user',
    USER_LIST: 'user-list',
    USER_PROFILE: 'user-profile',
    UPDATE_PROFILE: 'update-profile',
    ADD_ACCOUNTS: 'add-accounts',
    ACCOUNTS_LIST: 'accounts-list',
    UPDATE_ACCOUNTS: 'update-accounts',
  },

  JOBS: {
    CREATE_JOB: 'create-job',
    GET_JOB: 'get-job',
    GET_JOBS: 'get-jobs',
    UPDATE_JOB: 'update-job',
    DELETE_JOB: 'delete-job',
  },

  FAQS: {
    CREATE_FAQ: 'create-faq',
    GET_FAQ: 'get-faq',
    GET_FAQS: 'get-faqs',
    UPDATE_FAQ: 'update-faq',
    DELETE_FAQ: 'delete-faq',
  },
  PRODUCTS: {
    ADD_PRODUCT: 'add-product',
    GET_PRODUCTS: 'get-products',
    EDIT_PRODUCT: 'edit-product',
  },
  AIR_SERVICES: {
    TICKETS: {
      CREATE_TICKET: 'create-ticket',
      GET_TICKET_DETAILS: 'get-ticket-details',
      ASSOCIATE_ASSETS: 'associate-assets',
      CREATE_CHILD_TICKET: 'create_child_ticket',
      GET_CHILD_TICKETS: 'get_child_ticket',
    },
    ASSETS: {
      ADD_Inventory: 'add-inventory',
      GET_Inventory: 'get-inventory',
    },
    TASK: {
      ADD_TASK: 'add_task',
      GET_TASKS: 'get-tasks',
    },
  },
  ORG_ADMIN: {
    PAYMENTS: {
      ADD_PAYMENT: 'add-payment',
      UPDATE_PAYMENT: 'update-payment',
      GET_ALL_PAYMENTS: 'get-all-payments',
      GET_ONE_PAYMENTS: 'get-one-payment',
      DELETE_ONE_PAYMENTS: 'delete-one-payment',
    },
  },
};
