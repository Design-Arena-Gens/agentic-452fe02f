import Head from 'next/head'
import { useState } from 'react'
import CodeEditor from '@/components/CodeEditor'
import Navigation from '@/components/Navigation'
import { lessons } from '@/data/lessons'

export default function Home() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const lesson = lessons[currentLesson]
  const step = lesson.steps[currentStep]

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
      setCurrentStep(0)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
      setCurrentStep(lessons[currentLesson - 1].steps.length - 1)
    }
  }

  const progress = ((currentLesson * 100 + (currentStep + 1) * (100 / lesson.steps.length)) / lessons.length)

  return (
    <>
      <Head>
        <title>Learn Angular.js & JavaScript - Interactive Tutorial</title>
        <meta name="description" content="Learn Angular.js and JavaScript ES6 from scratch with interactive, practical examples" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="app">
        <header className="header">
          <h1>🚀 Angular.js Learning Lab</h1>
          <p className="tagline">Master JavaScript ES6 & Angular.js Through Practice</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </header>

        <Navigation
          lessons={lessons}
          currentLesson={currentLesson}
          currentStep={currentStep}
          onSelectLesson={(lessonIdx, stepIdx) => {
            setCurrentLesson(lessonIdx)
            setCurrentStep(stepIdx)
          }}
        />

        <main className="main-content">
          <div className="lesson-container">
            <div className="lesson-header">
              <span className="lesson-badge">{lesson.category}</span>
              <h2>{lesson.title}</h2>
            </div>

            <div className="step-content">
              <h3>
                <span className="step-number">Step {currentStep + 1}</span>
                {step.title}
              </h3>

              <div className="explanation">
                <div dangerouslySetInnerHTML={{ __html: step.explanation }} />
              </div>

              {step.code && (
                <CodeEditor
                  initialCode={step.code}
                  editable={step.editable}
                  showOutput={step.showOutput}
                />
              )}

              {step.challenge && (
                <div className="challenge-box">
                  <h4>🎯 Challenge</h4>
                  <p>{step.challenge}</p>
                </div>
              )}

              {step.funFact && (
                <div className="fun-fact">
                  <h4>💡 Fun Fact</h4>
                  <p>{step.funFact}</p>
                </div>
              )}
            </div>

            <div className="navigation-buttons">
              <button
                onClick={handlePrev}
                disabled={currentLesson === 0 && currentStep === 0}
                className="btn btn-secondary"
              >
                ← Previous
              </button>

              <span className="step-indicator">
                Lesson {currentLesson + 1}.{currentStep + 1} of {lessons.length}.{lesson.steps.length}
              </span>

              <button
                onClick={handleNext}
                disabled={currentLesson === lessons.length - 1 && currentStep === lesson.steps.length - 1}
                className="btn btn-primary"
              >
                Next →
              </button>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>Built with 💙 for learners | Practice makes perfect!</p>
        </footer>
      </div>
    </>
  )
}
