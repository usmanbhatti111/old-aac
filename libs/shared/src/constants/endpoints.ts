export const API_ENDPOINTS = {
  EXAMPLE: {
    CREATE_EXAMPLE: '/',
    GET_EXAMPLES: '/',
    EDIT_EXAMPLE: '/:id',
  },
  AUTHENTICATION: {
    SIGNUP: 'signup',
    SIGNIN: 'signin',
    VERIFY_TOKEN: 'verify-token',
  },
  USER: {
    GET: '/',
    GET_ONE: '/:id',
    CREATE: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
  },
  ROLE: {
    GET: '/',
    GET_ONE: '/:id',
    CREATE: '/',
    UPDATE: '/:id',
    DELETE: '/:id',
  },
  PLAN: {
    ADD_PLAN: '/',
    PLAN_LIST: '/',
    PLAN: '/:planId',
    EDIT_PLAN: '/:planId',
    DELETE_PLAN: '/:planId',
    PLAN_TYPE_LIST: 'plan-type-list',
  },
  CONTACT: {
    CREATE_CONTACT: '/',
    CONTACT_LIST: '/',
    CONTACT: '/:contactId',
    EDIT_CONTACT: '/:contactId',
    DELETE_CONTACT: '/:contactId',
    ASSIGN_CONTACT_OWNER: 'assign-contact-owner/:contactId',
    CONTACT_NOTE: {
      CREATE_CONTACT_NOTE: 'note/',
      CONTACT_NOTE_LIST: 'note/',
      CONTACT_NOTE: 'note/:contactNoteId',
      EDIT_CONTACT_NOTE: 'note/:contactNoteId',
      DELETE_CONTACT_NOTE: 'note/:contactNoteId',
    },
    CONTACT_CALL: {
      CREATE_CONTACT_CALL: 'call/',
      CONTACT_CALL_LIST: 'call/',
      CONTACT_CALL: 'call/:contactCallId',
      EDIT_CONTACT_CALL: 'call/:contactCallId',
      DELETE_CONTACT_CALL: 'call/:contactCallId',
    },
  },
  ORGANIZATION: {
    CREATE_ORGANIZATION: '/',
    UPDATE_ORGANIZATION: '/:id',
    GET_ORGANIZATION: '/:id',
  },
  ORGANIZATION_COMPANY_ACCOUNT: {
    CREATE_ORGANIZATION_COMPANY_ACCOUNT: '/',
    GET_ORGANIZATION_COMPANY_ACCOUNTS: 'get-accounts/:organizationId',
    GET_ORGANIZATION_COMPANY_ACCOUNT: '/:id',
  },
  SUPER_ADMIN: {
    BILLING_INVOICES: {
      ASSIGN_PLAN: 'assign-plan',
      ORG_PLAN: 'get-one-orgplan',
      ORG_PLANS: 'get-all-orgplans',
      LIST_ALL_INVOICE: 'get-all-invoice',
      GENERATE_INVOICE: 'generate-invoice',
      UPDATE_INVOICE: 'update-invoice',
      BILLING_DETAILS: 'billing-details',
      ADD_DISCOUNT: 'add-discount',
      UPDATE_ASSIGN_PLAN: 'update-assign-plan',
    },
    QUICK_LINKS: {
      ADD_QUICK_LINK: '/',
      GET_QUICK_LINKS_GROUP_BY_PRODUCT: '/get-quick-links-group-by-product',
      GET_QUICK_LINKS: '/',
      DELETE_QUICK_LINKS: '/:ids',
      EDIT_QUICK_LINK: '/:id',
    },
    ADD_USER: 'add-user',
    USER_LIST: 'user-list',
    USER_PROFILE: 'user-profile/:userId',
    UPDATE_PROFILE: 'update-profile/:userId',
    ADD_ACCOUNTS: 'add-accounts',
    ACCOUNTS_LIST: 'accounts-list',
    UPDATE_ACCOUNT: 'update-account/:accountId',
    ACCOUNT_DETAIL: 'account-detail/:accountId',
    COMPANY_LIST: 'company-list',
    PRODUCT_LIST: 'product-list',
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
      GET_CHILD_TICKETS: 'get-child-tickets/:id',
      DELETE_CHILD_TICKETS: 'delete-child-tickets/:id',
      EDIT_CHILD_TICKETS: 'edit-child-tickets/:id',
      ASSOCIATE_ASSETS: 'associate-assets',
      DETACH_ASSETS: 'detach-assets',
      CHANGE_STATUS: 'status/:id',
    },
    ASSETS: {
      INVENTORY: 'inventory',
      EDIT_INVENTORY: 'inventory/:id',
      DELETE_INVENTORY: '/:id',
      PURCHASEORDER: 'purchaseorder',
      GET_PURCHASEORDER: 'purchaseorder/:id',
      GET_PURCHASEORDERLIST: 'purchaseorderlist',
      DELETE_PURCHASEORDER: 'purchaseorder/:id',
      UPDATE_PURCHASEORDER: 'purchaseorder/:id',
      ADD_ASSOCIATE_ORDER: 'add-associate-order/:id',
      DELETE_ASSOCIATE_ORDER: 'delete-associate-order/:id',
      ADD_SOFTWARE: 'add_software',
      ASSOCIATE_INVENTORY_LIST: 'associate-inventory-list',
      ADD_SOFTWARE_DEVICE: 'add-software-device/:id',
      EDIT_SOFTWARE: 'edit-software/:id',
      DELETE_SOFTWARE: 'delete-software/:id',
      GET_SOFTWARE: 'get-software',
      ASSIGN_CATEGORY: 'assign-category/:id',
      SEARCH_INVENTORY: 'search-inventory',
      DELETE_SOFTWARE_DEVICE: 'software-device/:id',
    },
    TASK: {
      ADD_TASK: '/',
      GET_TASK: '/',
      UPDATE_TASK: '/:id',
      DELETE_TASK: '/:id',
    },
    TASK_MANAGEMENT: {
      CREATE_TASK: 'management',
      TASK_LIST: 'management',
      TASK_DETAIL: 'management/:id',
      UPDATE_TASK: 'management/:id',
      DELETE_TASK: 'management/:id',
      TASK_ACTIVITY_LIST: 'activity',
    },
    EXPENSE: {
      ADD_EXPENSE: 'add-expense',
      GET_EXPENSE: 'get-expense',
    },

    CONTRACT: {
      ADD_CONTRACT: 'add-contract',
      DELETE_CONTRACT: '/:id',
      UPDATE_CONTRACT: 'update/:id',
      RENEW_EXTEND_CONTRACT: 'renew-extend/:id',
      GET_CONTRACT: 'get-contract',
      GET_CONTRACTS: 'get-contracts',
    },
  },
  PRODUCT_FEATURES: {
    ADD_PRODUCT_FEATURE: '/',
    GET_PRODUCTS_FEATURES: '/',
    GET_PRODUCT_FEATURE: '/:id',
    EDIT_PRODUCT_FEATURE: '/:id',
    DELETE_PRODUCTS_FEATURES: '/:ids',
  },

  NEWS_AND_EVENTS: {
    Add_NEWS_OR_EVENT: '/',
    GET_NEWS_OR_EVENTS: '/',
    EDIT_NEWS_OR_EVENT: '/:id',
    GET_NEWS_OR_EVENT: '/:id',
    DELETE_NEWS_OR_EVENTS: '/:ids',
  },

  PAYMENTS: {
    FIND_ONE: '/:id',
    DELETE_ONE: '/:id',
    UPDATE_ONE: '/:id',
  },
  DOCUMENTS: {
    CREATE_FOLDER: '/folder',
    CREATE_FILE: '/file',
    GET_FOLDERS: '/folders',
    DELETE_FOLDERS: '/folder/:id',
    GET_FILES: '/files',
    DELETE_FILES: '/files/:id',
    EDIT_FILE: '/file/:id',
    EDIT_FOLDER: '/folder/:id',
  },
  LOGS: {
    GET_LOGS: '/',
    GET_LOGS_BY_USER: '/:id',
  },
  ORG_ADMIN: {
    INVOICES: {
      GET_ONE: '/:id',
      PAY_NOW_INVOICE: 'pay-now-invoice',
    },
    CONTACT_STATUS: {
      ADD_CONTACT_STATUS: '/',
      GET_CONTACT_STATUSES: '/',
      EDIT_CONTACT_STATUS: '/:id',
      GET_CONTACT_STATUS: '/:id',
      DELETE_CONTACT_STATUS: '/:id',
    },
    LIFECYCLE_STAGES: {
      ADD_LIFECYCLE_STAGE: '/',
      GET_LIFECYCLE_STAGES: '/',
      GET_LIFECYCLE_STAGE: '/:id',
      EDIT_LIFECYCLE_STAGE: '/:id',
      DELETE_LIFECYCLE_STAGE: '/:id',
    },
  },

  PRODUCT_CATEGORIES: {
    ADD_PRODUCT_CATEGORY: '/',
    GET_PRODUCT_CATEGORIES: '/',
    EDIT_PRODUCT_CATEGORY: '/:id',
  },
};
