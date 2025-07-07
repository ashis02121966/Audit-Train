import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  Wifi,
  WifiOff,
  X,
  Save
} from 'lucide-react';

interface TestInterfaceProps {
  testId?: string | null;
  onExit: () => void;
}

export const TestInterface: React.FC<TestInterfaceProps> = ({ testId, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(35 * 60); // 35 minutes in seconds
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isPaused, setIsPaused] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock questions data - in real app, this would be fetched based on testId
  const questions = [
    {
      id: 1,
      section: 'A',
      question: 'What is the primary purpose of random sampling in data collection?',
      options: {
        A: 'To reduce survey costs',
        B: 'To ensure representative sample selection',
        C: 'To speed up data collection',
        D: 'To eliminate interviewer bias'
      }
    },
    {
      id: 2,
      section: 'A',
      question: 'Which of the following is NOT a type of probability sampling?',
      options: {
        A: 'Simple random sampling',
        B: 'Stratified sampling',
        C: 'Convenience sampling',
        D: 'Systematic sampling'
      }
    },
    {
      id: 3,
      section: 'B',
      question: 'In hypothesis testing, what does a p-value of 0.03 indicate?',
      options: {
        A: 'There is a 3% chance the null hypothesis is true',
        B: 'There is a 3% chance of observing the data if null hypothesis is true',
        C: 'The alternative hypothesis has 97% probability',
        D: 'The result is not statistically significant'
      }
    },
    {
      id: 4,
      section: 'B',
      question: 'What is the standard deviation of a normal distribution with variance 16?',
      options: {
        A: '2',
        B: '4',
        C: '8',
        D: '16'
      }
    },
    {
      id: 5,
      section: 'C',
      question: 'Which quality control measure is most important in data collection?',
      options: {
        A: 'Speed of data entry',
        B: 'Cost reduction',
        C: 'Data validation and verification',
        D: 'Automated processing'
      }
    }
  ];

  // Auto-save progress every 30 seconds
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (!isPaused && isOnline) {
        saveProgress();
      }
    }, 30000);

    return () => clearInterval(autoSave);
  }, [answers, currentQuestion, markedForReview, isPaused, isOnline]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (!isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, timeRemaining]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsPaused(false);
      // Auto-save when coming back online
      saveProgress();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsPaused(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Prevent page refresh/close during test
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your test progress will be saved.';
      saveProgress();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const saveProgress = () => {
    // In a real app, this would save to the backend
    const progressData = {
      testId,
      currentQuestion,
      answers,
      markedForReview: Array.from(markedForReview),
      timeRemaining,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(`test_progress_${testId}`, JSON.stringify(progressData));
    console.log('Progress saved:', progressData);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    // Auto-save after answer selection
    setTimeout(saveProgress, 1000);
  };

  const handleMarkForReview = (questionIndex: number) => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionIndex)) {
        newSet.delete(questionIndex);
      } else {
        newSet.add(questionIndex);
      }
      return newSet;
    });
  };

  const handleSubmitTest = async () => {
    const unansweredCount = questions.length - Object.keys(answers).length;
    
    if (unansweredCount > 0) {
      const confirmed = window.confirm(
        `You have ${unansweredCount} unanswered questions.\n\n` +
        `Are you sure you want to submit the test?`
      );
      if (!confirmed) return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate results
      const totalQuestions = questions.length;
      const attemptedQuestions = Object.keys(answers).length;
      const score = Math.floor(Math.random() * 40) + 60; // Mock score between 60-100
      
      // Clear saved progress
      localStorage.removeItem(`test_progress_${testId}`);
      
      alert(
        `Test submitted successfully!\n\n` +
        `Questions Attempted: ${attemptedQuestions}/${totalQuestions}\n` +
        `Score: ${score}%\n` +
        `Status: ${score >= 70 ? 'PASSED' : 'FAILED'}\n\n` +
        `Your results have been saved and certificate will be generated if passed.`
      );
      
      onExit();
    } catch (error) {
      alert('Error submitting test. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoSubmit = () => {
    alert('Time is up! Your test will be automatically submitted.');
    handleSubmitTest();
  };

  const handleExitTest = () => {
    const confirmed = window.confirm(
      'Are you sure you want to exit the test?\n\n' +
      'Your progress will be saved and you can resume later.'
    );
    
    if (confirmed) {
      saveProgress();
      onExit();
    }
  };

  const getQuestionStatus = (index: number) => {
    if (answers[index]) return 'answered';
    if (markedForReview.has(index)) return 'marked';
    return 'not-attempted';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'bg-green-500 text-white';
      case 'marked': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExitTest}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Exit Test"
            >
              <X className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Data Collection Methodology Assessment
            </h1>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
              isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {isOnline ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={saveProgress}
              className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Save Progress"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm">Save</span>
            </button>

            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              timeRemaining < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-semibold">
                {formatTime(timeRemaining)}
              </span>
              {isPaused && <span className="text-xs">(Paused)</span>}
            </div>

            <button
              onClick={handleSubmitTest}
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Test'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Question Navigation Sidebar */}
        <div className="w-80 bg-white shadow-sm border-r border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Question Navigator</h3>
          
          <div className="grid grid-cols-5 gap-2 mb-6">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-colors ${
                  currentQuestion === index
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                } ${getStatusColor(getQuestionStatus(index))}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Questions:</span>
              <span className="font-medium">{questions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Answered:</span>
              <span className="font-medium text-green-600">
                {Object.keys(answers).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Marked for Review:</span>
              <span className="font-medium text-yellow-600">
                {markedForReview.size}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Not Attempted:</span>
              <span className="font-medium text-gray-600">
                {questions.length - Object.keys(answers).length}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span>Not Attempted</span>
            </div>
          </div>

          <div className="mt-6 p-3 bg-amber-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-800">
                <p className="font-medium mb-1">Auto-Save Active</p>
                <p>Your progress is automatically saved every 30 seconds and when you answer questions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Question Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                    Section {questions[currentQuestion].section}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <button
                  onClick={() => handleMarkForReview(currentQuestion)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                    markedForReview.has(currentQuestion)
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Flag className="w-4 h-4" />
                  <span className="text-sm">
                    {markedForReview.has(currentQuestion) ? 'Marked' : 'Mark for Review'}
                  </span>
                </button>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-6">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {Object.entries(questions[currentQuestion].options).map(([key, value]) => (
                  <label
                    key={key}
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      answers[currentQuestion] === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={key}
                      checked={answers[currentQuestion] === key}
                      onChange={() => handleAnswerSelect(currentQuestion, key)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-medium">
                      {key}
                    </span>
                    <span className="flex-1 text-gray-900">{value}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {currentQuestion + 1} of {questions.length}
                </span>
                {answers[currentQuestion] && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>

              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === questions.length - 1}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};