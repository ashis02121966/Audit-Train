import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Filter, 
  Search, 
  Calendar,
  Users,
  TrendingUp,
  Award,
  FileText,
  Eye,
  PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface TestResult {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  surveyId: string;
  surveyName: string;
  attemptNumber: number;
  score: number;
  passStatus: boolean;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: string;
  sectionScores?: Record<string, number>;
}

export const ResultsReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [surveyFilter, setSurveyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock data
  const testResults: TestResult[] = [
    {
      id: '1',
      userId: 'enum_001',
      userName: 'Alice Brown',
      userEmail: 'alice.brown@example.com',
      surveyId: '1',
      surveyName: 'Data Collection Methodology Assessment',
      attemptNumber: 1,
      score: 85,
      passStatus: true,
      totalQuestions: 30,
      correctAnswers: 26,
      timeSpent: 32,
      completedAt: '2025-01-12T09:32:00Z',
      sectionScores: { 'Section A': 90, 'Section B': 80, 'Section C': 85 }
    },
    {
      id: '2',
      userId: 'enum_003',
      userName: 'Sarah Wilson',
      userEmail: 'sarah.wilson@example.com',
      surveyId: '2',
      surveyName: 'Statistical Analysis Fundamentals',
      attemptNumber: 2,
      score: 62,
      passStatus: false,
      totalQuestions: 35,
      correctAnswers: 22,
      timeSpent: 35,
      completedAt: '2025-01-11T15:05:00Z',
      sectionScores: { 'Section A': 70, 'Section B': 55, 'Section C': 60 }
    },
    {
      id: '3',
      userId: 'enum_005',
      userName: 'Emma Thompson',
      userEmail: 'emma.thompson@example.com',
      surveyId: '3',
      surveyName: 'Quality Control Procedures',
      attemptNumber: 1,
      score: 92,
      passStatus: true,
      totalQuestions: 25,
      correctAnswers: 23,
      timeSpent: 28,
      completedAt: '2025-01-09T11:28:00Z',
      sectionScores: { 'Section A': 95, 'Section B': 90, 'Section C': 92 }
    },
    {
      id: '4',
      userId: 'enum_006',
      userName: 'John Smith',
      userEmail: 'john.smith@example.com',
      surveyId: '1',
      surveyName: 'Data Collection Methodology Assessment',
      attemptNumber: 1,
      score: 78,
      passStatus: true,
      totalQuestions: 30,
      correctAnswers: 23,
      timeSpent: 30,
      completedAt: '2025-01-08T14:15:00Z',
      sectionScores: { 'Section A': 80, 'Section B': 75, 'Section C': 80 }
    },
    {
      id: '5',
      userId: 'enum_007',
      userName: 'Lisa Davis',
      userEmail: 'lisa.davis@example.com',
      surveyId: '2',
      surveyName: 'Statistical Analysis Fundamentals',
      attemptNumber: 1,
      score: 88,
      passStatus: true,
      totalQuestions: 35,
      correctAnswers: 31,
      timeSpent: 38,
      completedAt: '2025-01-07T16:45:00Z',
      sectionScores: { 'Section A': 85, 'Section B': 90, 'Section C': 88 }
    }
  ];

  const surveys = [
    { id: 'all', name: 'All Surveys' },
    { id: '1', name: 'Data Collection Methodology Assessment' },
    { id: '2', name: 'Statistical Analysis Fundamentals' },
    { id: '3', name: 'Quality Control Procedures' }
  ];

  const filteredResults = testResults.filter(result => {
    const matchesSearch = result.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.surveyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSurvey = surveyFilter === 'all' || result.surveyId === surveyFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'passed' && result.passStatus) ||
                         (statusFilter === 'failed' && !result.passStatus);
    return matchesSearch && matchesSurvey && matchesStatus;
  });

  // Analytics data
  const scoreDistribution = [
    { range: '0-40', count: 2, color: '#EF4444' },
    { range: '41-60', count: 5, color: '#F59E0B' },
    { range: '61-80', count: 12, color: '#3B82F6' },
    { range: '81-100', count: 18, color: '#10B981' }
  ];

  const surveyPerformance = [
    { survey: 'Data Collection', avgScore: 82, attempts: 45, passRate: 78 },
    { survey: 'Statistical Analysis', avgScore: 75, attempts: 38, passRate: 68 },
    { survey: 'Quality Control', avgScore: 88, attempts: 32, passRate: 85 }
  ];

  const monthlyTrends = [
    { month: 'Sep', tests: 45, avgScore: 76 },
    { month: 'Oct', tests: 52, avgScore: 78 },
    { month: 'Nov', tests: 48, avgScore: 80 },
    { month: 'Dec', tests: 55, avgScore: 82 },
    { month: 'Jan', tests: 38, avgScore: 79 }
  ];

  const handleViewDetails = (result: TestResult) => {
    setSelectedResult(result);
    setShowDetailsModal(true);
  };

  const handleExportResults = () => {
    // Create CSV content
    const csvContent = [
      ['User Name', 'Email', 'Survey', 'Attempt', 'Score', 'Status', 'Correct Answers', 'Total Questions', 'Time Spent', 'Completed At'].join(','),
      ...filteredResults.map(result => [
        result.userName,
        result.userEmail,
        result.surveyName,
        result.attemptNumber,
        result.score,
        result.passStatus ? 'PASSED' : 'FAILED',
        result.correctAnswers,
        result.totalQuestions,
        result.timeSpent,
        new Date(result.completedAt).toLocaleString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test_results_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const stats = [
    { 
      title: 'Total Tests', 
      value: testResults.length.toString(), 
      icon: FileText, 
      color: 'blue' 
    },
    { 
      title: 'Pass Rate', 
      value: Math.round((testResults.filter(r => r.passStatus).length / testResults.length) * 100) + '%', 
      icon: Award, 
      color: 'green' 
    },
    { 
      title: 'Average Score', 
      value: Math.round(testResults.reduce((sum, r) => sum + r.score, 0) / testResults.length) + '%', 
      icon: TrendingUp, 
      color: 'purple' 
    },
    { 
      title: 'Unique Users', 
      value: new Set(testResults.map(r => r.userId)).size.toString(), 
      icon: Users, 
      color: 'orange' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Results & Reports</h2>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportResults}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Results</span>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={scoreDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="count"
              >
                {scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {scoreDistribution.map((item) => (
              <div key={item.range} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.range}%: {item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Survey Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Survey Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={surveyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="survey" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#3B82F6" name="Avg Score %" />
              <Bar dataKey="passRate" fill="#10B981" name="Pass Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tests" stroke="#3B82F6" name="Tests Taken" />
            <Line type="monotone" dataKey="avgScore" stroke="#10B981" name="Average Score" />
          </LineChart>
        </ResponsiveContainer>
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
              <option value="all">All Results</option>
              <option value="passed">Passed Only</option>
              <option value="failed">Failed Only</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="all-time">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
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
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{result.userName}</div>
                      <div className="text-sm text-gray-500">{result.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.surveyName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">#{result.attemptNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      result.passStatus ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      result.passStatus 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.passStatus ? 'PASSED' : 'FAILED'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {result.correctAnswers}/{result.totalQuestions}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((result.correctAnswers / result.totalQuestions) * 100)}% correct
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{result.timeSpent}m</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(result.completedAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(result.completedAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(result)}
                      className="text-gray-400 hover:text-blue-600 p-1 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Result Details Modal */}
      {showDetailsModal && selectedResult && (
        <ResultDetailsModal
          result={selectedResult}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

// Result Details Modal Component
interface ResultDetailsModalProps {
  result: TestResult;
  onClose: () => void;
}

const ResultDetailsModal: React.FC<ResultDetailsModalProps> = ({ result, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Test Result Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Eye className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Overall Result */}
          <div className={`rounded-lg p-6 ${
            result.passStatus ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`text-2xl font-bold ${
                  result.passStatus ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.score}%
                </h4>
                <p className={`text-lg font-medium ${
                  result.passStatus ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.passStatus ? 'PASSED' : 'FAILED'}
                </p>
              </div>
              <div className={`p-4 rounded-full ${
                result.passStatus ? 'bg-green-200' : 'bg-red-200'
              }`}>
                <Award className={`w-8 h-8 ${
                  result.passStatus ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
          </div>

          {/* User and Test Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">User Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{result.userName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{result.userEmail}</span>
                </div>
                <div>
                  <span className="text-gray-600">User ID:</span>
                  <span className="ml-2 font-medium">{result.userId}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Test Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Survey:</span>
                  <span className="ml-2 font-medium">{result.surveyName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Attempt:</span>
                  <span className="ml-2 font-medium">#{result.attemptNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Completed:</span>
                  <span className="ml-2 font-medium">
                    {new Date(result.completedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{result.score}%</div>
                <div className="text-gray-600">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{result.timeSpent}m</div>
                <div className="text-gray-600">Time Spent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
                </div>
                <div className="text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Section-wise Performance */}
          {result.sectionScores && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Section-wise Performance</h4>
              <div className="space-y-3">
                {Object.entries(result.sectionScores).map(([section, score]) => (
                  <div key={section} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{section}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12">{score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Question Breakdown</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-bold text-green-600">{result.correctAnswers}</div>
                <div className="text-xs text-gray-600">Correct</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-bold text-red-600">
                  {result.totalQuestions - result.correctAnswers}
                </div>
                <div className="text-xs text-gray-600">Incorrect</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-bold text-gray-600">{result.totalQuestions}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>
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