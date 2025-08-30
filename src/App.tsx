import { useState, useEffect } from 'react'
import './App.css'
import QuestionDisplay from './components/QuestionDisplay'
import Timer from './components/Timer'

export interface Question {
  id: number;
  text: string;
  category?: string;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestionSet, setCurrentQuestionSet] = useState(1)

  // Mock function to simulate MCP server call
  const generateQuestions = async (): Promise<Question[]> => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock questions - replace this with actual MCP server call
    const mockQuestions: Question[] = Array.from({ length: 10 }, (_, index) => ({
      id: (currentQuestionSet - 1) * 10 + index + 1,
      text: `Question ${(currentQuestionSet - 1) * 10 + index + 1}: What is the significance of ${['React hooks', 'TypeScript generics', 'async/await', 'closures in JavaScript', 'REST APIs', 'GraphQL', 'microservices', 'Docker containers', 'JWT tokens', 'database indexing'][index]}?`,
      category: ['Frontend', 'Programming', 'Backend', 'DevOps', 'Security'][Math.floor(Math.random() * 5)]
    }))
    
    setIsLoading(false)
    return mockQuestions
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
    </div>
  )
}

export default App
