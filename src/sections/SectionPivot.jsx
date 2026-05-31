import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, Tableau } from '../components';

export default function SectionPivot({ onComplete }) {
  const [step, setStep] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  return (
    <Section
      badge="Steps 4–6 of 6"
      title="Pivoting & Iteration"
      intro="Now comes the core loop of the simplex algorithm: find the pivot, reduce it, and repeat until we reach the optimal solution."
    >
      {/* 4.1: Overview */}
      <StepCard label="Step 4.1" title="The Pivot Loop — Overview">
        <p className="step-text">From here, we repeat three actions in a loop:</p>
        <div style={{ display: 'grid', gap: 12, margin: '16px 0' }}>
          <div className="step-card" style={{ margin: 0, padding: 16, borderLeft: '3px solid var(--accent-blue)' }}>
            <strong style={{ color: 'var(--accent-blue)' }}>Step 4:</strong>{' '}
            Find the <strong>pivot column</strong> (most negative in objective row), <strong>pivot row</strong> (smallest positive ratio), and <strong>pivot element</strong> (their intersection).
          </div>
          <div className="step-card" style={{ margin: 0, padding: 16, borderLeft: '3px solid var(--accent-emerald)' }}>
            <strong style={{ color: 'var(--accent-emerald)' }}>Step 5:</strong>{' '}
            Make the pivot = 1 and all other entries in the pivot column = 0 using row operations.
          </div>
          <div className="step-card" style={{ margin: 0, padding: 16, borderLeft: '3px solid var(--accent-purple)' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>Step 6:</strong>{' '}
            Check the objective row. If there are still negative entries → go back to Step 4. If all entries ≥ 0 → <strong>DONE!</strong>
          </div>
        </div>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {/* 4.2: Find pivot column */}
      {step >= 1 && (
        <StepCard label="Step 4.2" title="Finding the Pivot Column">
          <p className="step-text">
            Look at the objective row and find the <strong>most negative entry</strong>. That column is the pivot column.
          </p>
          <Tableau
            title="Tableau 1 — Objective Row"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[
              ['S₁', '2', '3', '1', '0', '0', '0', '0', '24'],
              ['A₁', '2', '9', '0', '−1', '1', '0', '0', '36'],
              ['A₂', '2', '1', '0', '0', '0', '1', '0', '12'],
              ['', '−4k−50', '−10k−40', '0', 'k', '0', '0', '1', '−48k'],
            ]}
            pivotCol={2}
          />
          <p className="step-text">
            The entries are: <M>{'-4k-50'}</M>, <M>{'-10k-40'}</M>, 0, <M>{'k'}</M>, 0, 0, 1<br/>
            Since <M>{'k'}</M> is very large, <M>{'-10k-40'}</M> is the most negative → <strong>y column</strong> is the pivot column! 🎯
          </p>
          <TipCard type="shortcut">
            When comparing terms with k: the one with the <strong>larger negative k coefficient</strong> is more negative. 
            Here −10k &lt; −4k, so −10k−40 wins.
          </TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {/* 4.3: Find pivot row */}
      {step >= 2 && (
        <StepCard label="Step 4.3" title="Finding the Pivot Row (Ratio Test)">
          <p className="step-text">
            Divide each row's <strong>Qty</strong> by its entry in the pivot column (y column). Only use <strong>positive</strong> entries!
          </p>
          <Tableau
            title="Ratio Test"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[
              ['S₁', '2', '3', '1', '0', '0', '0', '0', '24'],
              ['A₁', '2', '9', '0', '−1', '1', '0', '0', '36'],
              ['A₂', '2', '1', '0', '0', '0', '1', '0', '12'],
              ['', '−4k−50', '−10k−40', '0', 'k', '0', '0', '1', '−48k'],
            ]}
            pivotCol={2}
            pivotRow={1}
            ratios={['24÷3 = 8', '36÷9 = 4 ✓', '12÷1 = 12']}
          />
          <p className="step-text">
            Ratios: 8, <strong>4</strong>, 12. The smallest positive ratio is <strong>4</strong> (Row 2, A₁ row).
            So <strong>A₁ row</strong> is the pivot row!
          </p>
          <TipCard type="remember">
            <strong>The pivot element</strong> is where the pivot column and pivot row intersect: <M>{'9'}</M> (y column, A₁ row).
          </TipCard>
          <TipCard type="mistake">
            Never use negative or zero entries in the ratio test! If the pivot column entry is ≤ 0, skip that row.
          </TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {/* 4.4: Perform pivot */}
      {step >= 3 && (
        <StepCard label="Step 4.4" title="Performing the Pivot (Row Operations)">
          <p className="step-text">
            <strong>Goal:</strong> Make the pivot (9) become 1, and all other entries in the y column become 0.
          </p>
          <p className="step-text"><strong>Step 5a:</strong> Divide the pivot row by 9 (R₂ ÷ 9):</p>
          <div className="math-block" style={{ textAlign: 'left', fontSize: '0.88rem' }}>
            <M display>{'\\text{New R}_2: \\quad \\frac{2}{9}, \\; 1, \\; 0, \\; \\frac{-1}{9}, \\; \\frac{1}{9}, \\; 0, \\; 0, \\; 4'}</M>
          </div>
          <p className="step-text"><strong>Step 5b:</strong> Eliminate y from other rows:</p>
          <ul style={{ listStyle: 'none', marginBottom: 16 }}>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>
              • R₁ → R₁ − 3 × (new R₂) <span style={{ color: 'var(--text-muted)' }}>(to make y=0 in Row 1)</span>
            </li>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>
              • R₃ → R₃ − 1 × (new R₂) <span style={{ color: 'var(--text-muted)' }}>(to make y=0 in Row 3)</span>
            </li>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>
              • R₄ → R₄ + (10k+40) × (new R₂) <span style={{ color: 'var(--text-muted)' }}>(to make y=0 in objective row)</span>
            </li>
          </ul>
          <TipCard type="tip">
            The multiplier for each row = <strong>negative of that row's entry in the pivot column</strong>.
            Row 1 has 3 → multiply new R₂ by −3 and add to Row 1.
          </TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {/* 4.5: Tableau 2 */}
      {step >= 4 && (
        <StepCard label="Step 4.5" title="Tableau 2 — After First Pivot">
          <p className="step-text">After all row operations, we get Tableau 2. Notice A₁ left the basis, replaced by <strong>y</strong>!</p>
          <Tableau
            title="Tableau 2"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[
              ['S₁', '4/3', '0', '1', '1/3', '−1/3', '0', '0', '12'],
              ['y', '2/9', '1', '0', '−1/9', '1/9', '0', '0', '4'],
              ['A₂', '16/9', '0', '0', '1/9', '−1/9', '1', '0', '8'],
              ['', '(−16k−370)/9', '0', '0', '(−k−40)/9', '(10k+40)/9', '0', '1', '−8k+160'],
            ]}
          />
          <p className="step-text">
            <strong>Check the objective row:</strong> There are still negative entries → we're <strong>NOT done yet</strong>. Back to Step 4!
          </p>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {/* 4.6: Second Iteration */}
      {step >= 5 && (
        <StepCard label="Step 4.6" title="Second Iteration — Finding the Next Pivot">
          <p className="step-text">
            Most negative entry in objective row: <M>{'\\frac{-16k-370}{9}'}</M> (x column).
            Pivot column = <strong>x</strong>.
          </p>
          <p className="step-text">Ratio test:</p>
          <ul style={{ listStyle: 'none', marginBottom: 16, fontSize: '0.92rem' }}>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>
              Row 1 (S₁): 12 ÷ (4/3) = <strong>9</strong>
            </li>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>
              Row 2 (y): 4 ÷ (2/9) = <strong>18</strong>
            </li>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>
              Row 3 (A₂): 8 ÷ (16/9) = <strong>4.5</strong> ← smallest! ✓
            </li>
          </ul>
          <p className="step-text">
            Pivot row = <strong>A₂ row</strong>, pivot element = <strong>16/9</strong>.
          </p>
          <p className="step-text">
            After performing row operations (divide R₃ by 16/9, eliminate x from other rows):
          </p>
          <Tableau
            title="Tableau 3"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[
              ['S₁', '0', '0', '1', '1/4', '−1/4', '−3/4', '0', '6'],
              ['y', '0', '1', '0', '−1/8', '1/8', '−1/8', '0', '3'],
              ['x', '1', '0', '0', '1/16', '−1/16', '9/16', '0', '9/2'],
              ['', '0', '0', '0', '−15/8', '(8k+15)/8', '(8k+185)/8', '1', '345'],
            ]}
          />
          <p className="step-text">
            <strong>Check:</strong> The objective row still has <M>{'-15/8'}</M> under S₂ — still negative! One more iteration...
          </p>
          {step === 5 && <ContinueBtn onClick={() => setStep(6)} />}
        </StepCard>
      )}

      {/* 4.7: Third Iteration */}
      {step >= 6 && (
        <StepCard label="Step 4.7" title="Third Iteration — Almost There!">
          <p className="step-text">
            Pivot column = <strong>S₂</strong> (−15/8 is the only negative entry).
          </p>
          <p className="step-text">Ratio test:</p>
          <ul style={{ listStyle: 'none', marginBottom: 16, fontSize: '0.92rem' }}>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>
              Row 1 (S₁): 6 ÷ (1/4) = <strong>24</strong> ← smallest positive! ✓
            </li>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>
              Row 2 (y): 3 ÷ (−1/8) → <em>negative, skip!</em>
            </li>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>
              Row 3 (x): (9/2) ÷ (1/16) = <strong>72</strong>
            </li>
          </ul>
          <p className="step-text">
            Pivot row = <strong>S₁ row</strong>, pivot element = <strong>1/4</strong>.
            After row operations:
          </p>
          <Tableau
            title="Tableau 4 — FINAL"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[
              ['S₁', '0', '0', '4', '1', '−1', '−3', '0', '24'],
              ['y', '0', '1', '1/2', '0', '0', '−1/2', '0', '6'],
              ['x', '1', '0', '−1/4', '0', '0', '3/4', '0', '3'],
              ['', '0', '0', '15/2', '0', 'k', '(2k+35)/4', '1', '390'],
            ]}
          />
          {step === 6 && <ContinueBtn onClick={() => setStep(7)} />}
        </StepCard>
      )}

      {/* 4.8: Optimality check */}
      {step >= 7 && (
        <StepCard label="Step 4.8" title="Optimality Check ✅" highlight>
          <p className="step-text">
            Look at the objective row: <strong>0, 0, 15/2, 0, k, (2k+35)/4, 1</strong>
          </p>
          <p className="step-text">
            <strong>All entries are non-negative!</strong> (Remember, k is a very large positive number.)
          </p>
          <p className="step-text" style={{ fontSize: '1.1rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            🎯 We've reached the OPTIMAL SOLUTION!
          </p>
          <TipCard type="remember">
            <strong>Stopping rule:</strong> The algorithm stops when ALL entries in the objective row (excluding the Qty column) are ≥ 0.
            Negative entries mean we can still improve. Non-negative = optimal!
          </TipCard>
          {step === 7 && <ContinueBtn onClick={() => setStep(8)} />}
        </StepCard>
      )}

      {/* QUIZ */}
      {step >= 8 && (
        <>
          <Quiz
            id="pv1"
            question="How do you find the pivot column?"
            options={[
              'The column with the largest entry in the objective row',
              'The column with the most negative entry in the objective row',
              'The first column with a non-zero entry',
              'The column with the smallest ratio',
            ]}
            correctIndex={1}
            explanation="The most negative entry in the objective row indicates where we can improve the most, so that's our pivot column."
            wrongExplanations={{
              0: "We want the MOST NEGATIVE, not the largest. The most negative value shows where Z can improve the most.",
              2: "Non-zero isn't the criterion — it's about finding the most negative value.",
              3: "The smallest ratio is used to find the pivot ROW, not the pivot column.",
            }}
            hint="Which entry shows the most room for improvement?"
          />
          <Quiz
            id="pv2"
            question="During the ratio test, what do you do if a pivot column entry is negative or zero?"
            options={[
              'Use it anyway',
              'Make it positive by taking the absolute value',
              'Skip that row — don\'t include it in the ratio test',
              'Set the ratio to infinity',
            ]}
            correctIndex={2}
            explanation="Only positive entries in the pivot column are used for the ratio test. Negative or zero entries are skipped entirely."
            wrongExplanations={{
              0: "Using negative entries would give wrong ratios and could lead to infeasible solutions.",
              1: "Taking absolute values would change the meaning of the ratio — always skip negative entries.",
              3: "While conceptually similar, the proper technique is simply to skip that row.",
            }}
            hint="Think about what a negative ratio would mean — can you have a negative quantity?"
            onCorrect={() => setQuizDone(true)}
          />
          {quizDone && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🎉</div>
              <p className="step-text" style={{ textAlign: 'center' }}>
                <strong>You've mastered the pivot loop!</strong> Let's read the final answer from our tableau.
              </p>
              <ContinueBtn onClick={onComplete} label="Read the Solution →" />
            </div>
          )}
        </>
      )}
    </Section>
  );
}
