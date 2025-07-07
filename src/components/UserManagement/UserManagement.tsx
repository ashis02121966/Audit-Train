import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  UserPlus,
  Shield,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { User } from '../../types';

export const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock users data
  const users: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      firstName: 'System',
      lastName: 'Administrator',
      phone: '+1234567890',
      role: 'admin',
      status: 'active',
      jurisdictionCode: 'ALL',
      createdAt: '2025-01-01T10:00:00Z',
      lastLogin: '2025-01-12T08:30:00Z'
    },
    {
      id: '2',
      username: 'zo_north',
      email: 'zo.north@example.com',
      firstName: 'John',
      lastName: 'Smith',
      phone: '+1234567891',
      role: 'zo',
      status: 'active',
      jurisdictionCode: 'ZO_NORTH',
      createdAt: '2025-01-02T14:30:00Z',
      lastLogin: '2025-01-11T16:45:00Z'
    },
    {
      id: '3',
      username: 'ro_region1',
      email: 'ro.region1@example.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1234567892',
      role: 'ro',
      status: 'active',
      parentUserId: '2',
      jurisdictionCode: 'RO_REG1',
      createdAt: '2025-01-03T09:15:00Z',
      lastLogin: '2025-01-12T07:20:00Z'
    },
    {
      id: '4',
      username: 'supervisor_001',
      email: 'supervisor001@example.com',
      firstName: 'Mike',
      lastName: 'Wilson',
      phone: '+1234567893',
      role: 'supervisor',
      status: 'active',
      parentUserId: '3',
      jurisdictionCode: 'SUP_001',
      createdAt: '2025-01-04T11:20:00Z',
      lastLogin: '2025-01-10T14:30:00Z'
    },
    {
      id: '5',
      username: 'enum_001',
      email: 'enum001@example.com',
      firstName: 'Alice',
      lastName: 'Brown',
      phone: '+1234567894',
      role: 'enumerator',
      status: 'active',
      parentUserId: '4',
      jurisdictionCode: 'ENUM_001',
      createdAt: '2025-01-05T13:45:00Z',
      lastLogin: '2025-01-12T09:15:00Z'
    },
    {
      id: '6',
      username: 'enum_002',
      email: 'enum002@example.com',
      firstName: 'David',
      lastName: 'Davis',
      phone: '+1234567895',
      role: 'enumerator',
      status: 'suspended',
      parentUserId: '4',
      jurisdictionCode: 'ENUM_002',
      createdAt: '2025-01-06T10:30:00Z',
      lastLogin: '2025-01-08T12:00:00Z'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-700 bg-purple-100';
      case 'zo': return 'text-blue-700 bg-blue-100';
      case 'ro': return 'text-green-700 bg-green-100';
      case 'supervisor': return 'text-orange-700 bg-orange-100';
      case 'enumerator': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-100';
      case 'inactive': return 'text-gray-700 bg-gray-100';
      case 'suspended': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <XCircle className="w-4 h-4" />;
      case 'suspended': return <AlertTriangle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'zo': return 'Zonal Officer';
      case 'ro': return 'Regional Officer';
      case 'supervisor': return 'Supervisor';
      case 'enumerator': return 'Enumerator';
      default: return role;
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowCreateModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowCreateModal(true);
  };

  const handleDeleteUser = (user: User) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete user "${user.firstName} ${user.lastName}"?\n\n` +
      `This action cannot be undone.`
    );
    if (confirmed) {
      alert(`User "${user.firstName} ${user.lastName}" has been deleted.`);
    }
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    const action = newStatus === 'active' ? 'activate' : 'suspend';
    
    const confirmed = window.confirm(
      `Are you sure you want to ${action} user "${user.firstName} ${user.lastName}"?`
    );
    
    if (confirmed) {
      alert(`User "${user.firstName} ${user.lastName}" has been ${action}d.`);
    }
  };

  const stats = [
    { title: 'Total Users', value: users.length.toString(), icon: Users, color: 'blue' },
    { title: 'Active Users', value: users.filter(u => u.status === 'active').length.toString(), icon: CheckCircle, color: 'green' },
    { title: 'Suspended Users', value: users.filter(u => u.status === 'suspended').length.toString(), icon: AlertTriangle, color: 'red' },
    { title: 'Administrators', value: users.filter(u => u.role === 'admin').length.toString(), icon: Shield, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button 
          onClick={handleCreateUser}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrator</option>
              <option value="zo">Zonal Officer</option>
              <option value="ro">Regional Officer</option>
              <option value="supervisor">Supervisor</option>
              <option value="enumerator">Enumerator</option>
            </select>
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jurisdiction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="capitalize">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.jurisdictionCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => alert(`Viewing details for ${user.firstName} ${user.lastName}`)}
                        className="text-gray-400 hover:text-blue-600 p-1 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-gray-400 hover:text-green-600 p-1 rounded"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className={`p-1 rounded ${
                          user.status === 'active' 
                            ? 'text-gray-400 hover:text-red-600' 
                            : 'text-gray-400 hover:text-green-600'
                        }`}
                        title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                      >
                        {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Create/Edit User Modal would go here */}
      {showCreateModal && (
        <UserFormModal
          user={selectedUser}
          onClose={() => setShowCreateModal(false)}
          onSave={(userData) => {
            console.log('Saving user:', userData);
            setShowCreateModal(false);
            alert(`User ${selectedUser ? 'updated' : 'created'} successfully!`);
          }}
        />
      )}
    </div>
  );
};

// User Form Modal Component
interface UserFormModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (userData: Partial<User>) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'enumerator',
    status: user?.status || 'active',
    jurisdictionCode: user?.jurisdictionCode || '',
    parentUserId: user?.parentUserId || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {user ? 'Edit User' : 'Create New User'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="admin">Administrator</option>
                <option value="zo">Zonal Officer</option>
                <option value="ro">Regional Officer</option>
                <option value="supervisor">Supervisor</option>
                <option value="enumerator">Enumerator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jurisdiction Code
            </label>
            <input
              type="text"
              value={formData.jurisdictionCode}
              onChange={(e) => setFormData({...formData, jurisdictionCode: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., ZO_NORTH, RO_REG1"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
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
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};