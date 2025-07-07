import React from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  Award,
  BookOpen,
  Clock,
  UserCheck,
  Database,
  Shield,
  ClipboardList,
  FileSearch
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getMenuItemsForUser } from '../../utils/rolePermissions';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const iconMap = {
  Home,
  FileText,
  Users,
  BarChart3,
  Settings,
  Award,
  BookOpen,
  Clock,
  UserCheck,
  Database,
  Shield,
  ClipboardList,
  FileSearch
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  if (!user) return null;

  // Get menu items based on user role and permissions
  const allowedMenuItems = getMenuItemsForUser(user.role);

  const menuItems = allowedMenuItems.map(item => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;
    return {
      id: item.id,
      label: item.label,
      icon: IconComponent
    };
  });

  return (
    <div className="bg-white shadow-lg h-full w-64 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">eSigma Portal</h1>
        <p className="text-sm text-gray-600 mt-1">Survey Management System</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-700">
              {user?.firstName.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};