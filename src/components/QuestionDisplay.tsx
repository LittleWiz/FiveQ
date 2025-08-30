import { Question } from '../App'

interface QuestionDisplayProps {
  questions: Question[]
  isLoading: boolean
}

function QuestionDisplay({ questions, isLoading }: QuestionDisplayProps) {
  if (isLoading) {
    return (
      <div className="loading-spinner">
        Generating questions...
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="loading-spinner">
        Click "Generate Questions" to start
      </div>
    )
  }

  return (
    <div className="questions-grid">
      {questions.map((question) => (
        <div key={question.id} className="question-card">
          <div className="question-number">
            Question #{question.id}
          </div>
          <div className="question-text">
            {question.text}
          </div>
          {question.category && (
            <div className="question-category">
              {question.category}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default QuestionDisplay
