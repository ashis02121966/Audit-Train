import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle,
  Calendar,
  Users,
  FileText,
  Shield,
  RefreshCw,
  Send
} from 'lucide-react';

interface Certificate {
  id: string;
  certificateNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  surveyId: string;
  surveyName: string;
  score: number;
  issueDate: string;
  isValid: boolean;
  verificationToken: string;
  downloadCount: number;
  lastDownloaded?: string;
}

export const CertificateManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [surveyFilter, setSurveyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Mock data
  const certificates: Certificate[] = [
    {
      id: '1',
      certificateNumber: 'CERT-2025-001',
      userId: 'enum_001',
      userName: 'Alice Brown',
      userEmail: 'alice.brown@example.com',
      surveyId: '1',
      surveyName: 'Data Collection Methodology Assessment',
      score: 85,
      issueDate: '2025-01-12T09:32:00Z',
      isValid: true,
      verificationToken: 'VT-ABC123XYZ',
      downloadCount: 3,
      lastDownloaded: '2025-01-12T10:15:00Z'
    },
    {
      id: '2',
      certificateNumber: 'CERT-2025-002',
      userId: 'enum_005',
      userName: 'Emma Thompson',
      userEmail: 'emma.thompson@example.com',
      surveyId: '3',
      surveyName: 'Quality Control Procedures',
      score: 92,
      issueDate: '2025-01-09T11:28:00Z',
      isValid: true,
      verificationToken: 'VT-DEF456UVW',
      downloadCount: 1,
      lastDownloaded: '2025-01-09T12:00:00Z'
    },
    {
      id: '3',
      certificateNumber: 'CERT-2025-003',
      userId: 'enum_006',
      userName: 'John Smith',
      userEmail: 'john.smith@example.com',
      surveyId: '1',
      surveyName: 'Data Collection Methodology Assessment',
      score: 78,
      issueDate: '2025-01-08T14:15:00Z',
      isValid: true,
      verificationToken: 'VT-GHI789RST',
      downloadCount: 2,
      lastDownloaded: '2025-01-10T09:30:00Z'
    },
    {
      id: '4',
      certificateNumber: 'CERT-2025-004',
      userId: 'enum_007',
      userName: 'Lisa Davis',
      userEmail: 'lisa.davis@example.com',
      surveyId: '2',
      surveyName: 'Statistical Analysis Fundamentals',
      score: 88,
      issueDate: '2025-01-07T16:45:00Z',
      isValid: false,
      verificationToken: 'VT-JKL012MNO',
      downloadCount: 0
    },
    {
      id: '5',
      certificateNumber: 'CERT-2025-005',
      userId: 'enum_008',
      userName: 'Michael Wilson',
      userEmail: 'michael.wilson@example.com',
      surveyId: '1',
      surveyName: 'Data Collection Methodology Assessment',
      score: 91,
      issueDate: '2025-01-06T13:20:00Z',
      isValid: true,
      verificationToken: 'VT-PQR345STU',
      downloadCount: 5,
      lastDownloaded: '2025-01-11T16:45:00Z'
    }
  ];

  const surveys = [
    { id: 'all', name: 'All Surveys' },
    { id: '1', name: 'Data Collection Methodology Assessment' },
    { id: '2', name: 'Statistical Analysis Fundamentals' },
    { id: '3', name: 'Quality Control Procedures' }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.surveyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSurvey = surveyFilter === 'all' || cert.surveyId === surveyFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'valid' && cert.isValid) ||
                         (statusFilter === 'revoked' && !cert.isValid);
    return matchesSearch && matchesSurvey && matchesStatus;
  });

  const handlePreviewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowPreviewModal(true);
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    // Simulate certificate download
    alert(`Downloading certificate ${certificate.certificateNumber} for ${certificate.userName}`);
    
    // In a real app, this would trigger a PDF download
    const link = document.createElement('a');
    link.href = `/api/certificates/${certificate.id}/download`;
    link.download = `Certificate_${certificate.certificateNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRevokeCertificate = (certificate: Certificate) => {
    const confirmed = window.confirm(
      `Are you sure you want to revoke certificate ${certificate.certificateNumber}?\n\n` +
      `This action will invalidate the certificate and cannot be undone.`
    );
    
    if (confirmed) {
      alert(`Certificate ${certificate.certificateNumber} has been revoked.`);
    }
  };

  const handleReissueCertificate = (certificate: Certificate) => {
    const confirmed = window.confirm(
      `Reissue certificate for ${certificate.userName}?\n\n` +
      `This will generate a new certificate with a new certificate number.`
    );
    
    if (confirmed) {
      alert(`New certificate issued for ${certificate.userName}`);
    }
  };

  const handleSendCertificate = (certificate: Certificate) => {
    const confirmed = window.confirm(
      `Send certificate ${certificate.certificateNumber} to ${certificate.userEmail}?\n\n` +
      `The certificate will be sent as a PDF attachment.`
    );
    
    if (confirmed) {
      alert(`Certificate sent to ${certificate.userEmail}`);
    }
  };

  const handleBulkDownload = () => {
    const confirmed = window.confirm(
      `Download all ${filteredCertificates.length} certificates as a ZIP file?`
    );
    
    if (confirmed) {
      alert('Preparing bulk download... This may take a few moments.');
    }
  };

  const stats = [
    { 
      title: 'Total Certificates', 
      value: certificates.length.toString(), 
      icon: Award, 
      color: 'blue' 
    },
    { 
      title: 'Valid Certificates', 
      value: certificates.filter(c => c.isValid).length.toString(), 
      icon: CheckCircle, 
      color: 'green' 
    },
    { 
      title: 'Revoked Certificates', 
      value: certificates.filter(c => !c.isValid).length.toString(), 
      icon: XCircle, 
      color: 'red' 
    },
    { 
      title: 'Total Downloads', 
      value: certificates.reduce((sum, c) => sum + c.downloadCount, 0).toString(), 
      icon: Download, 
      color: 'purple' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Certificate Management</h2>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleBulkDownload}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Bulk Download</span>
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
              placeholder="Search by user name, email, certificate number, or survey..."
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
              <option value="valid">Valid Only</option>
              <option value="revoked">Revoked Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certificate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Survey
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCertificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {certificate.certificateNumber}
                      </div>
                      <div className="text-xs text-gray-500">
                        {certificate.verificationToken}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{certificate.userName}</div>
                      <div className="text-sm text-gray-500">{certificate.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{certificate.surveyName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">{certificate.score}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      certificate.isValid 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {certificate.isValid ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{certificate.isValid ? 'Valid' : 'Revoked'}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{certificate.downloadCount}</div>
                    {certificate.lastDownloaded && (
                      <div className="text-xs text-gray-500">
                        Last: {new Date(certificate.lastDownloaded).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(certificate.issueDate).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handlePreviewCertificate(certificate)}
                        className="text-gray-400 hover:text-blue-600 p-1 rounded"
                        title="Preview Certificate"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadCertificate(certificate)}
                        className="text-gray-400 hover:text-green-600 p-1 rounded"
                        title="Download Certificate"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSendCertificate(certificate)}
                        className="text-gray-400 hover:text-blue-600 p-1 rounded"
                        title="Send Certificate"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      {certificate.isValid ? (
                        <button
                          onClick={() => handleRevokeCertificate(certificate)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded"
                          title="Revoke Certificate"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReissueCertificate(certificate)}
                          className="text-gray-400 hover:text-green-600 p-1 rounded"
                          title="Reissue Certificate"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Certificate Preview Modal */}
      {showPreviewModal && selectedCertificate && (
        <CertificatePreviewModal
          certificate={selectedCertificate}
          onClose={() => setShowPreviewModal(false)}
          onDownload={() => handleDownloadCertificate(selectedCertificate)}
        />
      )}
    </div>
  );
};

// Certificate Preview Modal Component
interface CertificatePreviewModalProps {
  certificate: Certificate;
  onClose: () => void;
  onDownload: () => void;
}

const CertificatePreviewModal: React.FC<CertificatePreviewModalProps> = ({ 
  certificate, 
  onClose, 
  onDownload 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Certificate Preview</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Certificate Design */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-4 border-blue-200 rounded-lg p-8 mb-6">
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex justify-center">
                <Award className="w-16 h-16 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-blue-900">Certificate of Achievement</h1>
              <p className="text-lg text-blue-700">eSigma Survey Platform</p>
            </div>

            {/* Recipient */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700">This is to certify that</p>
              <h2 className="text-4xl font-bold text-gray-900 border-b-2 border-blue-300 pb-2 inline-block">
                {certificate.userName}
              </h2>
              <p className="text-lg text-gray-700">has successfully completed</p>
              <h3 className="text-2xl font-semibold text-blue-800">
                {certificate.surveyName}
              </h3>
            </div>

            {/* Score and Details */}
            <div className="bg-white rounded-lg p-6 shadow-inner">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">{certificate.score}%</div>
                  <div className="text-sm text-gray-600">Score Achieved</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-blue-600">
                    {new Date(certificate.issueDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">Date of Completion</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-purple-600">
                    {certificate.certificateNumber}
                  </div>
                  <div className="text-sm text-gray-600">Certificate Number</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="space-y-4">
              <div className="flex justify-center space-x-12">
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-32 mb-2"></div>
                  <p className="text-sm text-gray-600">Authorized Signature</p>
                </div>
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-32 mb-2"></div>
                  <p className="text-sm text-gray-600">Date</p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <p>Verification Token: {certificate.verificationToken}</p>
                <p>This certificate can be verified at: https://esigma.example.com/verify</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Certificate Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Certificate Number:</span>
              <span className="ml-2 font-medium">{certificate.certificateNumber}</span>
            </div>
            <div>
              <span className="text-gray-600">Issue Date:</span>
              <span className="ml-2 font-medium">
                {new Date(certificate.issueDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className={`ml-2 font-medium ${
                certificate.isValid ? 'text-green-600' : 'text-red-600'
              }`}>
                {certificate.isValid ? 'Valid' : 'Revoked'}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Downloads:</span>
              <span className="ml-2 font-medium">{certificate.downloadCount}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};