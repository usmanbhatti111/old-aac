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
  AIR_SERVICES: {
    TICKETS: {
      ticket: 'ticket',
    },
    ASSETS: {
      ADD_ASSETS: 'add-assets',
      GET_ASSETS: 'get-assets',
    },
  },
};
