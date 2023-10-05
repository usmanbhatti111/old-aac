export const RMQ_MESSAGES = {
  EXAMPLE: {
    CREATE_EXAMPLE: 'create-example',
    GET_EXAMPLES: 'get-examples',
    EDIT_EXAMPLE: 'edit-example',
  },
  AUTHENTICATION: {
    SIGNUP: 'auth-login',
  },
  ORGANIZATION: {
    UPDATE_ORGANTIZATION: 'update-organization',
    CREATE_ORGANTIZATION: 'create-organization',
    GET_ORGANTIZATION: 'get-organization',
    GET_ORGANTIZATIONS: 'get-organizations',
    DELETE_ORGANTIZATION: 'delete-organization',
  },
  ORGANIZATION_COMPANY_ACCOUNT: {
    CREATE_ORGANIZATION_COMPANY_ACCOUNT: 'create', //can convert this to create instead
    GET_ORGANIZATION_COMPANY_ACCOUNTS: 'get-accounts',
  SUPER_ADMIN: {
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
  PRODUCTS: {
    ADD_PRODUCT: 'add-product',
    GET_PRODUCTS: 'get-products',
    EDIT_PRODUCT: 'edit-product',
  },
  AIR_SERVICES: {
    TICKETS: {
      CREATE_TICKET: 'create-ticket',
      GET_TICKET_DETAILS: 'get-ticket-details',
    },
    ASSETS: {
      ADD_Inventory: 'add-inventory',
      GET_Inventory: 'get-inventory',
    },
    TASK: {
      ADD_TASK: 'add_task',
    },
  },
};
