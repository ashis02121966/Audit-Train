import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';
import { EnumeratorDashboard } from './components/Dashboard/EnumeratorDashboard';
import { SurveyList } from './components/SurveyManagement/SurveyList';
import { QuestionBank } from './components/QuestionBank/QuestionBank';
import { TestInterface } from './components/TestInterface/TestInterface';
import { UserManagement } from './components/UserManagement/UserManagement';
import { RoleManagement } from './components/RoleManagement/RoleManagement';
import { TestManagement } from './components/TestManagement/TestManagement';
import { ResultsReports } from './components/Results/ResultsReports';
import { CertificateManagement } from './components/Certificates/CertificateManagement';
import { canAccessMenu } from './utils/rolePermissions';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTestInterface, setShowTestInterface] = useState(false);
  const [currentTestId, setCurrentTestId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const handleStartTest = (testId: string) => {
    setCurrentTestId(testId);
    setShowTestInterface(true);
  };

  const handleExitTest = () => {
    setShowTestInterface(false);
    setCurrentTestId(null);
    // Refresh the dashboard to show updated test status
    setActiveTab('dashboard');
  };

  if (showTestInterface) {
    return <TestInterface testId={currentTestId} onExit={handleExitTest} />;
  }

  // Check if user can access the current tab
  const canAccess = canAccessMenu(user.role, activeTab);
  if (!canAccess && activeTab !== 'dashboard') {
    setActiveTab('dashboard');
  }

  const renderContent = () => {
    // Verify access before rendering
    if (!canAccessMenu(user.role, activeTab)) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">You don't have permission to access this section.</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return user.role === 'admin' ? 
          <AdminDashboard /> : 
          <EnumeratorDashboard onStartTest={handleStartTest} />;
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'surveys':
        return <SurveyList />;
      case 'questions':
        return <QuestionBank />;
      case 'my-tests':
        return <EnumeratorDashboard onStartTest={handleStartTest} />;
      case 'my-results':
        return <EnumeratorDashboard onStartTest={handleStartTest} />;
      case 'my-certificates':
        return <EnumeratorDashboard onStartTest={handleStartTest} />;
      case 'team-results':
        return <ResultsReports />;
      case 'enumerators':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">My Enumerators</h3>
              <p className="text-gray-600">Manage your team of enumerators.</p>
            </div>
          </div>
        );
      case 'test-management':
        return <TestManagement />;
      case 'results':
        return <ResultsReports />;
      case 'certificates':
        return <CertificateManagement />;
      case 'system':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
              <p className="text-gray-600">Configure system parameters and preferences.</p>
            </div>
          </div>
        );
      case 'audit':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Logs</h3>
              <p className="text-gray-600">View system activity and audit trails.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
              </h3>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;