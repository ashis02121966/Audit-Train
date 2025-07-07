import React from 'react';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Award, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AdminDashboard: React.FC = () => {
  // Mock data
  const stats = [
    { title: 'Total Users', value: '1,247', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Active Surveys', value: '23', change: '+3', icon: FileText, color: 'green' },
    { title: 'Tests Completed', value: '3,891', change: '+156', icon: CheckCircle, color: 'purple' },
    { title: 'Certificates Issued', value: '2,156', change: '+89', icon: Award, color: 'orange' },
  ];

  const performanceData = [
    { month: 'Jan', tests: 245, passed: 198 },
    { month: 'Feb', tests: 312, passed: 267 },
    { month: 'Mar', tests: 389, passed: 334 },
    { month: 'Apr', tests: 421, passed: 361 },
    { month: 'May', tests: 456, passed: 392 },
    { month: 'Jun', tests: 523, passed: 478 },
  ];

  const roleDistribution = [
    { name: 'Enumerators', value: 789, color: '#3B82F6' },
    { name: 'Supervisors', value: 156, color: '#10B981' },
    { name: 'RO/ZO', value: 45, color: '#F59E0B' },
    { name: 'Admins', value: 12, color: '#EF4444' },
  ];

  const recentActivities = [
    { id: 1, action: 'New survey created', user: 'Admin User', time: '2 hours ago', type: 'create' },
    { id: 2, action: 'Question bank updated', user: 'John Doe', time: '4 hours ago', type: 'update' },
    { id: 3, action: 'Certificate generated', user: 'System', time: '6 hours ago', type: 'generate' },
    { id: 4, action: 'User registration', user: 'Jane Smith', time: '8 hours ago', type: 'register' },
  ];

  return (
    <div className="space-y-6">
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
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Test Performance</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Total Tests</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Passed</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tests" fill="#3B82F6" />
              <Bar dataKey="passed" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">User Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {roleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {roleDistribution.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'create' ? 'bg-green-500' :
                  activity.type === 'update' ? 'bg-blue-500' :
                  activity.type === 'generate' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};