export const RMQ_MESSAGES = {
  EXAMPLE: {
    CREATE_EXAMPLE: 'create-example',
    GET_EXAMPLES: 'get-examples',
    EDIT_EXAMPLE: 'edit-example',
  },
  AUTHENTICATION: {
    SIGNUP: 'auth-signup',
    SIGNIN: 'auth-signin',
    VERIFY_TOKEN: 'verify-token',
    SEARCH_ORG_BY_NAME: 'search-org-by-name',
    SEARCH_ORG_BY_CRN: 'search-org-by-crn',
  },
  USER: {
    CREATE: 'create-user',
    FIND_BY_EMAIL: 'find-user-by-email',
    FIND_BY_COGNITO: 'find-user-by-cognito',
  },
  ROLE: {
    CREATE_ROLE: 'create-role',
    UPDATE_ROLE: 'update-role',
    GET_ROLES: 'get-roles',
    GET_ROLE: 'get-role',
    DELETE_ROLE: 'delete-role',
  },
  PLAN: {
    ADD_PLAN: 'add-plan',
    PLAN_LIST: 'plan-list',
    EDIT_PLAN: 'edit-plan',
    PLAN: 'plan',
    DELETE_PLAN: 'delete-plan',
    PLAN_TYPE_LIST: 'plan-type-list',
  },

  ORGANIZATION: {
    UPDATE_ORGANTIZATION: 'update-organization',
    CREATE_ORGANTIZATION: 'create-organization',
    GET_ORGANTIZATION: 'get-organization',
    GET_ORGANTIZATIONS: 'get-organizations',
    DELETE_ORGANTIZATION: 'delete-organization',
  },
  ORGANIZATION_COMPANY_ACCOUNT: {
    CREATE_ORGANIZATION_COMPANY_ACCOUNT: 'create-company-accounts',
    GET_ORGANIZATION_COMPANY_ACCOUNTS: 'get-company-accounts',
    GET_ORGANIZATION_COMPANY_ACCOUNT: 'get-company-account',
  },
  SUPER_ADMIN: {
    BILLING_INVOICES: {
      ASSIGN_PLAN: 'assign-plan',
      GET_ORG_PLAN: 'get-org-plan',
      LIST_ORG_PLAN: 'list-org-plan',
      LIST_ALL_INVOICES: 'list-all-invoices',
      GENERATE_INVOICE: 'generate-invoice',
      UPDATE_INVOICE: 'update-invoice',
      BILLING_DETAILS: 'billing-detials',
      ADD_DISCOUNT: 'add-discount',
      UPDATE_ASSIGN_PLAN: 'update-assign-plan',
    },

    QUICK_LINKS: {
      ADD_QUICK_LINK: 'add-quick-link',
      GET_QUICK_LINKS: 'get-quick-links',
      DELETE_QUICK_LINKS: 'delete-quick-links',
      EDIT_QUICK_LINK: 'edit-quick-link',
      GET_QUICK_LINKS_GROUP_BY_PRODUCT: 'get-quick-links-group-by-product',
    },

    ADD_USER: 'add-user',
    USER_LIST: 'user-list',
    USER_PROFILE: 'user-profile',
    UPDATE_PROFILE: 'update-profile',
    ADD_ACCOUNTS: 'add-accounts',
    ACCOUNTS_LIST: 'accounts-list',
    ACCOUNT_DETAIL: 'account-detail',
    UPDATE_ACCOUNTS: 'update-accounts',
    COMPANY_LIST: 'company-list',
    PRODUCT_LIST: 'product-list',
  },

  JOBS: {
    CREATE_JOB: 'create-job',
    GET_JOB: 'get-job',
    GET_JOBS: 'get-jobs',
    UPDATE_JOB: 'update-job',
    DELETE_JOB: 'delete-job',
  },

  CONTACT: {
    CREATE_CONTACT: 'create-contact',
    CONTACT_LIST: 'contact-list',
    CONTACT_DELETED_LIST: 'contact-deleted-list',
    CONTACT_ASSOCIATIONS: 'contact-associations',
    CONTACT_TASKS: 'contact-tasks',
    EDIT_CONTACT: 'edit-contact',
    CONTACT: 'contact',
    DELETE_CONTACT: 'delete-contact',
    RESTORE_CONTACT: 'restore-contact',
    ASSIGN_CONTACT_OWNER: 'assign-contact-owner',
    CONTACT_NOTE: {
      CREATE_CONTACT_NOTE: 'create-contact-note',
      CONTACT_NOTE_LIST: 'contact-note-list',
      CONTACT_NOTE: 'contact-note',
      EDIT_CONTACT_NOTE: 'edit-contact-note',
      DELETE_CONTACT_NOTE: 'delete-contact-note',
    },
    CONTACT_CALL: {
      CREATE_CONTACT_CALL: 'create-contact-call',
      CONTACT_CALL_LIST: 'contact-call-list',
      CONTACT_CALL: 'contact-call',
      EDIT_CONTACT_CALL: 'edit-contact-call',
      DELETE_CONTACT_CALL: 'delete-contact-call',
      RESCHEDULE_CONTACT_CALL: 'rechedule-contact-call',
      RESET_OUTCOME_CONTACT_CALL: 'reset-contact-call-outcome',
      CONTACT_CALL_STATUS: 'contact-call-status',
    },
    CONTACT_MEETING: {
      CREATE_CONTACT_MEETING: 'create-contact-meeting',
      CONTACT_MEETING_LIST: 'contact-meeting-list',
      CONTACT_MEETING: 'contact-meeting',
      EDIT_CONTACT_MEETING: 'edit-contact-meeting',
      DELETE_CONTACT_MEETING: 'delete-contact-meeting',
      RESCHEDULE_CONTACT_MEETING: 'rechedule-contact-meeting',
      RESET_OUTCOME_CONTACT_MEETING: 'reset-contact-meeting-outcome',
      CONTACT_MEETING_STATUS: 'contact-meeting-status',
    },
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
  ATTACHMENT: {
    ADD_ATTACHMENT: 'add-attachment',
    GET_ATTACHMENT: 'get-attachment',
    DELETE_ATTACHMENT: 'delete-attachment',
    DELETE_ALL_ATTACHMENT: 'delete-all-attachment',
  },
  AIR_SERVICES: {
    TICKETS: {
      CREATE_TICKET: 'create-ticket',
      GET_TICKET_DETAILS: 'get-ticket-details',
      ASSOCIATE_ASSETS: 'associate-assets',
      GET_ASSOCIATE_ASSETS: 'get-associate-assets',
      DETACH_ASSETS: 'detach-assets',
      DELETE_TICKETS: 'delete-tickets',
      CREATE_CHILD_TICKET: 'create_child_ticket',
      GET_CHILD_TICKETS: 'get_child_ticket',
      DELETE_CHILD_TICKETS: 'delete_child_tickets',
      EDIT_TICKETS: 'edit-tickets',
      CHANGE_STATUS: 'change_status',
      GET_TICKET_LIST: 'get_ticket_list',
    },
    ASSETS: {
      ADD_Inventory: 'add-inventory',
      ADD_PURCHASEORDER: 'add-purchaseorder',
      EDIT_Inventory: 'edit-inventory',
      ADD_PURCHASE: 'add-purchase',
      GET_Inventory: 'get-inventory',
      Delete_Inventory: 'delete-inventory',
      DELETE_PURCHASEORDER: 'delete-purchaseorder',
      UPDATE_PURCHASEORDER: 'update-purchaseorder',
      ADD_ASSOCIATE_ORDER: 'add-associate-order',
      ADD_SOFTWARE: 'add-software',
      ADD_SOFTWARE_DEVICE: 'add-software-device',
      GET_PURCHASEORDERLIST: 'get-purchaseorderlist',
      ASSOCIATE_INVENTORY_LIST: 'associate-inventory-list',
      GET_PURCHASEORDER: 'get-purchaseorder',
      EDIT_SOFTWARE: 'edit-software',
      DELETE_SOFTWARE: 'delete-software',
      GET_SOFTWARE: 'get-software',
      ASSIGN_CATEGORY: 'assign-category',
      SEARCH_INVENTORY: 'search-inventory',
      DELETE_SOFTWARE_DEVICE: 'delete-software-device',
      GET_INVENTORY_SOFTWARE_DETAILS: 'get-inventory-software-details',
      DELETE_ASSOCIATE_ORDER: 'delete-associate-order',
    },
    TASK: {
      ADD_TASK: 'add_task',
      GET_TASKS: 'get-tasks',
      UPDATE_TASK: 'update-task',
      DELETE_TASK: 'delete-task',
    },
    TASK_MANAGEMENT: {
      CREATE_TASK: 'create-task',
      TASK_LIST: 'task-list',
      TASK_DETAIL: 'task-detail',
      EDIT_TASK: 'edit-task',
      DELETE_TASK: 'delete-task',
      TASK_ACTIVITY_LIST: 'task-activity',
    },
    EXPENSE: {
      ADD_EXPENSE: 'add-expense',
      GET_EXPENSE: 'get-expense',
    },
    CONTRACT: {
      ADD_CONTRACT: 'add-contract',
      DELETE_CONTRACT: 'delete-contract',
      UPDATE_CONTRACT: 'update-contract',
      RENEW_EXTEND_CONTRACT: 'renew-extend-contract',
      GET_CONTRACTS: 'get-contracts',
    },
  },

  NEWS_AND_EVENTS: {
    ADD_NEWS_AND_EVENTS: 'add-news-and-event',
    EDIT_NEWS_AND_EVENT: 'edit-news-and-event',
    GET_NEWS_OR_EVENT: 'get-news-or-event',
    GET_NEWS_OR_EVENTS: 'get-news-or-events',
    DELETE_NEWS_OR_EVENTS: 'delete-news-or-events',
  },

  ORG_ADMIN: {
    PAYMENTS: {
      ADD_PAYMENT: 'add-payment',
      UPDATE_PAYMENT: 'update-payment',
      GET_ALL_PAYMENTS: 'get-all-payments',
      GET_ONE_PAYMENTS: 'get-one-payment',
      DELETE_ONE_PAYMENTS: 'delete-one-payment',
    },
    INVOICES: {
      GET_ALL_SUBSCRIPTION: 'get-all-subscriptions',
      ASSIGN_PLAN: 'assign-plan',
      UPDATE_ASSIGN_PLAN: 'update-assign-plan',
      GET_ALL_INVOICES: 'get-all-invoices',
      GET_ONE_INVOICE: 'get-one-invoice',
      PAY_NOW_INVOICE: 'pay-now-invoice',
    },
    CONTACT_STATUS: {
      ADD_CONTACT_STATUS: 'add-contact-status',
      GET_CONTACT_STATUSES: 'get-contact-statuses',
      GET_CONTACT_STATUS: 'get-contact-status',
      EDIT_CONTACT_STATUS: 'edit-contact-status',
      DELETE_CONTACT_STATUS: 'delete-contact-status',
    },
    PRODUCT_CATEGORIES: {
      ADD_PRODUCT_CATEGORY: 'add-product-category',
      GET_PRODUCT_CATEGORIES: 'edit-product-categories',
      EDIT_PRODUCT_CATEGORY: 'edit-product-category',
    },
    LIFECYCLE_STAGES: {
      ADD_LIFECYCLE_STAGE: 'add-lifecycle-stage',
      GET_LIFECYCLE_STAGES: 'get-lifecycle-stages',
      GET_LIFECYCLE_STAGE: 'get-lifecycle-stage',
      EDIT_LIFECYCLE_STAGE: 'edit-lifecycle-stage',
      DELETE_LIFECYCLE_STAGE: 'delete-lifecycle-stage',
    },
  },
  DOCUMENTS: {
    ADD_FOLDER: 'add_folder',
    GET_FOLDERS: 'get-folders',
    CREATE_FILE: 'create-file',
    DELETE_FOLDERS: 'delete-folders',
    GET_FILES: 'get-files',
    DELETE_FILES: 'delete-files',
    EDIT_FILE: '/edit-file',
    EDIT_FOLDER: '/edit-folder',
  },
  PRODUCT_FEATURES: {
    ADD_PRODUCT_FEATURE: 'add-product-feature',
    EDIT_PRODUCT_FEATURE: 'edit-product-feature',
    GET_PRODUCT_FEATURE: 'get-product-feature',
    GET_PRODUCTS_FEATURES: 'get-products-features',
    DELETE_PRODUCTS_FEATURES: 'delete-products-features',
  },
  LOGS: {
    CREATE: 'create-request-log',
    GET_LOGS: 'get-request-logs',
    GET_LOGS_BY_USER: 'get-user-request-logs',
  },
  DEAL_PIPELINE: {
    CREATE_DEAL_PIPELINE: 'create-deal-pipeline',
    GET_DEAL_PIPELINES: 'get-deal-pipelines',
    GET_DEAL_PIPELINE: 'get-deal-pipeline',
    UPDATE_DEAL_PIPELINE: 'update-deal-pipeline',
    DELETE_DEAL_PIPELINE: 'delete-deal-pipeline',
  },

  SALES_PRODUCT: {
    CREATE_SALES_PRODUCT: 'create-sales-product',
    GET_SALES_PRODUCTS: 'get-sales-products',
    GET_SALES_PRODUCT: 'get-sales-product',
    UPDATE_SALES_PRODUCT: 'update-sales-product',
    DELETE_SALES_PRODUCT: 'delete-sales-product',
  },
  SALES: {
    DEALS: {
      CREATE_DEAL: 'create-deal',
      UPDATE_DEAL: 'update-deal',
      GET_DEALS_LIST_VIEW: 'get-deals-list-view',
      DELTE_DEALS: 'delete-deals',
    },
  },

  DEAL_NOTE: {
    CREATE_DEAL_NOTE: 'create-deal-note',
    GET_DEAL_NOTES: 'get-deal-notes',
    GET_DEAL_NOTE: 'get-deal-note',
    UPDATE_DEAL_NOTE: 'update-deal-note',
    DELETE_DEAL_NOTE: 'delete-deal-note',
  },
};
