import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Users,
  Clock,
  BarChart3
} from 'lucide-react';
import { Survey } from '../../types';

export const SurveyList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const surveys: Survey[] = [
    {
      id: '1',
      name: 'Data Collection Methodology Assessment',
      description: 'Comprehensive assessment covering data collection techniques and field practices',
      durationMinutes: 35,
      totalQuestions: 30,
      passingPercentage: 70,
      maxAttempts: 3,
      targetStartDate: '2025-01-10',
      targetEndDate: '2025-01-20',
      status: 'active',
      createdBy: 'admin',
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      id: '2',
      name: 'Statistical Analysis Fundamentals',
      description: 'Basic statistical concepts and analysis methods for field workers',
      durationMinutes: 40,
      totalQuestions: 35,
      passingPercentage: 75,
      maxAttempts: 3,
      targetStartDate: '2025-01-15',
      targetEndDate: '2025-01-25',
      status: 'draft',
      createdBy: 'admin',
      createdAt: '2025-01-02T14:30:00Z'
    },
    {
      id: '3',
      name: 'Quality Control Procedures',
      description: 'Quality assurance and control procedures for survey operations',
      durationMinutes: 30,
      totalQuestions: 25,
      passingPercentage: 80,
      maxAttempts: 3,
      targetStartDate: '2025-01-20',
      targetEndDate: '2025-01-30',
      status: 'inactive',
      createdBy: 'admin',
      createdAt: '2025-01-03T09:15:00Z'
    }
  ];

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || survey.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-100';
      case 'draft': return 'text-yellow-700 bg-yellow-100';
      case 'inactive': return 'text-gray-700 bg-gray-100';
      case 'archived': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Survey Management</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create Survey</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search surveys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Survey Cards */}
      <div className="grid gap-6">
        {filteredSurveys.map((survey) => (
          <div key={survey.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{survey.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(survey.status)}`}>
                      {survey.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{survey.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{survey.durationMinutes} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <BarChart3 className="w-4 h-4" />
                      <span>{survey.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(survey.targetStartDate!).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{survey.passingPercentage}% to pass</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Created: {new Date(survey.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Max attempts: {survey.maxAttempts}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-6">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSurveys.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};