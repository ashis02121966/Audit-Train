// Role-based permission system
export interface MenuPermission {
  id: string;
  label: string;
  icon: string;
  requiredPermissions: string[];
  roles: string[];
}

export const menuPermissions: MenuPermission[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'Home',
    requiredPermissions: ['dashboard.view'],
    roles: ['admin', 'zo', 'ro', 'supervisor', 'enumerator']
  },
  {
    id: 'users',
    label: 'User Management',
    icon: 'Users',
    requiredPermissions: ['users.view'],
    roles: ['admin', 'zo', 'ro']
  },
  {
    id: 'roles',
    label: 'Role Management',
    icon: 'Shield',
    requiredPermissions: ['roles.view'],
    roles: ['admin']
  },
  {
    id: 'surveys',
    label: 'Survey Management',
    icon: 'FileText',
    requiredPermissions: ['surveys.view'],
    roles: ['admin', 'zo', 'ro']
  },
  {
    id: 'questions',
    label: 'Question Bank',
    icon: 'BookOpen',
    requiredPermissions: ['questions.view'],
    roles: ['admin', 'zo', 'ro']
  },
  {
    id: 'my-tests',
    label: 'My Tests',
    icon: 'Clock',
    requiredPermissions: ['tests.take'],
    roles: ['enumerator']
  },
  {
    id: 'test-management',
    label: 'Test Management',
    icon: 'ClipboardList',
    requiredPermissions: ['tests.manage_sessions'],
    roles: ['admin', 'zo', 'ro', 'supervisor']
  },
  {
    id: 'results',
    label: 'Results & Reports',
    icon: 'BarChart3',
    requiredPermissions: ['reports.view'],
    roles: ['admin', 'zo', 'ro', 'supervisor']
  },
  {
    id: 'my-results',
    label: 'My Results',
    icon: 'BarChart3',
    requiredPermissions: ['tests.view_results'],
    roles: ['enumerator']
  },
  {
    id: 'certificates',
    label: 'Certificates',
    icon: 'Award',
    requiredPermissions: ['certificates.view_all'],
    roles: ['admin', 'zo', 'ro', 'supervisor']
  },
  {
    id: 'my-certificates',
    label: 'My Certificates',
    icon: 'Award',
    requiredPermissions: ['certificates.view'],
    roles: ['enumerator']
  },
  {
    id: 'team-results',
    label: 'Team Results',
    icon: 'BarChart3',
    requiredPermissions: ['tests.view_all_results'],
    roles: ['zo', 'ro', 'supervisor']
  },
  {
    id: 'enumerators',
    label: 'My Enumerators',
    icon: 'UserCheck',
    requiredPermissions: ['users.view'],
    roles: ['supervisor', 'ro', 'zo']
  },
  {
    id: 'system',
    label: 'System Settings',
    icon: 'Settings',
    requiredPermissions: ['system.settings'],
    roles: ['admin']
  },
  {
    id: 'audit',
    label: 'Audit Logs',
    icon: 'FileSearch',
    requiredPermissions: ['system.audit'],
    roles: ['admin']
  }
];

// Default role permissions mapping
export const defaultRolePermissions: Record<string, string[]> = {
  admin: [
    // All permissions
    'dashboard.view', 'dashboard.admin',
    'users.view', 'users.create', 'users.edit', 'users.delete', 'users.manage_roles',
    'surveys.view', 'surveys.create', 'surveys.edit', 'surveys.delete', 'surveys.publish',
    'questions.view', 'questions.create', 'questions.edit', 'questions.delete', 'questions.import',
    'tests.take', 'tests.view_results', 'tests.view_all_results', 'tests.manage_sessions',
    'certificates.view', 'certificates.view_all', 'certificates.generate', 'certificates.revoke',
    'reports.view', 'reports.export', 'reports.advanced',
    'system.settings', 'system.audit', 'system.backup',
    'roles.view', 'roles.create', 'roles.edit', 'roles.delete'
  ],
  zo: [
    'dashboard.view', 'dashboard.admin',
    'users.view', 'users.create', 'users.edit', 'users.manage_roles',
    'surveys.view', 'surveys.create', 'surveys.edit', 'surveys.publish',
    'questions.view', 'questions.create', 'questions.edit', 'questions.import',
    'tests.view_all_results', 'tests.manage_sessions',
    'certificates.view_all', 'certificates.generate',
    'reports.view', 'reports.export', 'reports.advanced',
    'roles.view'
  ],
  ro: [
    'dashboard.view',
    'users.view', 'users.create', 'users.edit',
    'surveys.view',
    'questions.view',
    'tests.view_all_results',
    'certificates.view_all',
    'reports.view', 'reports.export'
  ],
  supervisor: [
    'dashboard.view',
    'users.view',
    'surveys.view',
    'questions.view',
    'tests.view_all_results',
    'certificates.view_all',
    'reports.view'
  ],
  enumerator: [
    'dashboard.view',
    'tests.take',
    'tests.view_results',
    'certificates.view'
  ]
};

// Check if user has permission
export const hasPermission = (userRole: string, permission: string, userPermissions?: string[]): boolean => {
  // If custom permissions are provided, use them
  if (userPermissions) {
    return userPermissions.includes(permission);
  }
  
  // Otherwise, use default role permissions
  const rolePermissions = defaultRolePermissions[userRole] || [];
  return rolePermissions.includes(permission);
};

// Check if user can access menu item
export const canAccessMenu = (userRole: string, menuId: string, userPermissions?: string[]): boolean => {
  const menuItem = menuPermissions.find(item => item.id === menuId);
  if (!menuItem) return false;
  
  // Check if user's role is allowed for this menu
  if (!menuItem.roles.includes(userRole)) return false;
  
  // Check if user has required permissions
  return menuItem.requiredPermissions.every(permission => 
    hasPermission(userRole, permission, userPermissions)
  );
};

// Get filtered menu items for user
export const getMenuItemsForUser = (userRole: string, userPermissions?: string[]): MenuPermission[] => {
  return menuPermissions.filter(item => canAccessMenu(userRole, item.id, userPermissions));
};

// Check if user can perform action
export const canPerformAction = (
  userRole: string, 
  action: string, 
  userPermissions?: string[]
): boolean => {
  return hasPermission(userRole, action, userPermissions);
};