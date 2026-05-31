import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, Tableau } from '../components';

export default function SectionPivot({ onComplete }) {
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState({});
  const allDone = solved.pv1 && solved.pv2;

  return (
    <Section
      badge="Steps 4–6 of 6"
      title="Pivoting & Iteration"
      intro="Now the main loop: find the pivot, do row operations, and repeat until we get the best answer."
    >
      <StepCard label="Step 4.1" title="The Pivot Loop — Overview">
        <p className="step-text">From here, we repeat three steps in a loop:</p>
        <div style={{ display: 'grid', gap: 12, margin: '16px 0' }}>
          <div className="step-card" style={{ margin: 0, padding: 16, borderLeft: '3px solid var(--accent-blue)' }}>
            <strong style={{ color: 'var(--accent-blue)' }}>Step 4 — Find the pivot:</strong>{' '}
            Pick the <strong>most negative</strong> number in the bottom row (= pivot column). Then find the <strong>smallest positive ratio</strong> (= pivot row). Where they meet = the <strong>pivot</strong>.
          </div>
          <div className="step-card" style={{ margin: 0, padding: 16, borderLeft: '3px solid var(--accent-emerald)' }}>
            <strong style={{ color: 'var(--accent-emerald)' }}>Step 5 — Do row operations:</strong>{' '}
            Make the pivot = 1, and make everything else in that column = 0.
          </div>
          <div className="step-card" style={{ margin: 0, padding: 16, borderLeft: '3px solid var(--accent-purple)' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>Step 6 — Check:</strong>{' '}
            Look at the bottom row. Still have negatives? → Go back to Step 4. All positive or zero? → <strong>DONE!</strong>
          </div>
        </div>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {step >= 1 && (
        <StepCard label="Step 4.2" title="Finding the Pivot Column">
          <p className="step-text">
            Look at the bottom row. Find the <strong>most negative number</strong> — that's your pivot column.
          </p>
          <Tableau
            title="Tableau 1 — Bottom Row"
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
            Since k is a huge number, <M>{'-10k-40'}</M> is the most negative → <strong>y column is the pivot column!</strong> 🎯
          </p>
          <TipCard type="shortcut">
            When comparing terms with k: bigger k means more negative. −10k beats −4k because 10 &gt; 4.
          </TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 4.3" title="Finding the Pivot Row (Ratio Test)">
          <p className="step-text">
            Divide each row's <strong>Qty</strong> by its number in the pivot column. Pick the <strong>smallest positive</strong> result.
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
            Ratios: 8, <strong>4</strong>, 12. Smallest is <strong>4</strong> → <strong>A₁ row is the pivot row!</strong>
          </p>
          <p className="step-text">
            The <strong>pivot element</strong> = where they meet = <strong>9</strong> (y column, A₁ row).
          </p>
          <TipCard type="mistake">
            Never use negative or zero numbers for the ratio test! If the pivot column has 0 or a negative, skip that row.
          </TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 4.4" title="Doing the Row Operations">
          <p className="step-text">
            <strong>Goal:</strong> Make the pivot (9) become <strong>1</strong>, and everything else in the y column become <strong>0</strong>.
          </p>
          <p className="step-text"><strong>First:</strong> Divide the pivot row by 9 (so 9 becomes 1).</p>
          <p className="step-text"><strong>Then:</strong> Use that new row to zero out y in the other rows:</p>
          <ul style={{ listStyle: 'none', marginBottom: 16 }}>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>• R₁ − 3 × (new R₂) → makes y = 0 in Row 1</li>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>• R₃ − 1 × (new R₂) → makes y = 0 in Row 3</li>
            <li style={{ padding: '4px 0', color: 'var(--text-secondary)' }}>• R₄ + (10k+40) × (new R₂) → makes y = 0 in bottom row</li>
          </ul>
          <TipCard type="tip">
            The multiplier = <strong>negative of that row's number in the pivot column</strong>. Row 1 has 3 → use −3 × new pivot row.
          </TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <StepCard label="Step 4.5" title="Tableau 2 — After First Pivot">
          <p className="step-text">After the row operations, A₁ leaves the basis and <strong>y takes its place</strong>!</p>
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
            <strong>Check the bottom row:</strong> Still has negatives → <strong>not done yet!</strong> Back to Step 4.
          </p>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {step >= 5 && (
        <StepCard label="Step 4.6" title="Second Pivot">
          <p className="step-text">Most negative = <M>{'\\frac{-16k-370}{9}'}</M> → pivot column = <strong>x</strong>.</p>
          <p className="step-text">Ratios: 12÷(4/3) = 9, &nbsp; 4÷(2/9) = 18, &nbsp; 8÷(16/9) = <strong>4.5</strong> ✓ → pivot row = A₂.</p>
          <p className="step-text">After row operations:</p>
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
          <p className="step-text"><strong>Check:</strong> −15/8 under S₂ is still negative. One more round!</p>
          {step === 5 && <ContinueBtn onClick={() => setStep(6)} />}
        </StepCard>
      )}

      {step >= 6 && (
        <StepCard label="Step 4.7" title="Third Pivot — Final Round!">
          <p className="step-text">Pivot column = S₂ (−15/8 is the only negative).</p>
          <p className="step-text">Ratios: 6÷(1/4) = <strong>24</strong> ✓, &nbsp; 3÷(−1/8) = skip (negative!), &nbsp; (9/2)÷(1/16) = 72.</p>
          <p className="step-text">After row operations:</p>
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

      {step >= 7 && (
        <StepCard label="Step 4.8" title="Done! ✅" highlight>
          <p className="step-text">
            Bottom row: <strong>0, 0, 15/2, 0, k, (2k+35)/4, 1</strong> — all positive or zero!
          </p>
          <p className="step-text" style={{ fontSize: '1.1rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            🎯 We've reached the OPTIMAL SOLUTION!
          </p>
          <TipCard type="remember">
            <strong>When to stop:</strong> All numbers in the bottom row are ≥ 0 (ignore Qty). That means we can't do any better — we're at the maximum!
          </TipCard>
          {step === 7 && <ContinueBtn onClick={() => setStep(8)} />}
        </StepCard>
      )}

      {step >= 8 && (
        <>
          <Quiz
            id="pv1"
            question="How do you find the pivot column?"
            options={['Pick the biggest number in the bottom row', 'Pick the most negative number in the bottom row', 'Pick the first non-zero column', 'Pick the column with the smallest ratio']}
            correctIndex={1}
            explanation="The most negative number shows where we can improve the most — that's our pivot column."
            wrongExplanations={{0: "We want the MOST NEGATIVE, not the biggest.", 2: "Non-zero isn't what we're looking for — it's the most negative.", 3: "Ratios are for finding the pivot ROW, not column."}}
            hint="Which number shows the most room for improvement?"
            onCorrect={() => setSolved(s => ({...s, pv1: true}))}
          />
          <Quiz
            id="pv2"
            question="If a number in the pivot column is negative or zero, what do you do during the ratio test?"
            options={['Use it anyway', 'Take the absolute value', 'Skip that row entirely', 'Set the ratio to infinity']}
            correctIndex={2}
            explanation="Only use positive numbers for the ratio test. Negative or zero? Just skip that row."
            wrongExplanations={{0: "Negative entries give wrong ratios that could break the solution.", 1: "Taking absolute values changes the math — just skip it.", 3: "The proper way is simply to skip that row."}}
            hint="Can you divide by zero or get a meaningful negative ratio?"
            onCorrect={() => setSolved(s => ({...s, pv2: true}))}
          />
          {allDone && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🎉</div>
              <p className="step-text" style={{ textAlign: 'center' }}>
                <strong>You've mastered pivoting!</strong> Let's read the final answer.
              </p>
              <ContinueBtn onClick={onComplete} label="Read the Solution →" />
            </div>
          )}
        </>
      )}
    </Section>
  );
}
