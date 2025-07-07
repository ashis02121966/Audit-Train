import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  BookOpen,
  Target,
  Clock,
  X,
  Save,
  FileText,
  Download
} from 'lucide-react';
import { Question, Survey } from '../../types';

export const QuestionBank: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [complexityFilter, setComplexityFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Mock surveys data
  const surveys: Survey[] = [
    {
      id: '1',
      name: 'Data Collection Methodology Assessment',
      description: 'Comprehensive assessment covering data collection techniques',
      durationMinutes: 35,
      totalQuestions: 30,
      passingPercentage: 70,
      maxAttempts: 3,
      status: 'active',
      createdBy: 'admin',
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      id: '2',
      name: 'Statistical Analysis Fundamentals',
      description: 'Basic statistical concepts and analysis methods',
      durationMinutes: 40,
      totalQuestions: 35,
      passingPercentage: 75,
      maxAttempts: 3,
      status: 'draft',
      createdBy: 'admin',
      createdAt: '2025-01-02T14:30:00Z'
    }
  ];

  // Mock data
  const questions: Question[] = [
    {
      id: '1',
      surveyId: '1',
      sectionId: '1',
      questionText: 'What is the primary purpose of random sampling in data collection?',
      optionA: 'To reduce survey costs',
      optionB: 'To ensure representative sample selection',
      optionC: 'To speed up data collection',
      optionD: 'To eliminate interviewer bias',
      correctAnswer: 'B',
      complexity: 'medium',
      marks: 2,
      explanation: 'Random sampling ensures that every member of the population has an equal chance of being selected, leading to representative results.',
      topic: 'Sampling Methods',
      isActive: true
    },
    {
      id: '2', 
      surveyId: '1',
      sectionId: '1',
      questionText: 'Which of the following is NOT a type of probability sampling?',
      optionA: 'Simple random sampling',
      optionB: 'Stratified sampling', 
      optionC: 'Convenience sampling',
      optionD: 'Systematic sampling',
      correctAnswer: 'C',
      complexity: 'easy',
      marks: 1,
      explanation: 'Convenience sampling is a non-probability sampling method where samples are selected based on availability.',
      topic: 'Sampling Methods',
      isActive: true
    },
    {
      id: '3',
      surveyId: '1', 
      sectionId: '2',
      questionText: 'In hypothesis testing, what does a p-value of 0.03 indicate?',
      optionA: 'There is a 3% chance the null hypothesis is true',
      optionB: 'There is a 3% chance of observing the data if null hypothesis is true',
      optionC: 'The alternative hypothesis has 97% probability',
      optionD: 'The result is not statistically significant',
      correctAnswer: 'B',
      complexity: 'hard',
      marks: 3,
      explanation: 'P-value represents the probability of observing the test results under the assumption that the null hypothesis is correct.',
      topic: 'Statistical Testing',
      isActive: true
    }
  ];

  const sections = [
    { id: 'all', name: 'All Sections' },
    { id: '1', name: 'Section A - Data Collection' },
    { id: '2', name: 'Section B - Statistical Analysis' },
    { id: '3', name: 'Section C - Quality Control' }
  ];

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.topic?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesComplexity = complexityFilter === 'all' || question.complexity === complexityFilter;
    const matchesSection = sectionFilter === 'all' || question.sectionId === sectionFilter;
    return matchesSearch && matchesComplexity && matchesSection;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'easy': return 'text-green-700 bg-green-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'hard': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setShowAddModal(true);
  };

  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setShowAddModal(true);
  };

  const handleDeleteQuestion = (question: Question) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this question?\n\n"${question.questionText}"\n\nThis action cannot be undone.`
    );
    if (confirmed) {
      alert('Question deleted successfully!');
    }
  };

  const handleUploadQuestions = () => {
    setShowUploadModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Question Bank</h2>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleUploadQuestions}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Questions</span>
          </button>
          <button 
            onClick={handleAddQuestion}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Easy</p>
              <p className="text-2xl font-bold text-green-600">
                {questions.filter(q => q.complexity === 'easy').length}
              </p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medium</p>
              <p className="text-2xl font-bold text-yellow-600">
                {questions.filter(q => q.complexity === 'medium').length}
              </p>
            </div>
            <Target className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hard</p>
              <p className="text-2xl font-bold text-red-600">
                {questions.filter(q => q.complexity === 'hard').length}
              </p>
            </div>
            <Target className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {sections.map(section => (
                <option key={section.id} value={section.id}>{section.name}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              value={complexityFilter}
              onChange={(e) => setComplexityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getComplexityColor(question.complexity)}`}>
                      {question.complexity}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
                    </span>
                    {question.topic && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {question.topic}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleEditQuestion(question)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteQuestion(question)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3">{question.questionText}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { label: 'A', text: question.optionA },
                    { label: 'B', text: question.optionB },
                    { label: 'C', text: question.optionC },
                    { label: 'D', text: question.optionD }
                  ].map((option) => (
                    <div 
                      key={option.label} 
                      className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        option.label === question.correctAnswer 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
                        option.label === question.correctAnswer
                          ? 'bg-green-200 text-green-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {option.label}
                      </span>
                      <span className="text-gray-900">{option.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {question.explanation && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Add/Edit Question Modal */}
      {showAddModal && (
        <QuestionFormModal
          question={selectedQuestion}
          surveys={surveys}
          sections={sections}
          onClose={() => setShowAddModal(false)}
          onSave={(questionData) => {
            console.log('Saving question:', questionData);
            setShowAddModal(false);
            alert(`Question ${selectedQuestion ? 'updated' : 'added'} successfully!`);
          }}
        />
      )}

      {/* Upload Questions Modal */}
      {showUploadModal && (
        <UploadQuestionsModal
          surveys={surveys}
          onClose={() => setShowUploadModal(false)}
          onUpload={(uploadData) => {
            console.log('Uploading questions:', uploadData);
            setShowUploadModal(false);
            alert('Questions uploaded successfully!');
          }}
        />
      )}
    </div>
  );
};

// Question Form Modal Component
interface QuestionFormModalProps {
  question: Question | null;
  surveys: Survey[];
  sections: any[];
  onClose: () => void;
  onSave: (questionData: Partial<Question>) => void;
}

const QuestionFormModal: React.FC<QuestionFormModalProps> = ({ 
  question, 
  surveys, 
  sections, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    surveyId: question?.surveyId || '',
    sectionId: question?.sectionId || '',
    questionText: question?.questionText || '',
    optionA: question?.optionA || '',
    optionB: question?.optionB || '',
    optionC: question?.optionC || '',
    optionD: question?.optionD || '',
    correctAnswer: question?.correctAnswer || 'A',
    complexity: question?.complexity || 'medium',
    marks: question?.marks || 1,
    explanation: question?.explanation || '',
    topic: question?.topic || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {question ? 'Edit Question' : 'Add New Question'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Survey
              </label>
              <select
                value={formData.surveyId}
                onChange={(e) => setFormData({...formData, surveyId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Survey</option>
                {surveys.map(survey => (
                  <option key={survey.id} value={survey.id}>{survey.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section
              </label>
              <select
                value={formData.sectionId}
                onChange={(e) => setFormData({...formData, sectionId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Section</option>
                {sections.filter(s => s.id !== 'all').map(section => (
                  <option key={section.id} value={section.id}>{section.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text
            </label>
            <textarea
              value={formData.questionText}
              onChange={(e) => setFormData({...formData, questionText: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Option A
              </label>
              <input
                type="text"
                value={formData.optionA}
                onChange={(e) => setFormData({...formData, optionA: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Option B
              </label>
              <input
                type="text"
                value={formData.optionB}
                onChange={(e) => setFormData({...formData, optionB: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Option C
              </label>
              <input
                type="text"
                value={formData.optionC}
                onChange={(e) => setFormData({...formData, optionC: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Option D
              </label>
              <input
                type="text"
                value={formData.optionD}
                onChange={(e) => setFormData({...formData, optionD: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correct Answer
              </label>
              <select
                value={formData.correctAnswer}
                onChange={(e) => setFormData({...formData, correctAnswer: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Complexity
              </label>
              <select
                value={formData.complexity}
                onChange={(e) => setFormData({...formData, complexity: e.target.value as any})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marks
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.marks}
                onChange={(e) => setFormData({...formData, marks: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic (Optional)
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Sampling Methods, Statistical Testing"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Explanation (Optional)
            </label>
            <textarea
              value={formData.explanation}
              onChange={(e) => setFormData({...formData, explanation: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide explanation for the correct answer"
            />
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
              {question ? 'Update Question' : 'Add Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Upload Questions Modal Component
interface UploadQuestionsModalProps {
  surveys: Survey[];
  onClose: () => void;
  onUpload: (uploadData: any) => void;
}

const UploadQuestionsModal: React.FC<UploadQuestionsModalProps> = ({ 
  surveys, 
  onClose, 
  onUpload 
}) => {
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedSurvey || !selectedFile) {
      alert('Please select both a survey and a file to upload.');
      return;
    }

    const uploadData = {
      surveyId: selectedSurvey,
      file: selectedFile,
      fileName: selectedFile.name,
      fileSize: selectedFile.size
    };

    onUpload(uploadData);
  };

  const downloadTemplate = () => {
    // Create a sample CSV template
    const csvContent = `Question Text,Option A,Option B,Option C,Option D,Correct Answer,Complexity,Marks,Topic,Explanation
"What is the primary purpose of random sampling?","To reduce costs","To ensure representative selection","To speed up collection","To eliminate bias","B","medium","2","Sampling","Random sampling ensures representative results"
"Which is NOT a probability sampling method?","Simple random","Stratified","Convenience","Systematic","C","easy","1","Sampling","Convenience sampling is non-probability method"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'question_upload_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Upload Questions</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Survey
            </label>
            <select
              value={selectedSurvey}
              onChange={(e) => setSelectedSurvey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Choose a survey...</option>
              {surveys.map(survey => (
                <option key={survey.id} value={survey.id}>{survey.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <FileText className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">
                    Drag and drop your CSV/Excel file here, or{' '}
                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                      browse
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500">
                    Supported formats: CSV, Excel (.xlsx, .xls)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">File Format Requirements:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Question Text, Option A, Option B, Option C, Option D</li>
              <li>• Correct Answer (A, B, C, or D)</li>
              <li>• Complexity (easy, medium, hard)</li>
              <li>• Marks (numeric value)</li>
              <li>• Topic and Explanation (optional)</li>
            </ul>
            <button
              onClick={downloadTemplate}
              className="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Template</span>
            </button>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedSurvey || !selectedFile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Upload Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};