import React, { useState } from 'react';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users,
  Settings,
  Lock,
  Unlock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  createdAt: string;
}

export const RoleManagement: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock permissions data
  const permissions: Permission[] = [
    // Dashboard Permissions
    { id: 'dashboard.view', name: 'View Dashboard', description: 'Access to dashboard overview', category: 'Dashboard' },
    { id: 'dashboard.admin', name: 'Admin Dashboard', description: 'Access to administrative dashboard', category: 'Dashboard' },
    
    // User Management Permissions
    { id: 'users.view', name: 'View Users', description: 'View user list and details', category: 'User Management' },
    { id: 'users.create', name: 'Create Users', description: 'Create new user accounts', category: 'User Management' },
    { id: 'users.edit', name: 'Edit Users', description: 'Modify user information', category: 'User Management' },
    { id: 'users.delete', name: 'Delete Users', description: 'Remove user accounts', category: 'User Management' },
    { id: 'users.manage_roles', name: 'Manage User Roles', description: 'Assign and modify user roles', category: 'User Management' },
    
    // Survey Management Permissions
    { id: 'surveys.view', name: 'View Surveys', description: 'View survey list and details', category: 'Survey Management' },
    { id: 'surveys.create', name: 'Create Surveys', description: 'Create new surveys', category: 'Survey Management' },
    { id: 'surveys.edit', name: 'Edit Surveys', description: 'Modify survey configuration', category: 'Survey Management' },
    { id: 'surveys.delete', name: 'Delete Surveys', description: 'Remove surveys', category: 'Survey Management' },
    { id: 'surveys.publish', name: 'Publish Surveys', description: 'Activate and publish surveys', category: 'Survey Management' },
    
    // Question Bank Permissions
    { id: 'questions.view', name: 'View Questions', description: 'View question bank', category: 'Question Management' },
    { id: 'questions.create', name: 'Create Questions', description: 'Add new questions', category: 'Question Management' },
    { id: 'questions.edit', name: 'Edit Questions', description: 'Modify existing questions', category: 'Question Management' },
    { id: 'questions.delete', name: 'Delete Questions', description: 'Remove questions', category: 'Question Management' },
    { id: 'questions.import', name: 'Import Questions', description: 'Bulk import questions', category: 'Question Management' },
    
    // Test Management Permissions
    { id: 'tests.take', name: 'Take Tests', description: 'Participate in assessments', category: 'Test Management' },
    { id: 'tests.view_results', name: 'View Test Results', description: 'View own test results', category: 'Test Management' },
    { id: 'tests.view_all_results', name: 'View All Results', description: 'View all user test results', category: 'Test Management' },
    { id: 'tests.manage_sessions', name: 'Manage Test Sessions', description: 'Control test sessions', category: 'Test Management' },
    
    // Certificate Permissions
    { id: 'certificates.view', name: 'View Certificates', description: 'View own certificates', category: 'Certificates' },
    { id: 'certificates.view_all', name: 'View All Certificates', description: 'View all user certificates', category: 'Certificates' },
    { id: 'certificates.generate', name: 'Generate Certificates', description: 'Create and issue certificates', category: 'Certificates' },
    { id: 'certificates.revoke', name: 'Revoke Certificates', description: 'Revoke issued certificates', category: 'Certificates' },
    
    // Reporting Permissions
    { id: 'reports.view', name: 'View Reports', description: 'Access reporting dashboard', category: 'Reporting' },
    { id: 'reports.export', name: 'Export Reports', description: 'Export report data', category: 'Reporting' },
    { id: 'reports.advanced', name: 'Advanced Reports', description: 'Access advanced reporting features', category: 'Reporting' },
    
    // System Permissions
    { id: 'system.settings', name: 'System Settings', description: 'Manage system configuration', category: 'System' },
    { id: 'system.audit', name: 'Audit Logs', description: 'View system audit logs', category: 'System' },
    { id: 'system.backup', name: 'Backup Management', description: 'Manage system backups', category: 'System' },
    
    // Role Management Permissions
    { id: 'roles.view', name: 'View Roles', description: 'View role definitions', category: 'Role Management' },
    { id: 'roles.create', name: 'Create Roles', description: 'Create new roles', category: 'Role Management' },
    { id: 'roles.edit', name: 'Edit Roles', description: 'Modify role permissions', category: 'Role Management' },
    { id: 'roles.delete', name: 'Delete Roles', description: 'Remove custom roles', category: 'Role Management' }
  ];

  // Mock roles data
  const roles: Role[] = [
    {
      id: '1',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      permissions: permissions.map(p => p.id), // All permissions
      userCount: 2,
      isSystem: true,
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      id: '2',
      name: 'Zonal Officer',
      description: 'Regional management with user oversight capabilities',
      permissions: [
        'dashboard.view', 'dashboard.admin',
        'users.view', 'users.create', 'users.edit', 'users.manage_roles',
        'surveys.view', 'surveys.create', 'surveys.edit', 'surveys.publish',
        'questions.view', 'questions.create', 'questions.edit', 'questions.import',
        'tests.view_all_results', 'tests.manage_sessions',
        'certificates.view_all', 'certificates.generate',
        'reports.view', 'reports.export', 'reports.advanced',
        'roles.view'
      ],
      userCount: 5,
      isSystem: true,
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      id: '3',
      name: 'Regional Officer',
      description: 'Regional coordination with limited administrative access',
      permissions: [
        'dashboard.view',
        'users.view', 'users.create', 'users.edit',
        'surveys.view',
        'questions.view',
        'tests.view_all_results',
        'certificates.view_all',
        'reports.view', 'reports.export'
      ],
      userCount: 12,
      isSystem: true,
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      id: '4',
      name: 'Supervisor',
      description: 'Team supervision with basic management capabilities',
      permissions: [
        'dashboard.view',
        'users.view',
        'surveys.view',
        'questions.view',
        'tests.view_all_results',
        'certificates.view_all',
        'reports.view'
      ],
      userCount: 25,
      isSystem: true,
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      id: '5',
      name: 'Enumerator',
      description: 'Basic user access for taking tests and viewing results',
      permissions: [
        'dashboard.view',
        'tests.take',
        'tests.view_results',
        'certificates.view'
      ],
      userCount: 156,
      isSystem: true,
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      id: '6',
      name: 'Survey Manager',
      description: 'Custom role for survey content management',
      permissions: [
        'dashboard.view',
        'surveys.view', 'surveys.create', 'surveys.edit', 'surveys.publish',
        'questions.view', 'questions.create', 'questions.edit', 'questions.import',
        'reports.view', 'reports.export'
      ],
      userCount: 3,
      isSystem: false,
      createdAt: '2025-01-05T14:30:00Z'
    }
  ];

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handleCreateRole = () => {
    setSelectedRole(null);
    setShowCreateModal(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setShowCreateModal(true);
  };

  const handleDeleteRole = (role: Role) => {
    if (role.isSystem) {
      alert('System roles cannot be deleted.');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the role "${role.name}"?\n\n` +
      `This will affect ${role.userCount} users. This action cannot be undone.`
    );
    
    if (confirmed) {
      alert(`Role "${role.name}" has been deleted.`);
    }
  };

  const handleDuplicateRole = (role: Role) => {
    const newRole = {
      ...role,
      id: '',
      name: `${role.name} (Copy)`,
      isSystem: false,
      userCount: 0
    };
    setSelectedRole(newRole);
    setShowCreateModal(true);
  };

  const stats = [
    { title: 'Total Roles', value: roles.length.toString(), icon: Shield, color: 'blue' },
    { title: 'System Roles', value: roles.filter(r => r.isSystem).length.toString(), icon: Lock, color: 'purple' },
    { title: 'Custom Roles', value: roles.filter(r => !r.isSystem).length.toString(), icon: Unlock, color: 'green' },
    { title: 'Total Permissions', value: permissions.length.toString(), icon: Settings, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
        <button 
          onClick={handleCreateRole}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Role</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roles Grid */}
      <div className="grid gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  {role.isSystem && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      System Role
                    </span>
                  )}
                  <span className="flex items-center space-x-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{role.userCount} users</span>
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{role.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Permissions ({role.permissions.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 8).map((permissionId) => {
                      const permission = permissions.find(p => p.id === permissionId);
                      return permission ? (
                        <span
                          key={permissionId}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                          {permission.name}
                        </span>
                      ) : null;
                    })}
                    {role.permissions.length > 8 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{role.permissions.length - 8} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Created: {new Date(role.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-6">
                <button
                  onClick={() => alert(`Viewing details for role: ${role.name}`)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDuplicateRole(role)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Duplicate Role"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditRole(role)}
                  className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  title="Edit Role"
                >
                  <Edit className="w-4 h-4" />
                </button>
                {!role.isSystem && (
                  <button
                    onClick={() => handleDeleteRole(role)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Role Modal */}
      {showCreateModal && (
        <RoleFormModal
          role={selectedRole}
          permissions={permissions}
          groupedPermissions={groupedPermissions}
          onClose={() => setShowCreateModal(false)}
          onSave={(roleData) => {
            console.log('Saving role:', roleData);
            setShowCreateModal(false);
            alert(`Role ${selectedRole ? 'updated' : 'created'} successfully!`);
          }}
        />
      )}
    </div>
  );
};

// Role Form Modal Component
interface RoleFormModalProps {
  role: Role | null;
  permissions: Permission[];
  groupedPermissions: Record<string, Permission[]>;
  onClose: () => void;
  onSave: (roleData: Partial<Role>) => void;
}

const RoleFormModal: React.FC<RoleFormModalProps> = ({ 
  role, 
  permissions, 
  groupedPermissions, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || []
  });

  const handlePermissionToggle = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    const categoryPermissions = groupedPermissions[category].map(p => p.id);
    const allSelected = categoryPermissions.every(id => formData.permissions.includes(id));
    
    setFormData(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter(id => !categoryPermissions.includes(id))
        : [...new Set([...prev.permissions, ...categoryPermissions])]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {role ? 'Edit Role' : 'Create New Role'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selected Permissions
              </label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">
                {formData.permissions.length} of {permissions.length} permissions
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Permissions
            </label>
            <div className="space-y-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => {
                const allSelected = categoryPermissions.every(p => formData.permissions.includes(p.id));
                const someSelected = categoryPermissions.some(p => formData.permissions.includes(p.id));
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(input) => {
                          if (input) input.indeterminate = someSelected && !allSelected;
                        }}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <label className="font-medium text-gray-900">{category}</label>
                      <span className="text-sm text-gray-500">
                        ({categoryPermissions.filter(p => formData.permissions.includes(p.id)).length}/{categoryPermissions.length})
                      </span>
                    </div>
                    <div className="ml-6 space-y-1">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(permission.id)}
                            onChange={() => handlePermissionToggle(permission.id)}
                            className="w-4 h-4 text-blue-600 rounded mt-0.5"
                          />
                          <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700">
                              {permission.name}
                            </label>
                            <p className="text-xs text-gray-500">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {role ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};