import { useState, useEffect } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, Tableau } from '../components';

export default function SectionExam({ onComplete }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const total = 6;

  const addScore = () => setScore(s => s + 1);

  useEffect(() => {
    if (step >= 7 && onComplete) onComplete();
  }, [step]);

  return (
    <Section
      badge="📝 Final Exam"
      title="Final Exam: Solve It Yourself!"
      intro="Your turn! Solve this problem step by step. Get it right to move on — get it wrong and you'll see why."
    >
      <StepCard label="The Problem" title="Your Challenge" highlight>
        <M display>{'\\text{Maximize } P = x + 2y + 3z'}</M>
        <p className="step-text" style={{ marginTop: 16 }}>Subject to:</p>
        <M display>{'4x + 2y + 2z \\leq 200'}</M>
        <M display>{'3x + 3y \\geq 30'}</M>
        <M display>{'x, y, z \\geq 0'}</M>
        <TipCard type="tip">
          This problem has 3 decision variables (x, y, z) and 2 constraints — one ≤ and one ≥. Apply the same steps we just learned!
        </TipCard>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} label="Let's Go! →" />}
      </StepCard>

      {/* Q1: Convert ≤ constraint */}
      {step >= 1 && (
        <>
          <Quiz
            id="ex1"
            question={<><strong>Step 1:</strong> Convert the first constraint <M>{'4x + 2y + 2z \\leq 200'}</M> to standard form.</>}
            options={[
              '4x + 2y + 2z + S₁ = 200',
              '4x + 2y + 2z - S₁ + A₁ = 200',
              '4x + 2y + 2z + A₁ = 200',
              '4x + 2y + 2z - S₁ = 200',
            ]}
            correctIndex={0}
            explanation="≤ → just add S. The simplest one!"
            wrongExplanations={{
              1: "That's the rule for ≥ constraints (subtract S, add A). For ≤, you only add S.",
              2: "Artificial variables are only for ≥ and = constraints. ≤ just needs a slack variable.",
              3: "For ≤, you ADD S (positive), not subtract. The slack represents leftover room.",
            }}
            hint="Remember the simplest rule: ≤ = just add S."
            onCorrect={() => { addScore(); setStep(s => Math.max(s, 2)); }}
          />
        </>
      )}

      {/* Q2: Convert ≥ constraint */}
      {step >= 2 && (
        <Quiz
          id="ex2"
          question={<><strong>Step 1 (cont.):</strong> Convert the second constraint <M>{'3x + 3y \\geq 30'}</M> to standard form.</>}
          options={[
            '3x + 3y + S₂ = 30',
            '3x + 3y - S₂ = 30',
            '3x + 3y - S₂ + A₁ = 30',
            '3x + 3y + S₂ + A₁ = 30',
          ]}
          correctIndex={2}
          explanation="≥ → subtract S (extra) and add A (starter). Two steps!"
          wrongExplanations={{
            0: "That's the rule for ≤, not ≥. For ≥, you need to subtract S and add A.",
            1: "You're missing the artificial variable A₁! For ≥, you need both −S and +A.",
            3: "Close, but the slack variable should be SUBTRACTED (−S₂), not added. With ≥, you have excess.",
          }}
          hint="≥ = subtract S, add A. Two operations."
          onCorrect={() => { addScore(); setStep(s => Math.max(s, 3)); }}
        />
      )}

      {/* Q3: Objective function */}
      {step >= 3 && (
        <Quiz
          id="ex3"
          question={<><strong>Step 1 (cont.):</strong> Rewrite the objective function <M>{'P = x + 2y + 3z'}</M> with artificial variable A₁.</>}
          options={[
            '-x - 2y - 3z + kA₁ + P = 0',
            'x + 2y + 3z + kA₁ + P = 0',
            '-x - 2y - 3z - kA₁ + P = 0',
            '-x - 2y - 3z + kA₁ = 0',
          ]}
          correctIndex={0}
          explanation="Move left (flip signs), add kA₁, add P, set = 0. Perfect!"
          wrongExplanations={{
            1: "When you move terms to the left side, their signs FLIP. x becomes −x, 2y becomes −2y, etc.",
            2: "The k coefficient for artificial variables should be POSITIVE, not negative. It's a penalty.",
            3: "You're missing P! The objective variable P must be included on the left side.",
          }}
          hint="Move everything left (flip signs), add kA for each artificial, include P."
          onCorrect={() => { addScore(); setStep(s => Math.max(s, 4)); }}
        />
      )}

      {/* Q4: Tableau construction */}
      {step >= 4 && (
        <>
          <StepCard label="Step 2" title="Your Converted System">
            <p className="step-text">Based on your answers, the converted system is:</p>
            <M display>{'4x + 2y + 2z + S_1 = 200'}</M>
            <M display>{'3x + 3y + 0z - S_2 + A_1 = 30'}</M>
            <M display>{'-x - 2y - 3z + kA_1 + P = 0'}</M>
            <p className="step-text">
              Variables: <M>{'x, y, z, S_1, S_2, A_1, P'}</M> (7 variables → 9 columns with Basis + Qty)
            </p>
          </StepCard>
          <Quiz
            id="ex4"
            question={<><strong>Step 2:</strong> What are the basis variables for this initial tableau?</>}
            options={[
              'x, y, z',
              'S₁, A₁',
              'S₁, S₂',
              'S₁, S₂, A₁',
            ]}
            correctIndex={1}
            explanation="S₁ owns the ≤ row (the slack we added), and A₁ owns the ≥ row (the artificial we added). That's it!"
            wrongExplanations={{
              0: "x, y, z are the decision variables, not the basis. The basis consists of slack/artificial variables that start as identity columns.",
              2: "S₂ is subtracted (coefficient −1), so it doesn't form an identity column and can't be a basis variable.",
              3: "S₂ has coefficient −1, not +1, so it can't be a basis variable. Only S₁ and A₁ qualify.",
            }}
            hint="Basis variables are the ones with coefficient +1 in exactly one row and 0 in all others."
            onCorrect={() => { addScore(); setStep(s => Math.max(s, 5)); }}
          />
        </>
      )}

      {/* Q5: Pivot column after driving out k */}
      {step >= 5 && (
        <>
          <StepCard label="Step 3" title="After Driving Out k">
            <p className="step-text">
              We drive out k from A₁ by: Row 2 × (−k) + Objective Row. The result:
            </p>
            <Tableau
              title="Tableau 1"
              headers={['Basis', 'x', 'y', 'z', 'S₁', 'S₂', 'A₁', 'P', 'Qty']}
              rows={[
                ['S₁', '4', '2', '2', '1', '0', '0', '0', '200'],
                ['A₁', '3', '3', '0', '0', '−1', '1', '0', '30'],
                ['', '−3k−1', '−3k−2', '−3', '0', 'k', '0', '1', '−30k'],
              ]}
            />
          </StepCard>
          <Quiz
            id="ex5"
            question={<><strong>Step 4:</strong> Which is the pivot column in Tableau 1?</>}
            options={[
              'x column (−3k−1)',
              'y column (−3k−2)',
              'z column (−3)',
              'S₂ column (k)',
            ]}
            correctIndex={1}
            explanation="Both x and y have −3k as the k-coefficient, but y has −3k−2 which is more negative than −3k−1. So y is the pivot column!"
            wrongExplanations={{
              0: "x (−3k−1) and y (−3k−2) both have −3k, but −3k−2 < −3k−1, so y is more negative.",
              2: "z (−3) has no k term, so it's much less negative than −3k−1 or −3k−2 when k is very large.",
              3: "k is a large positive number — it's the MOST positive, not negative! We want the most negative.",
            }}
            hint="Compare the k coefficients first. If tied, compare the constant terms."
            onCorrect={() => { addScore(); setStep(s => Math.max(s, 6)); }}
          />
        </>
      )}

      {/* Q6: Final answer */}
      {step >= 6 && (
        <>
          <StepCard label="Steps 5-6" title="Completing the Pivoting">
            <p className="step-text">
              After pivoting on y (pivot row = A₁, ratio = 30÷3 = 10 vs 200÷2 = 100):
            </p>
            <Tableau
              title="Tableau 2"
              headers={['Basis', 'x', 'y', 'z', 'S₁', 'S₂', 'A₁', 'P', 'Qty']}
              rows={[
                ['S₁', '2', '0', '2', '1', '2/3', '−2/3', '0', '180'],
                ['y', '1', '1', '0', '0', '−1/3', '1/3', '0', '10'],
                ['', '1', '0', '−3', '0', '−2/3', 'k+2/3', '1', '20'],
              ]}
            />
            <p className="step-text">
              Still negative (−3 under z). Pivot on z column → S₁ row (180÷2 = 90, y row has 0 → skip):
            </p>
            <Tableau
              title="Tableau 3 — FINAL"
              headers={['Basis', 'x', 'y', 'z', 'S₁', 'S₂', 'A₁', 'P', 'Qty']}
              rows={[
                ['z', '1', '0', '1', '1/2', '1/3', '−1/3', '0', '90'],
                ['y', '1', '1', '0', '0', '−1/3', '1/3', '0', '10'],
                ['', '4', '0', '0', '3/2', '1/3', 'k−1/3', '1', '290'],
              ]}
            />
            <p className="step-text" style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
              ✅ All objective row entries are non-negative — optimal solution reached!
            </p>
          </StepCard>
          <Quiz
            id="ex6"
            question={<><strong>Final Question:</strong> What is the optimal solution?</>}
            options={[
              'x = 90, y = 10, z = 0, P = 290',
              'x = 0, y = 10, z = 90, P = 290',
              'x = 1, y = 1, z = 90, P = 290',
              'x = 10, y = 0, z = 90, P = 290',
            ]}
            correctIndex={1}
            explanation="Read the basis: z = 90, y = 10. x is NOT in the basis, so x = 0. P = 290 from the objective row Qty. Verify: P = 0 + 2(10) + 3(90) = 290 ✓"
            wrongExplanations={{
              0: "x is NOT in the basis column, so x = 0, not 90. z = 90 and y = 10.",
              2: "x is NOT in the basis at all, so its value is 0, not 1.",
              3: "y IS in the basis with value 10, and x is NOT in the basis (value = 0).",
            }}
            hint="Variables in the Basis column → their value is in Qty. Variables NOT in Basis → their value is 0."
            onCorrect={() => { addScore(); setStep(s => Math.max(s, 7)); }}
          />
        </>
      )}

      {/* Results */}
      {step >= 7 && (
        <div className="result-card">
          <div style={{ fontSize: '3rem' }}>
            {score >= 5 ? '🏆' : score >= 3 ? '👍' : '💪'}
          </div>
          <div className="result-score" style={{ color: score >= 5 ? 'var(--accent-emerald)' : score >= 3 ? 'var(--accent-amber)' : 'var(--accent-rose)' }}>
            {score}/{total}
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 8 }}>
            {score === total ? 'PERFECT SCORE! 🎉' : score >= 5 ? 'Excellent Work!' : score >= 3 ? 'Good Job!' : 'Keep Practicing!'}
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
            {score === total
              ? "You've completely mastered LP Maximization with Mixed Constraints. You're ready for any exam!"
              : score >= 5
              ? "Great understanding! Review any sections you missed for a perfect score."
              : score >= 3
              ? "You understand the basics. Review the steps you got wrong and try again."
              : "Don't worry! Go back through the lessons and take your time with each step."}
          </p>

          <div className="summary-box" style={{ textAlign: 'left', marginTop: 24 }}>
            <h3>📋 Complete Algorithm Summary</h3>
            <ul>
              <li><strong>Step 1:</strong> Convert constraints (≤ → +S, ≥ → −S+A, = → +A). Rewrite objective with kA terms.</li>
              <li><strong>Step 2:</strong> Build tableau: rows = equations, columns = variables + 2.</li>
              <li><strong>Step 3:</strong> Drive out k: multiply artificial's row by −k, add to objective row.</li>
              <li><strong>Step 4:</strong> Find pivot column (most negative in obj row), pivot row (smallest positive ratio).</li>
              <li><strong>Step 5:</strong> Reduce pivot to 1, eliminate other entries in pivot column.</li>
              <li><strong>Step 6:</strong> Repeat 4-5 until all objective row entries ≥ 0. Read answer from Basis + Qty.</li>
            </ul>
          </div>

          <div className="btn-group" style={{ justifyContent: 'center', marginTop: 24 }}>
            <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              ↑ Back to Top
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
