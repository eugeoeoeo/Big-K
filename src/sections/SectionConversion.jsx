import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, Tableau } from '../components';

export default function SectionConversion({ onComplete }) {
  const [step, setStep] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  return (
    <Section
      badge="Step 1 of 6"
      title="Converting the Constraints"
      intro="The simplex algorithm only works with equations (=), not inequalities (≤ or ≥). So first, we convert every constraint into an equation by adding special variables."
    >
      {/* SUB-STEP 1: WHY CONVERT */}
      <StepCard label="Step 1.1" title="Why Do We Need to Convert?">
        <p className="step-text">
          The simplex method works by solving a <strong>system of equations</strong>. But our constraints have
          inequalities like ≤ and ≥. We need to turn them into <strong>equations</strong>.
        </p>
        <p className="step-text">
          We do this by introducing new variables:
        </p>
        <ul style={{ listStyle: 'none', marginBottom: 16 }}>
          <li style={{ padding: '6px 0', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent-blue)' }}>Slack Variables (S)</strong> — absorb the "slack" or leftover in an inequality
          </li>
          <li style={{ padding: '6px 0', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>Artificial Variables (A)</strong> — "fake starters" that help the algorithm begin, but must be driven out later
          </li>
        </ul>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {/* SUB-STEP 2: ≤ Rule */}
      {step >= 1 && (
        <StepCard label="Step 1.2 — Rule 1" title='For ≤ Constraints: Just ADD a Slack Variable'>
          <p className="step-text">
            When a constraint says "less than or equal to," there's <strong>room leftover</strong>. The slack variable <M>{'S'}</M> represents that leftover.
          </p>
          <div className="math-arrow">
            <M display>{'2x + 3y \\leq 24'}</M>
            <span className="arrow">→</span>
            <M display>{'2x + 3y + S_1 = 24'}</M>
          </div>
          <TipCard type="remember">
            Think of it this way: if <M>{'2x + 3y = 20'}</M>, then <M>{'S_1 = 4'}</M> — that's the slack (leftover space). The <M>{'S_1'}</M> fills the gap to make it exactly equal.
          </TipCard>
          <TipCard type="shortcut">
            <strong>≤ = just add S.</strong> That's the simplest one. One variable, done.
          </TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {/* SUB-STEP 3: ≥ Rule */}
      {step >= 2 && (
        <StepCard label="Step 1.3 — Rule 2" title='For ≥ Constraints: Subtract S, Add A'>
          <p className="step-text">
            This one's trickier. With ≥, the actual value <strong>exceeds</strong> the minimum.
            We <strong>subtract</strong> a slack variable (because we're OVER the limit),
            but we also need an <strong>artificial variable</strong> to give the algorithm a starting point.
          </p>
          <div className="math-arrow">
            <M display>{'2x + 9y \\geq 36'}</M>
            <span className="arrow">→</span>
            <M display>{'2x + 9y - S_2 + A_1 = 36'}</M>
          </div>
          <TipCard type="remember">
            <strong>Why subtract S?</strong> Because with ≥, you have MORE than enough, not less. The slack is "excess," so we subtract it.
          </TipCard>
          <TipCard type="remember">
            <strong>Why add A?</strong> The artificial variable A is a temporary helper. It gives the simplex algorithm a valid starting point.
            We'll get rid of it later using the Big-K method.
          </TipCard>
          <TipCard type="shortcut">
            <strong>≥ = subtract S, add A.</strong> Two things to remember.
          </TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {/* SUB-STEP 4: = Rule */}
      {step >= 3 && (
        <StepCard label="Step 1.4 — Rule 3" title='For = Constraints: Just Add A'>
          <p className="step-text">
            Equality constraints already ARE equations — no slack needed!
            But we still need an artificial variable as a starting point for the algorithm.
          </p>
          <div className="math-arrow">
            <M display>{'2x + y = 12'}</M>
            <span className="arrow">→</span>
            <M display>{'2x + y + A_2 = 12'}</M>
          </div>
          <TipCard type="tip">
            No slack needed because there's no "leftover" — the constraint is exact. But the artificial variable is still needed so simplex can start.
          </TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {/* SUB-STEP 5: Objective Function */}
      {step >= 4 && (
        <StepCard label="Step 1.5 — The Objective Function" title="Rewrite the Objective Function with Big-K">
          <p className="step-text">
            Now we transform the objective function. Two things happen:
          </p>
          <p className="step-text">
            <strong>1)</strong> Move everything to the left side (set equal to 0):
          </p>
          <div className="math-arrow">
            <M display>{'Z = 50x + 40y'}</M>
            <span className="arrow">→</span>
            <M display>{'-50x - 40y + Z = 0'}</M>
          </div>
          <p className="step-text">
            <strong>2)</strong> Add every artificial variable with a <strong>huge</strong> coefficient <M>{'k'}</M>:
          </p>
          <M display>{'-50x - 40y + kA_1 + kA_2 + Z = 0'}</M>
          <TipCard type="remember">
            The <strong>Big K</strong> is a very, very large number. By giving artificial variables a big positive coefficient in the objective (which we're maximizing),
            we're telling the algorithm: "These artificial variables should NOT be in the final answer." The algorithm will naturally push them out because keeping them would mean
            we haven't really maximized Z.
          </TipCard>
          <TipCard type="shortcut">
            Quick formula: Move terms left → flip signs → add <M>{'kA'}</M> for each artificial → add <M>{'Z'}</M> → set = 0.
          </TipCard>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {/* SUB-STEP 6: Summary */}
      {step >= 5 && (
        <StepCard label="Step 1.6 — Summary" title="Our New System of Equations" highlight>
          <p className="step-text">Here's what we started with and what we end up with:</p>
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
            <strong>Quick recap of the 3 rules:</strong><br/>
            • <strong>≤</strong> → + S (add slack)<br/>
            • <strong>≥</strong> → − S + A (subtract slack, add artificial)<br/>
            • <strong>=</strong> → + A (add artificial only)<br/>
            • <strong>Objective</strong> → transpose, add kA for each artificial
          </TipCard>
          {step === 5 && <ContinueBtn onClick={() => setStep(6)} />}
        </StepCard>
      )}

      {/* QUIZ */}
      {step >= 6 && (
        <>
          <Quiz
            id="conv1"
            question={<>How would you convert <M>{'5x + 3y \\leq 30'}</M> to standard form?</>}
            options={[
              '5x + 3y + S = 30',
              '5x + 3y - S + A = 30',
              '5x + 3y + A = 30',
              '5x + 3y - S = 30',
            ]}
            correctIndex={0}
            explanation="For ≤ constraints, you just add a slack variable S. Simple!"
            wrongExplanations={{
              1: "That's the rule for ≥ constraints (subtract S, add A). For ≤, you only need to add S.",
              2: "Artificial variables are only needed for ≥ and = constraints. For ≤, just add a slack S.",
              3: "You need to ADD (not subtract) the slack variable for ≤ constraints.",
            }}
            hint="≤ is the simplest case — you only add one variable."
          />
          <Quiz
            id="conv2"
            question={<>How would you convert <M>{'4x + 2y \\geq 20'}</M> to standard form?</>}
            options={[
              '4x + 2y + S = 20',
              '4x + 2y + A = 20',
              '4x + 2y - S + A = 20',
              '4x + 2y + S + A = 20',
            ]}
            correctIndex={2}
            explanation="For ≥ constraints: subtract S (because you're OVER the limit) and add A (as a starter for the algorithm)."
            wrongExplanations={{
              0: "That's the rule for ≤ constraints. For ≥, you need to subtract S AND add A.",
              1: "Close! You need the artificial A, but you're missing the slack S (which gets subtracted).",
              3: "Almost! The slack S should be SUBTRACTED (minus), not added, because with ≥ you have excess.",
            }}
            hint="≥ has two things: one subtracted, one added."
          />
          <Quiz
            id="conv3"
            question="If you have artificial variables A₁ and A₂, and the objective is Z = 10x + 5y, how do you rewrite it?"
            options={[
              '-10x - 5y + Z = 0',
              '-10x - 5y + kA₁ + kA₂ + Z = 0',
              '10x + 5y + kA₁ + kA₂ + Z = 0',
              '-10x - 5y - kA₁ - kA₂ + Z = 0',
            ]}
            correctIndex={1}
            explanation="Transpose to left (flip signs), add kA for each artificial variable, add Z, set = 0."
            wrongExplanations={{
              0: "You've transposed correctly, but you forgot to add the artificial variables with k coefficients!",
              2: "The signs are wrong — when you move terms to the left side, their signs flip. 10x becomes -10x.",
              3: "The artificial variables should have POSITIVE k coefficients, not negative. We want to penalize them.",
            }}
            hint="Remember: flip signs when transposing, and k coefficients for artificials are POSITIVE."
            onCorrect={() => setQuizDone(true)}
          />
          {quizDone && (
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
