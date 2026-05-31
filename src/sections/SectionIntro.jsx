import { useState } from 'react';
import { Section, StepCard, M, TipCard, ContinueBtn } from '../components';

export default function SectionIntro({ onComplete }) {
  const [step, setStep] = useState(0);

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">📐 Analytic Geometry • Linear Programming</div>
        <h1>Mastering LP Maximization with Mixed Constraints</h1>
        <p>
          Learn the Simplex Algorithm step-by-step with the Big-K method.
          Interactive lessons, instant quizzes, and a final exam — all designed
          to make you <strong>truly understand</strong>, not just memorize.
        </p>
        <button className="btn btn-primary" onClick={() => setStep(1)} style={{ padding: '16px 36px', fontSize: '1rem' }}>
          🚀 Start Learning
        </button>
        <div className="hero-features">
          <div className="hero-feature">
            <div className="feat-icon">📖</div>
            <div className="feat-title">Step-by-Step</div>
            <div className="feat-desc">Every concept broken down into bite-sized pieces</div>
          </div>
          <div className="hero-feature">
            <div className="feat-icon">🧠</div>
            <div className="feat-title">Quizzes</div>
            <div className="feat-desc">Practice after each topic with instant feedback</div>
          </div>
          <div className="hero-feature">
            <div className="feat-icon">🏆</div>
            <div className="feat-title">Final Exam</div>
            <div className="feat-desc">Solve a full problem on your own to prove mastery</div>
          </div>
        </div>
      </div>

      {/* WHAT IS LP? */}
      {step >= 1 && (
        <div className="section">
          <StepCard label="📌 The Big Picture" title="What is Linear Programming?">
            <p className="step-text">
              Imagine you run a business. You sell two products and want to make the <strong>most money possible</strong>.
              But you have limits — limited materials, limited time, limited workers.
            </p>
            <p className="step-text">
              <strong>Linear Programming (LP)</strong> is the math that finds the <strong>best possible answer</strong>{' '}
              given your constraints. The "linear" means all relationships are straight lines (no exponents, no curves).
            </p>
            <TipCard type="remember">
              LP = <strong>Maximize</strong> (or minimize) something, <strong>subject to</strong> limits (constraints).
              That's it!
            </TipCard>
            {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
          </StepCard>
        </div>
      )}

      {/* MIXED CONSTRAINTS */}
      {step >= 2 && (
        <div className="section" style={{ paddingTop: 0 }}>
          <StepCard label="📌 Key Concept" title='What are "Mixed Constraints"?'>
            <p className="step-text">
              In simpler LP problems, all constraints use <M>{'\\leq'}</M> (less than or equal).
              But real-world problems often have a <strong>mix</strong>:
            </p>
            <div className="grid-3">
              <div className="step-card" style={{ margin: 0, textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>≤</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  "At most" — you can't exceed this limit
                </div>
              </div>
              <div className="step-card" style={{ margin: 0, textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>≥</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  "At least" — you must meet this minimum
                </div>
              </div>
              <div className="step-card" style={{ margin: 0, textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>=</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  "Exactly" — must be this exact amount
                </div>
              </div>
            </div>
            <p className="step-text">
              When you have a mix of these, the regular simplex method needs some extra tricks.
              That's where the <strong>Big-K Method</strong> comes in!
            </p>
            {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
          </StepCard>
        </div>
      )}

      {/* THE PROBLEM */}
      {step >= 3 && (
        <div className="section" style={{ paddingTop: 0 }}>
          <StepCard label="📌 Our Problem" title="The Problem We'll Solve Together" highlight>
            <p className="step-text">Throughout this lesson, we'll solve this problem step by step:</p>
            <div className="math-highlight">
              <M display>{'\\text{Maximize } Z = 50x + 40y'}</M>
            </div>
            <p className="step-text" style={{ marginTop: 16 }}>Subject to:</p>
            <M display>{'2x + 3y \\leq 24'}</M>
            <M display>{'2x + 9y \\geq 36'}</M>
            <M display>{'2x + y = 12'}</M>
            <M display>{'x, y \\geq 0'}</M>
            <TipCard type="tip">
              Notice the <strong>three different types</strong> of constraints: ≤, ≥, and =. That's what makes
              this a "mixed constraints" problem. We'll handle each type differently!
            </TipCard>
            <ContinueBtn onClick={onComplete} label="Let's Begin! →" />
          </StepCard>
        </div>
      )}
    </>
  );
}
