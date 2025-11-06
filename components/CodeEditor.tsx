import { useState, useEffect } from 'react'

interface CodeEditorProps {
  initialCode: string
  editable?: boolean
  showOutput?: boolean
}

export default function CodeEditor({ initialCode, editable = true, showOutput = true }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setCode(initialCode)
    setOutput([])
    setError(null)
  }, [initialCode])

  const runCode = () => {
    setOutput([])
    setError(null)

    const logs: string[] = []

    // Create a custom console.log
    const customLog = (...args: any[]) => {
      logs.push(args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }

    try {
      // Create a function with custom console
      const func = new Function('console', code)
      func({ log: customLog })

      if (logs.length === 0) {
        // If no logs, try to evaluate as expression
        const result = eval(code)
        if (result !== undefined) {
          logs.push(String(result))
        }
      }

      setOutput(logs)
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    if (showOutput && !editable) {
      runCode()
    }
  }, [code, showOutput, editable])

  return (
    <div className="code-editor">
      <div className="editor-header">
        <span className="editor-title">Code Editor</span>
        {editable && (
          <button onClick={runCode} className="run-button">
            ▶ Run Code
          </button>
        )}
      </div>

      <textarea
        className="code-input"
        value={code}
        onChange={(e) => editable && setCode(e.target.value)}
        readOnly={!editable}
        spellCheck={false}
      />

      {showOutput && (
        <div className="output-section">
          <div className="output-header">Output</div>
          <div className="output-content">
            {error ? (
              <div className="error-message">❌ {error}</div>
            ) : output.length > 0 ? (
              output.map((line, idx) => (
                <div key={idx} className="output-line">
                  {line}
                </div>
              ))
            ) : (
              <div className="output-placeholder">Run the code to see output...</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
