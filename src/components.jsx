import { useEffect, useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/* ===================== MATH RENDERER ===================== */
export function M({ children, display = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(children, ref.current, {
        displayMode: display,
        throwOnError: false,
        trust: true
      });
    }
  }, [children, display]);
  return display
    ? <div className="math-block" ref={ref} />
    : <span className="math-inline" ref={ref} />;
}

/* ===================== TIP CARD ===================== */
const tipIcons = { tip: '💡', shortcut: '⚡', mistake: '⚠️', remember: '🧠' };
const tipLabels = { tip: 'Tip', shortcut: 'Shortcut', mistake: 'Common Mistake', remember: 'Remember' };

export function TipCard({ type = 'tip', children }) {
  return (
    <div className={`tip-card ${type}`}>
      <span className="tip-icon">{tipIcons[type]}</span>
      <div><strong>{tipLabels[type]}:</strong> {children}</div>
    </div>
  );
}

/* ===================== STEP REVEAL ===================== */
export function StepCard({ label, title, children, highlight, style }) {
  return (
    <div className={`step-card${highlight ? ' highlight' : ''}`} style={style}>
      {label && <div className="step-label">{label}</div>}
      {title && <h3 className="step-heading">{title}</h3>}
      {children}
    </div>
  );
}

/* ===================== SIMPLEX TABLEAU ===================== */
export function Tableau({ title, headers, rows, pivotCol, pivotRow, objRowIndex, ratios }) {
  return (
    <div className="tableau-wrapper">
      {title && <div className="tableau-title">{title}</div>}
      <table className="tableau">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className={i === pivotCol ? 'pivot-col' : ''}>{h}</th>
            ))}
            {ratios && <th style={{ color: 'var(--accent-cyan)' }}>Ratio</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const isObjRow = ri === (objRowIndex ?? rows.length - 1);
            const isPivotRow = ri === pivotRow;
            return (
              <tr key={ri} className={isObjRow ? 'obj-row' : ''}>
                {row.map((cell, ci) => {
                  let cls = '';
                  if (ci === 0) cls += ' basis-cell';
                  if (ci === headers.length - 1 && !isObjRow) cls += ' qty-cell';
                  if (ci === pivotCol && !isObjRow) cls += ' pivot-col';
                  if (isPivotRow && ci > 0) cls += ' pivot-row';
                  if (isPivotRow && ci === pivotCol) cls = ' pivot-cell';
                  return <td key={ci} className={cls.trim()}>{cell}</td>;
                })}
                {ratios && !isObjRow && (
                  <td className="ratio-cell">{ratios[ri] ?? ''}</td>
                )}
                {ratios && isObjRow && <td></td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ===================== QUIZ ===================== */
export function Quiz({ id, question, options, correctIndex, explanation, wrongExplanations, hint, onCorrect }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const doneRef = useRef(null);

  const handleSelect = (i) => {
    if (solved) return;
    setSelected(i);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setAttempts(a => a + 1);
    if (selected === correctIndex) {
      setSolved(true);
      if (onCorrect) onCorrect();
    }
  };

  const isCorrect = submitted && selected === correctIndex;
  const isWrong = submitted && selected !== correctIndex;

  // Auto-scroll to the done message when solved
  useEffect(() => {
    if (solved && doneRef.current) {
      setTimeout(() => {
        doneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [solved]);

  return (
    <div className="quiz-container" id={`quiz-${id}`}>
      <div className="quiz-badge">{solved ? '✅ Completed' : '🧠 Quick Check'}</div>
      <div className="quiz-question">{question}</div>
      <div className="quiz-options">
        {options.map((opt, i) => {
          let cls = 'quiz-option';
          if (solved) {
            if (i === correctIndex) cls += ' correct';
            else cls += ' disabled';
          } else if (submitted && selected !== null) {
            if (i === correctIndex && isWrong && attempts >= 2) cls += ' correct';
            else if (i === selected && isWrong) cls += ' wrong';
            else if (i === selected) cls += ' selected';
          } else if (i === selected) {
            cls += ' selected';
          }
          return (
            <div key={i} className={cls} onClick={() => handleSelect(i)}>
              <span className="option-marker">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </div>
          );
        })}
      </div>

      {!solved && hint && !showHint && (
        <button className="btn btn-hint" onClick={() => setShowHint(true)} style={{ marginBottom: 12 }}>
          💡 Show Hint
        </button>
      )}
      {showHint && !solved && (
        <div className="tip-card tip" style={{ marginBottom: 16 }}>
          <span className="tip-icon">💡</span>
          <div>{hint}</div>
        </div>
      )}

      {isCorrect && (
        <div className="quiz-feedback correct" ref={doneRef}>
          ✅ <strong>Correct!</strong> {explanation}
        </div>
      )}

      {isWrong && (
        <div className="quiz-feedback wrong">
          ❌ <strong>Not quite.</strong>{' '}
          {wrongExplanations?.[selected] || explanation}
          {attempts >= 2 && <div style={{ marginTop: 8 }}><strong>The answer is {String.fromCharCode(65 + correctIndex)}.</strong></div>}
        </div>
      )}

      {!solved && (
        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleSubmit} disabled={selected === null}>
            Check Answer
          </button>
        </div>
      )}
    </div>
  );
}

/* ===================== CONTINUE BUTTON ===================== */
export function ContinueBtn({ onClick, label = 'Continue →' }) {
  const ref = useRef(null);
  useEffect(() => {
    // Auto-scroll this button into view when it first appears
    if (ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, []);

  return (
    <div className="btn-group" style={{ justifyContent: 'center', marginTop: 28 }} ref={ref}>
      <button className="btn btn-primary" onClick={onClick}>{label}</button>
    </div>
  );
}

/* ===================== SECTION WRAPPER ===================== */
export function Section({ badge, title, intro, children }) {
  return (
    <div className="section">
      {badge && <div className="section-badge">{badge}</div>}
      {title && <h2 className="section-title">{title}</h2>}
      {intro && <p className="section-intro">{intro}</p>}
      {children}
    </div>
  );
}
