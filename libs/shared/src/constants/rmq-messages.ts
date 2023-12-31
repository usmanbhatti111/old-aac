export const RMQ_MESSAGES = {
  EXAMPLE: {
    CREATE_EXAMPLE: 'create-example',
    GET_EXAMPLES: 'get-examples',
    EDIT_EXAMPLE: 'edit-example',
  },
  PERMISSION: {
    GET_PERMISSIONS_BY_PRODUCT: 'get-permissions-by-product',
    ADD_ALL_PERMISSIONS: 'add-all-permissions',
    ADD_COMPNAY_ACCOUNT_ROLE: 'add-company-account-role',
    GET_COMPNAY_ACCOUNT_ROLES: 'get-company-account-roles',
    EDIT_COMPANY_ACCOUNT_ROLE: 'edit-company-account-role',
  },
  AUTHENTICATION: {
    FORCE_CONFIRM: 'force-confirm-user',
    SIGNUP: 'auth-signup',
    SIGNIN: 'auth-signin',
    VERIFY_TOKEN: 'verify-token',
    SEARCH_ORG_BY_NAME: 'search-org-by-name',
    SEARCH_ORG_BY_CRN: 'search-org-by-crn',
    IG_VERIFICATION: 'IG_VERIFICATION',
    IG_STATUS_UPDATE: 'IG_STATUS_UPDATE',
  },
  USER: {
    GET_LIST: 'get-users',
    CREATE: 'create-user',
    CREATE_ORG_USER: 'create-org-user',
    CREATE_COMPANY_ACCOUNT: 'create-company-account-user',
    GET_COMPANY_ACCOUNT: 'get-company-account-user',
    GET_ORG_USERS: 'get-org-users',
    FIND_BY_EMAIL: 'find-user-by-email',
    FIND_BY_COGNITO: 'find-user-by-cognito',
    PROFILE: 'profile',
    UPDATE_PROFILE: 'update-profile',
    UPDATE_AVATAR: 'update-avatar',
    EDIT_USER: 'edit-user-by-admin',
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
    ADD_PLAN_TYPE: 'add-plan-type',
    PLAN_LIST: 'plan-list',
    EDIT_PLAN: 'edit-plan',
    PLAN: 'plan',
    DELETE_PLAN: 'delete-plan',
    PLAN_TYPE_LIST: 'plan-type-list',
    PRODUCT_PLAN_LIST: 'plan-product-list',
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
    UPDATE_ORGANIZATION_COMPANY_ACCOUNT: 'update-company-account',
    DELETE_ORGANIZATION_COMPANY_ACCOUNT: 'delete-company-account',
    DELETE_MULTIPLE_ORGANIZATION_COMPANY_ACCOUNT:
      'delete-multiple-company-account',
    UPDATE_ORGANIZATION_COMPANY_ACCOUNT_STATUS: 'update-company-account-status',
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
      FIND_PLAN: 'find-plan',
    },

    QUICK_LINKS: {
      ADD_QUICK_LINK: 'add-quick-link',
      GET_QUICK_LINKS: 'get-quick-links',
      DELETE_QUICK_LINKS: 'delete-quick-links',
      EDIT_QUICK_LINK: 'edit-quick-link',
      GET_QUICK_LINKS_GROUP_BY_PRODUCT: 'get-quick-links-group-by-product',
    },

    ENQUIRIES: {
      ADD_ENQUIRY: 'add-enquiry',
      GET_ENQUIRIES: 'get-enquiries',
      GET_ENQUIRY: 'get-enquiry',
      UPDATE_ENQUIRY: 'update-enquiry',
      DELETE_ENQUIRIES: 'delete-enquiries',
    },
    TAX_CALCULATIONS: {
      ADD_TAX: 'add-tax',
      GET_TAXS: 'get-taxs',
      UPDATE_TAX: 'update-tax',
      DELETE_TAXS: 'delete-taxs',
    },

    JOB_APPLICATIONS: {
      CREATE_JOB_APPLICATION: 'create-job-application',
      GET_UNIQUE_CANDIDATE: 'get-unique-candidate',
      GET_JOB_APPLICATIONS: 'get-job-applications',
      EDIT_JOB_APPLICATION: 'edit-job-application',
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
    IMPORT_CONTACT: 'import-contact',
    CONTACT: 'contact',
    DELETE_CONTACT: 'delete-contact',
    PERMANENT_DELETE_CONTACT: 'permanent-delete-contact',
    RESTORE_CONTACT: 'restore-contact',
    ASSIGN_CONTACT_OWNER: 'assign-contact-owner',
    DELETE_CONTACT_MULTI: 'delete-contact-multi',
    PERMANENT_DELETE_CONTACT_MULTI: 'permanent-delete-contact-multi',
    RESTORE_CONTACT_MULTI: 'restore-contact-multi',
    ASSIGN_CONTACT_OWNER_MULTI: 'assign-contact-owner-multi',
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
    GET_PRODUCT: 'get-product',
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
    REQUESTER: {
      ADD: 'add-requester',
    },
    DASHBOARD: {
      CREATE_DASHBOARD: 'create-dashboard',
      CREATE_DASHBOARD_ANNOUCEMENT: 'create-dashboard-annoucement',
      GET_DASHBOARD_LIST: 'get-dashboard-list',
      GET_DASHBOARD: 'get-dashboard',
      GET_DASHBOARD_Tickets: 'get-dashboard-tickets',
      UPDATE_DASHBOARD: 'update-dashboard',
      DELETE_DASHBOARD: 'delete-dashboard',
      EMAILED_DASHBOARD: 'emailed-dashboards',
    },
    WIDGETS: {
      CREATE_WIDGETS: 'create-widgets',
      GET_WIDGETS_LIST: 'get-widgets-list',
      GET_WIDGETS: 'get-widgets',
    },
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
      BULK_TICKET_UPDATE: 'bulk-ticket-update',
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
      ADD_APPROVER_ORDER: 'add-approver-order',
      APPROVER_ORDER_STATUS: 'approver-order-status',
      ADD_SOFTWARE: 'add-software',
      ADD_SOFTWARE_DEVICE: 'add-software-device',
      GET_PURCHASEORDERLIST: 'get-purchaseorderlist',
      ASSOCIATE_INVENTORY_LIST: 'associate-inventory-list',
      GET_PURCHASEORDER: 'get-purchaseorder',
      GET_PURCHASEORDER_RECIEVED: 'get-purchaseorder-recieved',
      EDIT_SOFTWARE: 'edit-software',
      DELETE_SOFTWARE: 'delete-software',
      GET_SOFTWARE: 'get-software',
      ASSIGN_CATEGORY: 'assign-category',
      CHANGE_PURCHASEORDER_STATUS: 'change_purchaseorder_status',
      SEARCH_INVENTORY: 'search-inventory',
      DELETE_SOFTWARE_DEVICE: 'delete-software-device',
      GET_INVENTORY_SOFTWARE_DETAILS: 'get-inventory-software-details',
      DELETE_ASSOCIATE_ORDER: 'delete-associate-order',
      ADD_SOFTWARE_USERS: 'add-software-users',
      SOFTWARE_USERS_DETAILS: 'software-users-details',
      GET_PURCHASEORDERASSOCIATE: 'get-purchaseorder-associate',
      SOFTWARE_ALLOCATE_CONTRACT: 'software-allocate-contract',
      SOFTWARE_DEALLOCATE_CONTRACT: 'software-deallocate-contract',
      SOFTWARE_USERS_REMOVE: 'software-users-remove',
      SOFTWARE_OVERVIEW: 'software-overview',
      GET_SOFTWARE_DEVICES: 'software-devices',
    },
    TASK: {
      ADD_TASK: 'add_task',
      GET_TASKS: 'get-tasks',
      UPDATE_TASK: 'update-task',
      DELETE_TASK_DATA: 'delete-task-data',
    },
    TASK_MANAGEMENT: {
      CREATE_TASK: 'create-task',
      TASK_LIST: 'task-list',
      TASK_DETAIL: 'task-detail',
      EDIT_TASK: 'edit-task',
      DELETE_TASK: 'delete-task',
      TASK_ACTIVITY_LIST: 'task-activity',
    },
    WORK_LOAD_MANAGEMENT: {
      WORK_LOAD_LIST: 'workload-list',
      GET_USER_TASKS: 'users-tasks',
    },
    EXPENSE: {
      ADD_EXPENSE: 'add-expense',
      GET_EXPENSE: 'get-expense',
    },
    CONTRACT: {
      ADD_CONTRACT: 'add-contract',
      ADD_CONTRACTS_ASSET: 'add-contract-asset',
      APPROVE_CONTRACT: 'approve-contract',
      UPDATE_CONTRACT_SUBMITTED_STATUS: 'approval-request',
      DELETE_CONTRACTS_ASSET: 'delete-contract-asset',
      DELETE_CONTRACT: 'delete-contract',
      UPDATE_CONTRACT: 'update-contract',
      RENEW_EXTEND_CONTRACT: 'renew-extend-contract',
      GET_CONTRACTS: 'get-contracts',
    },
    KNOWLEDGE_BASE: {
      ARTICLES: {
        WRITE: 'write-article',
        GET: 'get-articles',
        GET_UNAPPROVED_ARTICLES: 'unapproved-articles',
        UPDATE: 'update-article',
        DELETE: 'delete-article',
      },
    },
    SETTINGS: {
      PRODUCT_CATALOG: {
        ADD: 'add-product-catalog',
        GET: 'get-product-catalog',
      },
      ASSET_TYPE: {
        ADD: 'asset-type',
        GET: 'asset-type-list',
      },
      VENDORS: {
        ADD_VENDORS: 'add-vendors',
        GET_VENDORS: 'get-vendors',
        UPDATE_VENDORS: 'update-vendors',
      },
    },
    CONTRACT_TYPE: {
      ADD: 'add-contract-type',
      GET: 'get-contract-types',
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
      GET_ONE_SUBSCRIPTION: 'get-one-subscriptions',
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

  ACTIVITY_LOGS: {
    CREATE_ACTIVITY_LOG: 'create-activity-log',
    GET_ACTIVITY_LOG: 'activity-logs',
  },
  CALLS: {
    GET_NUMBERS_LIST: 'get-numbers-list',
    INITIATE_CALL: 'initiate-call',
    CALL_CANCELED_COMPLETED: 'call-canceled-completed',
    GET_CALL_LOGS: 'get-call-logs',
    VERIFY_PHONE_NUMBER: 'verify-phone-number',
    NEW_OUTGOING_CALLER: 'new-outgoing-caller',
    SEND_VERIFICATION_TOKEN: 'send-verification-token',
    VERIFY_NUMBER_TOKEN: 'verify-number-token',
    CREATE_SCHEDULED_CALL: 'create-scheduled-call',
    UPDATE_SCHEDULED_CALL: 'update-scheduled-call',
    DELETE_SCHEDULED_CALL: 'delete-scheduled-call',
    GET_ALL_SCHEDULED_CALL: 'get-all-scheduled-call',
    ADD_ATTENDEES_CALL: 'add-attendees-call',
    DELETE_ATTENDEES_CALL: 'delete-attendees-call',
  },

  SALES: {
    DEALS: {
      CREATE_DEAL: 'create-deal',
      UPDATE_DEAL: 'update-deal',
      GET_DEALS_LIST_VIEW: 'get-deals-list-view',
      GET_DEALS_GRID_VIEW: 'get-deals-grid-view',
      DELTE_DEALS: 'delete-deals',
      GET_SOFT_DELETED_DEALS: 'get-soft-deleted-deals',
      RESTORE_DEAL_ACTION: 'restore-deal-action',
      GET_ASSOCIATIONS: 'get-associations',
      CREATE_ASSOCIATION: 'create-association',
      DELETE_ASSOCIATION: 'delete-association',
      DEAL_ACTION_PREVIEW: 'deal-action-preview',
    },
    DEAL_VIEWS: {
      CREATE_DEAL_VIEW: 'create-deal-view',
      GET_DEAL_VIEW: 'get-deal-view',
      ADD_TASK: 'add-task',
      DELETE_TASK: 'delete-task',
      GET_TASKS: 'get-tasks',
    },
  },

  ACTIVITY_LOG: {
    GET_ALL_ACTIVITIES: 'get-all-activities',
    ACTIVITY_LOG: 'activity-log',
  },

  IMPORT_FILE: {
    CREATE_IMPORT_FILE: 'create-import-file',
  },

  CUSTOMIZED_COLUMNS: {
    GET_CUSTOMIZE_COLUMN: 'get-customize-column',
    CREATE_OR_UPDATE_CUSTOMIZE_COLUMN: 'create-or-update-customize-column',
  },
  COMPANY: {
    CREATE: 'create-marketing-company',
    GET: 'get-marketing-company',
    DETAIL: 'marketing-company-detail',
    UPDATE: 'update-marketing-company',
    DELETE: 'delete-marketing-company',
    GET_DELETED: 'get-deleted-company',
    CREATE_CUSTOMIZE_COLUMN: 'create-customize-column',
    GET_CUSTOMIZE_COLUMN: 'get-customize-column',
  },
  DROPDOWNS: {
    ORGANIZATIONS_DROPDOWN: 'organization-dropdown',
    PRODUCTS_DROPDOWN: 'products-dropdown',
    ORG_EMPLOYEES: 'org-employees-dropdown',
    ORG_COMPANIES: 'org-companies-dropdown',
  },
  COMMON_FEATURES: {
    COMPANIES: {
      DELETE_COMPANIES: 'delete-companies',
      GET_UNIQUE_COMPANIES_OWNERS: 'get-unique-companies-owners',
      CHANGE_COMPANY_OWNER: 'change-company-owner',
      GET_COMPANY_DETIALS: 'get-company-details',
    },
    NOTES: {
      CREATE_NOTE: 'create-deal-note',
      GET_NOTES: 'get-deal-notes',
      GET_NOTE: 'get-deal-note',
      UPDATE_NOTE: 'update-deal-note',
      DELETE_NOTE: 'delete-deal-note',
    },
  },
};
