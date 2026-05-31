import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, Tableau } from '../components';

export default function SectionDriveK({ onComplete }) {
  const [step, setStep] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  return (
    <Section
      badge="Step 3 of 6"
      title="Driving Out the Big K"
      intro="The objective row still has k values under A₁ and A₂. We need to eliminate them using row operations — one artificial variable at a time."
    >
      {/* 3.1: Why drive out k? */}
      <StepCard label="Step 3.1" title="Why Must We Remove k?">
        <p className="step-text">
          The <M>{'k'}</M> in the objective row is a placeholder for a huge number.
          We can't do proper comparisons (like finding the "most negative" entry) until <M>{'k'}</M> is gone from
          the columns we care about. The goal is to make the A₁ and A₂ columns in the objective row equal to <strong>0</strong>.
        </p>
        <TipCard type="remember">
          We drive out k by using <strong>row operations</strong> — the same technique you use in solving systems of equations.
          Multiply a row by some value, then add it to the objective row.
        </TipCard>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {/* 3.2: Drive out k from A₁ */}
      {step >= 1 && (
        <StepCard label="Step 3.2" title="Drive Out k from A₁">
          <p className="step-text">
            Look at the objective row: A₁ has coefficient <M>{'k'}</M>. A₁ is the basis variable of <strong>Row 2</strong> (the A₁ row).
          </p>
          <p className="step-text">
            <strong>The move:</strong> Multiply <strong>Row 2</strong> by <M>{'-k'}</M> and add to the <strong>objective row</strong>.
          </p>
          <p className="step-text" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 8 }}>Let's see each entry:</p>
          <div style={{ overflowX: 'auto', margin: '12px 0', fontSize: '0.85rem' }}>
            <table className="tableau">
              <thead>
                <tr>
                  <th>Operation</th><th>x</th><th>y</th><th>S₁</th><th>S₂</th><th>A₁</th><th>A₂</th><th>Z</th><th>Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="basis-cell">Row 2 × (−k)</td>
                  <td>−2k</td><td>−9k</td><td>0</td><td>k</td><td>−k</td><td>0</td><td>0</td><td>−36k</td>
                </tr>
                <tr>
                  <td className="basis-cell">Old Obj Row</td>
                  <td>−50</td><td>−40</td><td>0</td><td>0</td><td>k</td><td>k</td><td>1</td><td>0</td>
                </tr>
                <tr style={{ borderTop: '2px solid var(--accent-blue)' }}>
                  <td className="basis-cell" style={{ color: 'var(--accent-emerald)' }}>New Obj Row</td>
                  <td>−2k−50</td><td>−9k−40</td><td>0</td><td>k</td><td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>0</td><td>k</td><td>1</td><td>−36k</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TipCard type="tip">
            <strong>Check:</strong> A₁ column is now <strong>0</strong> in the objective row. That's exactly what we wanted! One k driven out, one to go.
          </TipCard>
          <Tableau
            title="Pre-Tableau 2 (after driving out k from A₁)"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[
              ['S₁', '2', '3', '1', '0', '0', '0', '0', '24'],
              ['A₁', '2', '9', '0', '−1', '1', '0', '0', '36'],
              ['A₂', '2', '1', '0', '0', '0', '1', '0', '12'],
              ['', '−2k−50', '−9k−40', '0', 'k', '0', 'k', '1', '−36k'],
            ]}
          />
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {/* 3.3: Drive out k from A₂ */}
      {step >= 2 && (
        <StepCard label="Step 3.3" title="Drive Out k from A₂">
          <p className="step-text">
            Now A₂ still has <M>{'k'}</M> in the objective row. A₂ is the basis of <strong>Row 3</strong>.
          </p>
          <p className="step-text">
            <strong>The move:</strong> Multiply <strong>Row 3</strong> by <M>{'-k'}</M> and add to the <strong>objective row</strong>.
          </p>
          <div style={{ overflowX: 'auto', margin: '12px 0', fontSize: '0.85rem' }}>
            <table className="tableau">
              <thead>
                <tr>
                  <th>Operation</th><th>x</th><th>y</th><th>S₁</th><th>S₂</th><th>A₁</th><th>A₂</th><th>Z</th><th>Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="basis-cell">Row 3 × (−k)</td>
                  <td>−2k</td><td>−k</td><td>0</td><td>0</td><td>0</td><td>−k</td><td>0</td><td>−12k</td>
                </tr>
                <tr>
                  <td className="basis-cell">Old Obj Row</td>
                  <td>−2k−50</td><td>−9k−40</td><td>0</td><td>k</td><td>0</td><td>k</td><td>1</td><td>−36k</td>
                </tr>
                <tr style={{ borderTop: '2px solid var(--accent-blue)' }}>
                  <td className="basis-cell" style={{ color: 'var(--accent-emerald)' }}>New Obj Row</td>
                  <td>−4k−50</td><td>−10k−40</td><td>0</td><td>k</td><td>0</td><td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>0</td><td>1</td><td>−48k</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TipCard type="tip">
            Now BOTH A₁ and A₂ have <strong>0</strong> in the objective row. All k values are driven out from the artificial variable columns!
          </TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {/* 3.4: Tableau 1 */}
      {step >= 3 && (
        <StepCard label="Step 3.4" title="Tableau 1 — Ready for Pivoting!" highlight>
          <p className="step-text">
            This is our official <strong>Tableau 1</strong> — the starting point for the pivoting process.
          </p>
          <Tableau
            title="Tableau 1"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[
              ['S₁', '2', '3', '1', '0', '0', '0', '0', '24'],
              ['A₁', '2', '9', '0', '−1', '1', '0', '0', '36'],
              ['A₂', '2', '1', '0', '0', '0', '1', '0', '12'],
              ['', '−4k−50', '−10k−40', '0', 'k', '0', '0', '1', '−48k'],
            ]}
          />
          <div className="summary-box">
            <h3>✅ What We Accomplished</h3>
            <ul>
              <li>Drove out k from A₁ by: Row 2 × (−k) + Objective Row</li>
              <li>Drove out k from A₂ by: Row 3 × (−k) + Objective Row</li>
              <li>Both artificial variable columns now show 0 in the objective row</li>
              <li>The tableau is ready for the pivoting phase!</li>
            </ul>
          </div>
          <TipCard type="shortcut">
            <strong>Pattern:</strong> For each artificial variable in the basis, multiply its row by −k and add to the objective row.
            That's it — one operation per artificial variable.
          </TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {/* QUIZ */}
      {step >= 4 && (
        <>
          <Quiz
            id="dk1"
            question="Why do we need to drive out k from the objective row?"
            options={[
              'Because k makes the tableau look ugly',
              'So we can properly identify the most negative entry for pivoting',
              'Because artificial variables must be zero',
              'Because we want to minimize k',
            ]}
            correctIndex={1}
            explanation="We need the objective row entries to be comparable so we can find the most negative value (pivot column). With k still there, we can already compare, but eliminating k from artificial columns ensures proper zeroes."
            wrongExplanations={{
              0: "While cleaner, that's not the mathematical reason! We need clean entries to compare values for pivoting.",
              2: "The artificial variables themselves may not be zero yet — we drive out k from the objective row columns, not from the variables.",
              3: "We're not minimizing k — k is just a very large constant used as a penalty.",
            }}
            hint="Think about what the next step is (finding the pivot column) and what you need to do it."
          />
          <Quiz
            id="dk2"
            question="To drive out k from an artificial variable's column, what do you do?"
            options={[
              'Multiply the objective row by k',
              'Divide the artificial variable\'s row by k',
              'Multiply the artificial variable\'s row by −k and add to the objective row',
              'Set the k value to zero directly',
            ]}
            correctIndex={2}
            explanation="Multiply the row where that artificial variable is in the basis by −k, then add the products to the objective row. This cancels out the k."
            wrongExplanations={{
              0: "Multiplying the objective row by k wouldn't cancel anything — you'd just get k² terms!",
              1: "Dividing by k would change the constraint equation, which we don't want.",
              3: "We can't just set values — we must use valid row operations to maintain the system's integrity.",
            }}
            hint="It's a row operation: multiply one row by something, then add to another row."
            onCorrect={() => setQuizDone(true)}
          />
          {quizDone && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🎉</div>
              <p className="step-text" style={{ textAlign: 'center' }}>
                <strong>Excellent!</strong> You understand the Big-K elimination process. Now for the exciting part — pivoting!
              </p>
              <ContinueBtn onClick={onComplete} label="On to Step 4 →" />
            </div>
          )}
        </>
      )}
    </Section>
  );
}
