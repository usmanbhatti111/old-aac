export const API_ENDPOINTS = {
  EXAMPLE: {
    CREATE_EXAMPLE: '/',
    GET_EXAMPLES: '/',
    EDIT_EXAMPLE: '/:id',
  },
  AUTHENTICATION: {
    FORCE_CONFIRM: 'force-confirm-user',
    SIGNUP: 'signup',
    SIGNIN: 'signin',
    VERIFY_TOKEN: 'verify-token',
    SEARCH_ORG: 'search-company',
    IG_VERIFICATION: 'ig-verification',
    IG_STATUS_UPDATE: 'ig-status-update',
  },
  USER: {
    GET: '/',
    GET_ONE: '/:id',
    CREATE: '/',
    UPDATE: '/:id',
    EDIT_USER: 'edit/:id',
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
    ADD_PLAN_TYPE: 'plan-type',
    PLAN_LIST: '/',
    PLAN: '/:planId',
    EDIT_PLAN: '/:planId',
    DELETE_PLAN: '/:planId',
    PLAN_TYPE_LIST: 'plan-type-list',
  },
  CONTACT: {
    CREATE_CONTACT: '/',
    CONTACT_LIST: '/',
    CONTACT_DELETED_LIST: 'contact-deleted-list/',
    CONTACT_ASSOCIATIONS: 'contact-associations/',
    CONTACT: '/:contactId',
    EDIT_CONTACT: '/:contactId',
    IMPORT_CONTACT: 'import',
    DELETE_CONTACT: '/:contactId',
    RESTORE_CONTACT: 'restore/:contactId',
    CONTACT_TASKS: 'contact-tasks/',
    ASSIGN_CONTACT_OWNER: 'assign-contact-owner/:contactId',
    PERMANENT_DELETE_CONTACT: 'permanent/:contactId',
    DELETE_CONTACT_MULTI: '/',
    PERMANENT_DELETE_CONTACT_MULTI: 'permanent/',
    RESTORE_CONTACT_MULTI: 'restore/',
    ASSIGN_CONTACT_OWNER_MULTI: 'assign-contact-owner/',
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
      RESCHEDULE_CONTACT_CALL: 'call/rechedule/:contactCallId',
      RESET_OUTCOME_CONTACT_CALL: 'call/reset-outcome/:contactCallId',
      CONTACT_CALL_STATUS: 'call/status/:contactCallId',
    },
    CONTACT_MEETING: {
      CREATE_CONTACT_MEETING: 'meeting/',
      CONTACT_MEETING_LIST: 'meeting/',
      CONTACT_MEETING: 'meeting/:contactMeetingId',
      EDIT_CONTACT_MEETING: 'meeting/:contactMeetingId',
      DELETE_CONTACT_MEETING: 'meeting/:contactMeetingId',
      RESCHEDULE_CONTACT_MEETING: 'meeting/rechedule/:contactMeetingId',
      RESET_OUTCOME_CONTACT_MEETING: 'meeting/reset-outcome/:contactMeetingId',
      CONTACT_MEETING_STATUS: 'meeting/status/:contactMeetingId',
    },
  },
  ORGANIZATION: {
    CREATE_ORGANIZATION: '/',
    UPDATE_ORGANIZATION: '/:id',
    GET_ORGANIZATION: '/:id',
    GET_ORGANIZATIONS: 'get-organizations',
  },
  ORGANIZATION_COMPANY_ACCOUNT: {
    CREATE_ORGANIZATION_COMPANY_ACCOUNT: '/',
    GET_ORGANIZATION_COMPANY_ACCOUNTS: 'get-accounts/:organizationId',
    GET_ORGANIZATION_COMPANY_ACCOUNT: '/:id',
    UPDATE_ORGANIZATION_COMPANY_ACCOUNT: '/:id',
    DELETE_ORGANIZATION_COMPANY_ACCOUNT: '/:id',
    UPDATE_ORGANIZATION_COMPANY_ACCOUNT_STATUS: 'update-status',
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
      FIND_PLAN: 'find-plan',
    },
    QUICK_LINKS: {
      ADD_QUICK_LINK: '/',
      GET_QUICK_LINKS_GROUP_BY_PRODUCT: '/get-quick-links-group-by-product',
      GET_QUICK_LINKS: '/',
      DELETE_QUICK_LINKS: '/:ids',
      EDIT_QUICK_LINK: '/:id',
    },

    TAX_CALCULATION: {
      ADD_TAX: '/',
      GET_TAXS: '/',
      UPDATE_TAX: '/:id',
      DELETE_TAXS: '/:ids',
    },

    JOB_APPLICATIONS: {
      CREATE_JOB_APPLICATION: '/',
      GET_JOB_APPLICATIONS: '/',
      GET_UNIQUE_CANDIDATE: '/get-unique-candidate',
      EDIT_JOB_APPLICATION: '/:id',
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
  ATTACHMENT: {
    ADD_ATTACHMENT: 'add-attachment',
    GET_ATTACHMENT: 'get-attachment',
    DELETE_ATTACHMENT: 'delete-attachment',
    DELETE_ALL_ATTACHMENT: 'delete-all-attachment',
  },
  JOBS: {
    CREATE_JOB: '/',
    GET_JOBS: '/',
    GET_JOB: '/:id',
    UPDATE_JOB: '/:id',
    DELETE_JOB: '/:ids',
  },
  FAQS: {
    CREATE_FAQ: '/',
    GET_FAQS: '/',
    GET_FAQ: '/:id',
    UPDATE_FAQ: '/:id',
    DELETE_FAQ: '/:ids',
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
      BULK_TICKET_UPDATE: 'bulk-ticket-update',
    },
    ASSETS: {
      INVENTORY: 'inventory',
      EDIT_INVENTORY: 'inventory/:id',
      DELETE_INVENTORY: '/:id',
      PURCHASEORDER: 'purchaseorder',
      GET_PURCHASEORDER: 'purchaseorder/:id',
      GET_PURCHASEORDER_RECIEVED: 'purchaseorder-recieved',
      GET_PURCHASEORDERASSOCIATE: 'purchaseorderassociate/:id',
      GET_PURCHASEORDERLIST: 'purchaseorderlist',
      DELETE_PURCHASEORDER: 'purchaseorder/:id',
      UPDATE_PURCHASEORDER: 'purchaseorder/:id',
      ADD_ASSOCIATE_ORDER: 'add-associate-order/:id',
      ADD_APPROVER_ORDER: 'add-approver-order',
      APPROVER_ORDER_STATUS: 'approver-order-status/:id',
      DELETE_ASSOCIATE_ORDER: 'delete-associate-order/:id',
      ADD_SOFTWARE: 'add_software',
      ASSOCIATE_INVENTORY_LIST: 'associate-inventory-list',
      ADD_SOFTWARE_DEVICE: 'add-software-device/:id',
      EDIT_SOFTWARE: 'edit-software/:id',
      DELETE_SOFTWARE: 'delete-software/:id',
      GET_SOFTWARE: 'get-software',
      ASSIGN_CATEGORY: 'assign-category/:id',
      CHANGE_PURCHASEORDER_STATUS: 'status-purchaseorder/:id',
      SEARCH_INVENTORY: 'search-inventory',
      DELETE_SOFTWARE_DEVICE: 'software-device/:id',
      GET_INVENTORY_SOFTWARE_DETAILS: 'get-inventory-software/:id',
      ADD_SOFTWARE_USERS: 'add-software-users',
      SOFTWARE_USERS_DETAILS: 'software-users-details/:id',
      SOFTWARE_USERS_DOWNLOAD_FILE: 'software-users-download-file',
      SOFTWARE_ALLOCATE_CONTRACT: 'software-allocate-contract',
      SOFTWARE_DEALLOCATE_CONTRACT: 'software-deallocate-contract',
      SOFTWARE_USERS_REMOVE: 'software-users-remove/:id',
      GET_SOFTWARE_DEVICES: 'software-devices',
    },
    TASK: {
      ADD_TASK: '/',
      GET_TASK: '/',
      UPDATE_TASK: '/:id',
      DELETE_TASK: '/:id',
    },
    DASHBOARD: {
      ADD_DASHBOARD: '/',
      GET_DASHBOARDS: '/',
      GET_DASHBOARD: '/:id',
      UPDATE_DASHBOARD: '/:id',
      DELETE_DASHBOARD: '/:id',
    },
    REPORT_WIDGETS: {
      ADD_REPORT_WIDGET: '/',
      GET_REPORT_WIDGETS: '/',
      GET_REPORT_WIDGET: '/:id',
      UPDATE_REPORT_WIDGET: '/:id',
      DELETE_REPORT_WIDGET: '/:id',
    },
    TASK_MANAGEMENT: {
      CREATE_TASK: 'management',
      TASK_LIST: 'management',
      TASK_DETAIL: 'management/:id',
      UPDATE_TASK: 'management/:id',
      DELETE_TASK: 'management/:id',
      TASK_ACTIVITY_LIST: 'activity',
    },
    WORK_LOAD_MANAGEMENT: {
      WORK_LOAD_LIST: 'workload-management',
      GET_USER_TASKS: 'user-tasks',
    },
    EXPENSE: {
      ADD_EXPENSE: 'add-expense',
      GET_EXPENSE: 'get-expense',
    },

    CONTRACT: {
      ADD_CONTRACT: 'add-contract',
      ADD_CONTRACT_ASSET: 'add-contract-asset/:id',
      APPROVE_CONTRACT: 'approve-contract/:id',
      UPDATE_CONTRACT_SUBMITTED_STATUS: 'approval-request/:id',
      DELETE_CONTRACT_ASSET: 'delete-contract-asset/:id',
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
    FIND_ONE: 'find/:id',
    DELETE_ONE: 'delete/:id',
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
      GET_ONE: 'get-one/:id',
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

  DEAL_PIPELINE: {
    CREATE_DEAL_PIPELINE: '/',
    GET_DEAL_PIPELINES: '/',
    GET_DEAL_PIPELINE: '/:id',
    UPDATE_DEAL_PIPELINE: '/:id',
    DELETE_DEAL_PIPELINE: '/:id',
  },

  SALES_PRODUCT: {
    CREATE_SALES_PRODUCT: '/',
    GET_SALES_PRODUCTS: '/',
    GET_SALES_PRODUCT: '/:id',
    UPDATE_SALES_PRODUCT: '/:id',
    DELETE_SALES_PRODUCT: '/:id',
  },

  ACTIVITY_LOGS: {
    GET_ACTIVITY_LOG: '/',
  },
  SALES: {
    DEALS: {
      CREATE_DEAL: '/',
      UPDATE_DEAL: '/:id',
      GET_DEALS_LIST_VIEW: 'get-deals-list-view',
      GET_DEALS_GRID_VIEW: 'get-deals-grid-view',
      DELTE_DEALS: 'delete-deals/:ids',
      GET_SOFT_DELETED_DEALS: 'get-soft-deleted-deals',
      RESTORE_DEAL_ACTION: 'restore-deal-action',
      GET_ASSOCIATIONS: 'get-associations/:id',
      CREATE_ASSOCIATION: 'create-association',
      DELETE_ASSOCIATION: 'delete-association',
      ADD_TASK: 'add-task',
      DELETE_TASK: 'delete-task',
      ADD_NOTE: 'add-note',
      DELETE_NOTE: 'delete-note',
      DEAL_ACTION_PREVIEW: 'deal-action-preview/:id',
      CREATE_OR_UPDATE_CUSTOMIZE_COLUMN: 'create-or-update-customize-column',
    },
    DEAL_VIEWS: {
      CREATE_DEAL_VIEW: '/',
      GET_DEAL_VIEW: '/',
      GET_NOTES: 'get-notes/:id',
      GET_TASKS: 'get-tasks/:id',
    },
  },
  CALLS: {
    GET_NUMBERS_LIST: 'get-numbers-list',
    INITIATE_CALL: 'initiate-call',
    VERIFY_PHONE_NUMBER: 'verify-phone-number',
    NEW_OUTGOING_CALLER: 'new-outgoing-caller',
    SEND_VERIFICATION_TOKEN: 'send-verification-token',
    VERIFY_NUMBER_TOKEN: 'verify_number_token',
  },
  DEAL_NOTE: {
    CREATE_DEAL_NOTE: '/',
    GET_DEAL_NOTES: '/',
    GET_DEAL_NOTE: '/:id',
    UPDATE_DEAL_NOTE: '/:id',
    DELETE_DEAL_NOTE: '/:id',
  },

  KNOWLEDGE_BASE: {
    ARTICLES: {
      GET_UNAPPROVED_ARTICLES: 'unapproved-articles',
    },
  },
};
