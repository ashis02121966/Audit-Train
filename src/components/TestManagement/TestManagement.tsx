import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BarChart3,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

interface TestAttempt {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  surveyId: string;
  surveyName: string;
  attemptNumber: number;
  status: 'in-progress' | 'completed' | 'expired' | 'abandoned';
  startTime: string;
  endTime?: string;
  score?: number;
  passStatus?: boolean;
  currentQuestion?: number;
  totalQuestions: number;
  timeSpent?: number;
  ipAddress?: string;
}

export const TestManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [surveyFilter, setSurveyFilter] = useState('all');
  const [selectedAttempt, setSelectedAttempt] = useState<TestAttempt | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock data
  const testAttempts: TestAttempt[] = [
    {
      id: '1',
      userId: 'enum_001',
      userName: 'Alice Brown',
      userEmail: 'alice.brown@example.com',
      surveyId: '1',
      surveyName: 'Data Collection Methodology Assessment',
      attemptNumber: 1,
      status: 'completed',
      startTime: '2025-01-12T09:00:00Z',
      endTime: '2025-01-12T09:32:00Z',
      score: 85,
      passStatus: true,
      totalQuestions: 30,
      timeSpent: 32,
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      userId: 'enum_002',
      userName: 'David Davis',
      userEmail: 'david.davis@example.com',
      surveyId: '1',
      surveyName: 'Data Collection Methodology Assessment',
      attemptNumber: 1,
      status: 'in-progress',
      startTime: '2025-01-12T10:15:00Z',
      currentQuestion: 15,
      totalQuestions: 30,
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      userId: 'enum_003',
      userName: 'Sarah Wilson',
      userEmail: 'sarah.wilson@example.com',
      surveyId: '2',
      surveyName: 'Statistical Analysis Fundamentals',
      attemptNumber: 2,
      status: 'completed',
      startTime: '2025-01-11T14:30:00Z',
      endTime: '2025-01-11T15:05:00Z',
      score: 62,
      passStatus: false,
      totalQuestions: 35,
      timeSpent: 35,
      ipAddress: '192.168.1.102'
    },
    {
      id: '4',
      userId: 'enum_004',
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@example.com',
      surveyId: '1',
      surveyName: 'Data Collection Methodology Assessment',
      attemptNumber: 1,
      status: 'expired',
      startTime: '2025-01-10T16:00:00Z',
      endTime: '2025-01-10T16:35:00Z',
      currentQuestion: 20,
      totalQuestions: 30,
      ipAddress: '192.168.1.103'
    },
    {
      id: '5',
      userId: 'enum_005',
      userName: 'Emma Thompson',
      userEmail: 'emma.thompson@example.com',
      surveyId: '3',
      surveyName: 'Quality Control Procedures',
      attemptNumber: 1,
      status: 'completed',
      startTime: '2025-01-09T11:00:00Z',
      endTime: '2025-01-09T11:28:00Z',
      score: 92,
      passStatus: true,
      totalQuestions: 25,
      timeSpent: 28,
      ipAddress: '192.168.1.104'
    }
  ];

  const surveys = [
    { id: 'all', name: 'All Surveys' },
    { id: '1', name: 'Data Collection Methodology Assessment' },
    { id: '2', name: 'Statistical Analysis Fundamentals' },
    { id: '3', name: 'Quality Control Procedures' }
  ];

  const filteredAttempts = testAttempts.filter(attempt => {
    const matchesSearch = attempt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attempt.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attempt.surveyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || attempt.status === statusFilter;
    const matchesSurvey = surveyFilter === 'all' || attempt.surveyId === surveyFilter;
    return matchesSearch && matchesStatus && matchesSurvey;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-100';
      case 'in-progress': return 'text-blue-700 bg-blue-100';
      case 'expired': return 'text-red-700 bg-red-100';
      case 'abandoned': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'expired': return <XCircle className="w-4 h-4" />;
      case 'abandoned': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (attempt: TestAttempt) => {
    setSelectedAttempt(attempt);
    setShowDetailsModal(true);
  };

  const handleTerminateSession = (attempt: TestAttempt) => {
    const confirmed = window.confirm(
      `Are you sure you want to terminate the test session for ${attempt.userName}?\n\n` +
      `This will end their current test and they will need to start a new attempt.`
    );
    
    if (confirmed) {
      alert(`Test session terminated for ${attempt.userName}`);
    }
  };

  const handleExtendTime = (attempt: TestAttempt) => {
    const minutes = prompt('Enter additional minutes to extend:', '10');
    if (minutes && !isNaN(parseInt(minutes))) {
      alert(`Extended test time by ${minutes} minutes for ${attempt.userName}`);
    }
  };

  const stats = [
    { 
      title: 'Total Attempts', 
      value: testAttempts.length.toString(), 
      icon: Users, 
      color: 'blue' 
    },
    { 
      title: 'In Progress', 
      value: testAttempts.filter(a => a.status === 'in-progress').length.toString(), 
      icon: Clock, 
      color: 'orange' 
    },
    { 
      title: 'Completed', 
      value: testAttempts.filter(a => a.status === 'completed').length.toString(), 
      icon: CheckCircle, 
      color: 'green' 
    },
    { 
      title: 'Average Score', 
      value: Math.round(
        testAttempts
          .filter(a => a.score !== undefined)
          .reduce((sum, a) => sum + (a.score || 0), 0) / 
        testAttempts.filter(a => a.score !== undefined).length
      ).toString() + '%', 
      icon: BarChart3, 
      color: 'purple' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Test Management</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
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
              placeholder="Search by user name, email, or survey..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={surveyFilter}
              onChange={(e) => setSurveyFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {surveys.map(survey => (
                <option key={survey.id} value={survey.id}>{survey.name}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
              <option value="abandoned">Abandoned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Test Attempts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Survey
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attempt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{attempt.userName}</div>
                      <div className="text-sm text-gray-500">{attempt.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{attempt.surveyName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">#{attempt.attemptNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(attempt.status)}`}>
                      {getStatusIcon(attempt.status)}
                      <span className="capitalize">{attempt.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {attempt.status === 'in-progress' ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${((attempt.currentQuestion || 0) / attempt.totalQuestions) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">
                          {attempt.currentQuestion}/{attempt.totalQuestions}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">
                        {attempt.totalQuestions} questions
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {attempt.score !== undefined ? (
                      <span className={`text-sm font-medium ${
                        attempt.passStatus ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {attempt.score}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {attempt.timeSpent ? `${attempt.timeSpent}m` : 'In progress'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(attempt.startTime).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewDetails(attempt)}
                        className="text-gray-400 hover:text-blue-600 p-1 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {attempt.status === 'in-progress' && (
                        <>
                          <button
                            onClick={() => handleExtendTime(attempt)}
                            className="text-gray-400 hover:text-green-600 p-1 rounded"
                            title="Extend Time"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleTerminateSession(attempt)}
                            className="text-gray-400 hover:text-red-600 p-1 rounded"
                            title="Terminate Session"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAttempts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No test attempts found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Test Details Modal */}
      {showDetailsModal && selectedAttempt && (
        <TestDetailsModal
          attempt={selectedAttempt}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

// Test Details Modal Component
interface TestDetailsModalProps {
  attempt: TestAttempt;
  onClose: () => void;
}

const TestDetailsModal: React.FC<TestDetailsModalProps> = ({ attempt, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Test Attempt Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* User Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">User Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{attempt.userName}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{attempt.userEmail}</span>
              </div>
              <div>
                <span className="text-gray-600">User ID:</span>
                <span className="ml-2 font-medium">{attempt.userId}</span>
              </div>
              <div>
                <span className="text-gray-600">IP Address:</span>
                <span className="ml-2 font-medium">{attempt.ipAddress}</span>
              </div>
            </div>
          </div>

          {/* Test Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Test Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Survey:</span>
                <span className="ml-2 font-medium">{attempt.surveyName}</span>
              </div>
              <div>
                <span className="text-gray-600">Attempt Number:</span>
                <span className="ml-2 font-medium">#{attempt.attemptNumber}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(attempt.status)}`}>
                  {attempt.status.replace('-', ' ')}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Total Questions:</span>
                <span className="ml-2 font-medium">{attempt.totalQuestions}</span>
              </div>
            </div>
          </div>

          {/* Timing Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Timing Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Start Time:</span>
                <span className="ml-2 font-medium">
                  {new Date(attempt.startTime).toLocaleString()}
                </span>
              </div>
              {attempt.endTime && (
                <div>
                  <span className="text-gray-600">End Time:</span>
                  <span className="ml-2 font-medium">
                    {new Date(attempt.endTime).toLocaleString()}
                  </span>
                </div>
              )}
              {attempt.timeSpent && (
                <div>
                  <span className="text-gray-600">Time Spent:</span>
                  <span className="ml-2 font-medium">{attempt.timeSpent} minutes</span>
                </div>
              )}
              {attempt.currentQuestion && (
                <div>
                  <span className="text-gray-600">Current Question:</span>
                  <span className="ml-2 font-medium">
                    {attempt.currentQuestion} of {attempt.totalQuestions}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Results Information */}
          {attempt.score !== undefined && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Results</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Score:</span>
                  <span className={`ml-2 font-medium ${
                    attempt.passStatus ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {attempt.score}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Result:</span>
                  <span className={`ml-2 font-medium ${
                    attempt.passStatus ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {attempt.passStatus ? 'PASSED' : 'FAILED'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar for In-Progress Tests */}
          {attempt.status === 'in-progress' && attempt.currentQuestion && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Questions Completed</span>
                  <span>{attempt.currentQuestion} of {attempt.totalQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${(attempt.currentQuestion / attempt.totalQuestions) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  {Math.round((attempt.currentQuestion / attempt.totalQuestions) * 100)}% Complete
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function for status colors (duplicate from main component for modal use)
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-700 bg-green-100';
    case 'in-progress': return 'text-blue-700 bg-blue-100';
    case 'expired': return 'text-red-700 bg-red-100';
    case 'abandoned': return 'text-gray-700 bg-gray-100';
    default: return 'text-gray-700 bg-gray-100';
  }
};