import { useState, useEffect } from 'react'
import './App.css'
import QuestionDisplay from './components/QuestionDisplay'
import Timer from './components/Timer'
import DebugPanel from './components/DebugPanel'
import { mcpService } from './services/mcpService'

export interface Question {
  id: number;
  text: string;
  category?: string;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestionSet, setCurrentQuestionSet] = useState(1)

  // Generate questions using MCP service
  const generateQuestions = async (): Promise<Question[]> => {
    console.log('🎯 App: Starting question generation...');
    setIsLoading(true)
    
    try {
      // Initialize MCP service if not already connected
      console.log('🔌 App: Connecting to MCP service...');
      await mcpService.connect()
      
      // Generate questions using MCP
      console.log('📝 App: Requesting questions from MCP service...');
      const newQuestions = await mcpService.generateQuestions(10)
      
      console.log('✅ App: Received', newQuestions.length, 'questions:', newQuestions.map(q => q.text));
      setIsLoading(false)
      return newQuestions
    } catch (error) {
      console.error('❌ App: Failed to generate questions via MCP:', error)
      setIsLoading(false)
      
      // Fallback to local questions if MCP fails
      console.log('🔄 App: Using local fallback questions');
      return getFallbackQuestions()
    }
  }

  // Fallback questions in case MCP service fails
  const getFallbackQuestions = (): Question[] => {
    const questionTemplates = [
      "Name 3 favorite foods",
      "Name 3 places you want to travel", 
      "Name 3 songs you both love",
      "Name 3 funny habits",
      "Name 3 movies to rewatch",
      "Name 3 dream jobs",
      "Name 3 romantic date ideas",
      "Name 3 weekend activities",
      "Name 3 favorite desserts",
      "Name 3 things you admire about each other"
    ]
    
    return questionTemplates.map((text, index) => ({
      id: index + 1,
      text,
      category: ['Personal', 'Relationship', 'Dreams', 'Fun', 'Life'][Math.floor(Math.random() * 5)]
    }))
  }

  const handleGenerateQuestions = async () => {
    const newQuestions = await generateQuestions()
    setQuestions(newQuestions)
    setCurrentQuestionSet(prev => prev + 1)
  }

  // Generate initial questions on component mount
  useEffect(() => {
    handleGenerateQuestions()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>FiveQ - Question Generator</h1>
        <p>Generate and answer questions with a timer</p>
      </header>
      
      <main className="app-main">
        <div className="left-panel">
          <div className="question-section">
            <div className="question-controls">
              <button 
                onClick={handleGenerateQuestions}
                disabled={isLoading}
                className="generate-btn"
              >
                {isLoading ? 'Generating...' : 'Generate Next 10 Questions'}
              </button>
              <span className="question-set-info">
                Question Set #{currentQuestionSet - 1}
              </span>
            </div>
            
            <QuestionDisplay 
              questions={questions} 
              isLoading={isLoading}
            />
          </div>
        </div>
        
        <div className="right-panel">
          <Timer />
        </div>
      </main>
      
      <DebugPanel />
    </div>
  )
}

export default App
