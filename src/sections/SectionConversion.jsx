import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, Tableau } from '../components';

export default function SectionConversion({ onComplete }) {
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState({});
  const allDone = solved.conv1 && solved.conv2 && solved.conv3;

  return (
    <Section
      badge="Step 1 of 6"
      title="Converting the Constraints"
      intro="The simplex algorithm only works with equations (=), not inequalities (≤ or ≥). So first, we turn every constraint into an equation by adding helper variables."
    >
      <StepCard label="Step 1.1" title="Why Do We Need to Convert?">
        <p className="step-text">
          The simplex method solves <strong>equations</strong>, but our constraints use ≤ and ≥. 
          We need to turn them into equations first.
        </p>
        <p className="step-text">We do this by adding helper variables:</p>
        <ul style={{ listStyle: 'none', marginBottom: 16 }}>
          <li style={{ padding: '6px 0', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent-blue)' }}>Slack Variables (S)</strong> — fill the "gap" in an inequality to make it equal
          </li>
          <li style={{ padding: '6px 0', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>Artificial Variables (A)</strong> — temporary helpers that give the algorithm a starting point (we remove them later)
          </li>
        </ul>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {step >= 1 && (
        <StepCard label="Step 1.2 — Rule 1" title='For ≤ Constraints: Just ADD a Slack Variable'>
          <p className="step-text">
            When a constraint says "less than or equal to," there's <strong>room leftover</strong>. 
            The slack variable S fills that gap.
          </p>
          <div className="math-arrow">
            <M display>{'2x + 3y \\leq 24'}</M>
            <span className="arrow">→</span>
            <M display>{'2x + 3y + S_1 = 24'}</M>
          </div>
          <TipCard type="remember">
            Think of it this way: if <M>{'2x + 3y = 20'}</M>, then <M>{'S_1 = 4'}</M> — that's 
            the leftover space. S₁ fills the gap to make it exactly equal.
          </TipCard>
          <TipCard type="shortcut">
            <strong>≤ = just add S.</strong> That's it. One variable, done.
          </TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 1.3 — Rule 2" title='For ≥ Constraints: Subtract S, Add A'>
          <p className="step-text">
            With ≥, the value goes <strong>over</strong> the minimum. We <strong>subtract</strong> a slack 
            (because we have extra), and <strong>add</strong> an artificial variable as a starter for the algorithm.
          </p>
          <div className="math-arrow">
            <M display>{'2x + 9y \\geq 36'}</M>
            <span className="arrow">→</span>
            <M display>{'2x + 9y - S_2 + A_1 = 36'}</M>
          </div>
          <TipCard type="remember">
            <strong>Why subtract S?</strong> Because with ≥, you have MORE than the minimum. The slack is "extra," so subtract it.
          </TipCard>
          <TipCard type="remember">
            <strong>Why add A?</strong> It's a temporary helper that gives the algorithm a starting point. We'll kick it out later.
          </TipCard>
          <TipCard type="shortcut">
            <strong>≥ = subtract S, add A.</strong> Two things to remember.
          </TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 1.4 — Rule 3" title='For = Constraints: Just Add A'>
          <p className="step-text">
            Equality constraints are already equations — no gap to fill!
            But we still need an artificial variable as a starting helper.
          </p>
          <div className="math-arrow">
            <M display>{'2x + y = 12'}</M>
            <span className="arrow">→</span>
            <M display>{'2x + y + A_2 = 12'}</M>
          </div>
          <TipCard type="tip">
            No slack needed because there's no gap — the constraint is exact.
          </TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <StepCard label="Step 1.5 — The Objective Function" title="Rewrite the Objective Function with Big-K">
          <p className="step-text">Now we rewrite the objective function. Two things happen:</p>
          <p className="step-text">
            <strong>1)</strong> Move everything to the left side (signs flip):
          </p>
          <div className="math-arrow">
            <M display>{'Z = 50x + 40y'}</M>
            <span className="arrow">→</span>
            <M display>{'-50x - 40y + Z = 0'}</M>
          </div>
          <p className="step-text">
            <strong>2)</strong> Add every artificial variable with a <strong>huge</strong> number <M>{'k'}</M> in front:
          </p>
          <M display>{'-50x - 40y + kA_1 + kA_2 + Z = 0'}</M>
          <TipCard type="remember">
            <strong>Why the Big K?</strong> It's a penalty. By giving A₁ and A₂ a huge number, we're 
            telling the algorithm: "Get rid of these!" The algorithm will naturally push them out.
          </TipCard>
          <TipCard type="shortcut">
            Formula: Move terms left (flip signs) → add kA for each artificial → add Z → set = 0.
          </TipCard>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {step >= 5 && (
        <StepCard label="Step 1.6 — Summary" title="Our New System of Equations" highlight>
          <p className="step-text">Here's our converted system:</p>
          <div className="summary-box">
            <h3>✨ Complete Converted System</h3>
            <M display>{'2x + 3y + S_1 = 24'}</M>
            <M display>{'2x + 9y - S_2 + A_1 = 36'}</M>
            <M display>{'2x + y + A_2 = 12'}</M>
            <M display>{'-50x - 40y + kA_1 + kA_2 + Z = 0'}</M>
            <div style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              All variables <M>{'x, y, S_1, S_2, A_1, A_2, Z \\geq 0'}</M> and <M>{'k'}</M> is a very large value.
            </div>
          </div>
          <TipCard type="shortcut">
            <strong>The 3 rules in one line:</strong><br/>
            • <strong>≤</strong> → + S &nbsp;&nbsp; • <strong>≥</strong> → − S + A &nbsp;&nbsp; • <strong>=</strong> → + A<br/>
            • <strong>Objective</strong> → move left, flip signs, add kA for each artificial
          </TipCard>
          {step === 5 && <ContinueBtn onClick={() => setStep(6)} />}
        </StepCard>
      )}

      {step >= 6 && (
        <>
          <Quiz
            id="conv1"
            question={<>How would you convert <M>{'5x + 3y \\leq 30'}</M>?</>}
            options={['5x + 3y + S = 30', '5x + 3y - S + A = 30', '5x + 3y + A = 30', '5x + 3y - S = 30']}
            correctIndex={0}
            explanation="For ≤, you just add a slack variable S. The simplest rule!"
            wrongExplanations={{1: "That's for ≥ (subtract S, add A). For ≤, just add S.", 2: "A is only for ≥ and =. For ≤, just add S.", 3: "You ADD S (positive), not subtract."}}
            hint="≤ is the simplest — you only add one thing."
            onCorrect={() => setSolved(s => ({...s, conv1: true}))}
          />
          <Quiz
            id="conv2"
            question={<>How would you convert <M>{'4x + 2y \\geq 20'}</M>?</>}
            options={['4x + 2y + S = 20', '4x + 2y + A = 20', '4x + 2y - S + A = 20', '4x + 2y + S + A = 20']}
            correctIndex={2}
            explanation="For ≥: subtract S (extra) and add A (starter). Two operations!"
            wrongExplanations={{0: "That's for ≤. For ≥, subtract S AND add A.", 1: "You need both: subtract S and add A.", 3: "S should be SUBTRACTED, not added."}}
            hint="≥ has two things: one subtracted, one added."
            onCorrect={() => setSolved(s => ({...s, conv2: true}))}
          />
          <Quiz
            id="conv3"
            question="If you have A₁ and A₂, and the objective is Z = 10x + 5y, how do you rewrite it?"
            options={['-10x - 5y + Z = 0', '-10x - 5y + kA₁ + kA₂ + Z = 0', '10x + 5y + kA₁ + kA₂ + Z = 0', '-10x - 5y - kA₁ - kA₂ + Z = 0']}
            correctIndex={1}
            explanation="Move left (flip signs), add kA for each artificial, add Z, set = 0."
            wrongExplanations={{0: "You forgot to add the artificial variables with k!", 2: "Signs flip when moving left: 10x becomes -10x.", 3: "k values are POSITIVE, not negative — they're penalties."}}
            hint="Flip signs when moving left, and k is always positive."
            onCorrect={() => setSolved(s => ({...s, conv3: true}))}
          />
          {allDone && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🎉</div>
              <p className="step-text" style={{ textAlign: 'center' }}>
                <strong>Great job!</strong> You've mastered constraint conversion. Now let's build the tableau!
              </p>
              <ContinueBtn onClick={onComplete} label="On to Step 2 →" />
            </div>
          )}
        </>
      )}
    </Section>
  );
}
