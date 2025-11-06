import { useState } from 'react'

interface Lesson {
  title: string
  category: string
  steps: any[]
}

interface NavigationProps {
  lessons: Lesson[]
  currentLesson: number
  currentStep: number
  onSelectLesson: (lessonIdx: number, stepIdx: number) => void
}

export default function Navigation({ lessons, currentLesson, currentStep, onSelectLesson }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'} Menu
      </button>

      <nav className={`navigation ${isOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <h3>📚 Course Contents</h3>
        </div>

        <div className="nav-content">
          {lessons.map((lesson, lessonIdx) => (
            <div key={lessonIdx} className="nav-lesson">
              <div className="nav-lesson-title">
                <span className="nav-lesson-number">{lessonIdx + 1}.</span>
                {lesson.title}
              </div>

              <div className="nav-steps">
                {lesson.steps.map((step, stepIdx) => (
                  <button
                    key={stepIdx}
                    className={`nav-step ${
                      lessonIdx === currentLesson && stepIdx === currentStep ? 'active' : ''
                    }`}
                    onClick={() => {
                      onSelectLesson(lessonIdx, stepIdx)
                      setIsOpen(false)
                    }}
                  >
                    <span className="nav-step-number">{lessonIdx + 1}.{stepIdx + 1}</span>
                    {step.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
    </>
  )
}
