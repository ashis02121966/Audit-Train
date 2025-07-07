import React, { useState } from 'react';
import { 
  Clock, 
  Award, 
  BookOpen, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  PlayCircle,
  Calendar,
  Download,
  Eye
} from 'lucide-react';

interface EnumeratorDashboardProps {
  onStartTest?: (testId: string) => void;
}

export const EnumeratorDashboard: React.FC<EnumeratorDashboardProps> = ({ onStartTest }) => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  // Mock data
  const myTests = [
    {
      id: '1',
      surveyName: 'Data Collection Methodology Assessment',
      status: 'available',
      dueDate: '2025-01-15',
      duration: 35,
      totalQuestions: 30,
      attemptsLeft: 3,
      description: 'Assessment covering data collection techniques, survey methods, and field practices.'
    },
    {
      id: '2',
      surveyName: 'Statistical Analysis Fundamentals',
      status: 'completed',
      dueDate: '2025-01-10',
      duration: 35,
      totalQuestions: 30,
      score: 85,
      passStatus: true,
      completedAt: '2025-01-08',
      certificateId: 'CERT-2025-001'
    },
    {
      id: '3',
      surveyName: 'Quality Control Procedures',
      status: 'in-progress',
      dueDate: '2025-01-20',
      duration: 35,
      totalQuestions: 30,
      currentQuestion: 15,
      attemptsLeft: 2,
      sessionId: 'SESSION-123'
    }
  ];

  const stats = [
    { title: 'Tests Available', value: '2', icon: BookOpen, color: 'blue' },
    { title: 'Tests Completed', value: '5', icon: CheckCircle, color: 'green' },
    { title: 'Average Score', value: '78%', icon: TrendingUp, color: 'purple' },
    { title: 'Certificates Earned', value: '3', icon: Award, color: 'orange' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-orange-600 bg-orange-50';
      case 'expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleStartTest = (testId: string) => {
    const test = myTests.find(t => t.id === testId);
    if (!test) return;

    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to start "${test.surveyName}"?\n\n` +
      `Duration: ${test.duration} minutes\n` +
      `Questions: ${test.totalQuestions}\n` +
      `Attempts left: ${test.attemptsLeft}\n\n` +
      `Once started, the timer will begin and cannot be paused except for network interruptions.`
    );

    if (confirmed) {
      // In a real app, this would create a new test session and navigate to test interface
      if (onStartTest) {
        onStartTest(testId);
      } else {
        // Fallback: show success message and simulate navigation
        alert(`Starting test "${test.surveyName}"...\n\nRedirecting to test interface...`);
        // Here you would typically use React Router to navigate
        // navigate(`/test/${testId}`);
      }
    }
  };

  const handleResumeTest = (testId: string) => {
    const test = myTests.find(t => t.id === testId);
    if (!test || test.status !== 'in-progress') return;

    const confirmed = window.confirm(
      `Resume "${test.surveyName}"?\n\n` +
      `You will continue from question ${test.currentQuestion} of ${test.totalQuestions}.\n` +
      `Progress: ${Math.round((test.currentQuestion! / test.totalQuestions) * 100)}% completed`
    );

    if (confirmed) {
      // In a real app, this would restore the test session
      if (onStartTest) {
        onStartTest(testId);
      } else {
        alert(`Resuming test from question ${test.currentQuestion}...\n\nRedirecting to test interface...`);
        // navigate(`/test/${testId}/resume`);
      }
    }
  };

  const handleViewCertificate = (testId: string) => {
    const test = myTests.find(t => t.id === testId);
    if (!test || test.status !== 'completed' || !test.passStatus) return;

    // In a real app, this would open the certificate in a new window or download it
    const certificateUrl = `/certificates/${test.certificateId}.pdf`;
    
    // Show options for viewing or downloading
    const action = window.confirm(
      `Certificate for "${test.surveyName}"\n\nScore: ${test.score}% - PASSED\nCertificate ID: ${test.certificateId}\n\nClick OK to view certificate, Cancel to download`
    );

    if (action) {
      // View certificate (open in new tab)
      window.open(certificateUrl, '_blank');
      alert('Certificate opened in new tab');
    } else {
      // Download certificate
      const link = document.createElement('a');
      link.href = certificateUrl;
      link.download = `Certificate_${test.surveyName.replace(/\s+/g, '_')}_${test.certificateId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert('Certificate download started');
    }
  };

  const handleRetakeTest = (testId: string) => {
    const test = myTests.find(t => t.id === testId);
    if (!test) return;

    if (test.attemptsLeft && test.attemptsLeft > 0) {
      const confirmed = window.confirm(
        `Retake "${test.surveyName}"?\n\nThis will start a new attempt.\nAttempts remaining: ${test.attemptsLeft}\n\nYour previous score will be preserved if it was higher.`
      );

      if (confirmed) {
        handleStartTest(testId);
      }
    } else {
      alert('No more attempts available for this test.');
    }
  };

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
          </div>
        ))}
      </div>

      {/* My Tests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">My Tests</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {myTests.map((test) => (
              <div key={test.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{test.surveyName}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(test.status)}`}>
                        {test.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    {test.description && (
                      <p className="text-gray-600 mb-4">{test.description}</p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{test.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{test.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Due: {new Date(test.dueDate).toLocaleDateString()}</span>
                      </div>
                      {test.attemptsLeft !== undefined && (
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{test.attemptsLeft} attempts left</span>
                        </div>
                      )}
                    </div>

                    {test.status === 'completed' && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-800">
                            Completed on {new Date(test.completedAt!).toLocaleDateString()}
                          </span>
                          <span className={`font-semibold ${test.passStatus ? 'text-green-600' : 'text-red-600'}`}>
                            Score: {test.score}% - {test.passStatus ? 'PASSED' : 'FAILED'}
                          </span>
                        </div>
                      </div>
                    )}

                    {test.status === 'in-progress' && (
                      <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-orange-800">
                            Progress: Question {test.currentQuestion} of {test.totalQuestions}
                          </span>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${(test.currentQuestion! / test.totalQuestions) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    {test.status === 'available' && (
                      <button
                        onClick={() => handleStartTest(test.id)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Start Test</span>
                      </button>
                    )}

                    {test.status === 'in-progress' && (
                      <button
                        onClick={() => handleResumeTest(test.id)}
                        className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Resume Test</span>
                      </button>
                    )}

                    {test.status === 'completed' && test.passStatus && (
                      <button
                        onClick={() => handleViewCertificate(test.id)}
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Award className="w-4 h-4" />
                        <span>View Certificate</span>
                      </button>
                    )}

                    {test.status === 'completed' && !test.passStatus && test.attemptsLeft && test.attemptsLeft > 0 && (
                      <button
                        onClick={() => handleRetakeTest(test.id)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Retake Test</span>
                      </button>
                    )}

                    {test.status === 'completed' && (
                      <button
                        onClick={() => {
                          alert(`Detailed results for "${test.surveyName}":\n\nScore: ${test.score}%\nStatus: ${test.passStatus ? 'PASSED' : 'FAILED'}\nCompleted: ${new Date(test.completedAt!).toLocaleString()}`);
                        }}
                        className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Results</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800">Important Notice</h4>
            <p className="text-sm text-amber-700 mt-1">
              Please ensure you have a stable internet connection before starting any test. 
              Your progress will be automatically saved, but network interruptions may affect your performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};