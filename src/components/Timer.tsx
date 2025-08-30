import { useState, useEffect, useRef } from 'react'

type TimerStatus = 'idle' | 'running' | 'finished'

function Timer() {
  const [timeLeft, setTimeLeft] = useState(5)
  const [status, setStatus] = useState<TimerStatus>('idle')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (status === 'running') return
    
    setStatus('running')
    setTimeLeft(5)
    
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus('finished')
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setStatus('idle')
  }

  const resetTimer = () => {
    stopTimer()
    setTimeLeft(5)
    setStatus('idle')
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const getTimerDisplayClass = () => {
    if (timeLeft <= 2 && status === 'running') {
      return 'timer-display warning'
    }
    return 'timer-display'
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'idle':
        return 'Ready to start'
      case 'running':
        return 'Timer is running...'
      case 'finished':
        return 'Time\'s up!'
      default:
        return ''
    }
  }

  return (
    <div className="timer-container">
      <h2>5-Second Timer</h2>
      
      <div className={getTimerDisplayClass()}>
        {timeLeft}
      </div>
      
      <div className="timer-controls">
        <button
          className="timer-btn start-btn"
          onClick={startTimer}
          disabled={status === 'running'}
        >
          Start
        </button>
        
        <button
          className="timer-btn stop-btn"
          onClick={stopTimer}
          disabled={status === 'idle'}
        >
          Stop
        </button>
        
        <button
          className="timer-btn reset-btn"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      
      <div className={`timer-status ${status}`}>
        {getStatusMessage()}
      </div>
    </div>
  )
}

export default Timer
