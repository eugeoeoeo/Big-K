import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, Tableau } from '../components';

export default function SectionDriveK({ onComplete }) {
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState({});
  const allDone = solved.dk1 && solved.dk2;

  return (
    <Section
      badge="Step 3 of 6"
      title="Driving Out the Big K"
      intro="The objective row still has k under A₁ and A₂. We need to get rid of them using simple row math — one at a time."
    >
      <StepCard label="Step 3.1" title="Why Remove k?">
        <p className="step-text">
          We need the objective row to have <strong>regular numbers</strong> so we can compare them 
          and find the best one to pivot on. With k still there, we can't do that properly.
        </p>
        <p className="step-text">
          <strong>In simple terms:</strong> We want 0 under the A₁ and A₂ columns in the bottom row.
        </p>
        <TipCard type="remember">
          We use <strong>row operations</strong> — multiply a row by something, then add it to the bottom row.
          Same idea as solving systems of equations.
        </TipCard>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {step >= 1 && (
        <StepCard label="Step 3.2" title="Drive Out k from A₁">
          <p className="step-text">
            A₁ has <M>{'k'}</M> in the objective row. A₁ belongs to <strong>Row 2</strong>.
          </p>
          <p className="step-text">
            <strong>What we do:</strong> Multiply Row 2 by <M>{'-k'}</M>, then add the results to the objective row.
          </p>
          <div style={{ overflowX: 'auto', margin: '12px 0', fontSize: '0.85rem' }}>
            <table className="tableau">
              <thead>
                <tr><th>What</th><th>x</th><th>y</th><th>S₁</th><th>S₂</th><th>A₁</th><th>A₂</th><th>Z</th><th>Qty</th></tr>
              </thead>
              <tbody>
                <tr><td className="basis-cell">Row 2 × (−k)</td><td>−2k</td><td>−9k</td><td>0</td><td>k</td><td>−k</td><td>0</td><td>0</td><td>−36k</td></tr>
                <tr><td className="basis-cell">Old Bottom Row</td><td>−50</td><td>−40</td><td>0</td><td>0</td><td>k</td><td>k</td><td>1</td><td>0</td></tr>
                <tr style={{ borderTop: '2px solid var(--accent-blue)' }}>
                  <td className="basis-cell" style={{ color: 'var(--accent-emerald)' }}>New Bottom Row</td>
                  <td>−2k−50</td><td>−9k−40</td><td>0</td><td>k</td>
                  <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>0</td>
                  <td>k</td><td>1</td><td>−36k</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TipCard type="tip">
            A₁ column is now <strong>0</strong> in the bottom row — one down, one to go!
          </TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 3.3" title="Drive Out k from A₂">
          <p className="step-text">
            A₂ still has <M>{'k'}</M> in the bottom row. A₂ belongs to <strong>Row 3</strong>.
          </p>
          <p className="step-text">
            <strong>Same move:</strong> Multiply Row 3 by <M>{'-k'}</M>, add to the objective row.
          </p>
          <div style={{ overflowX: 'auto', margin: '12px 0', fontSize: '0.85rem' }}>
            <table className="tableau">
              <thead>
                <tr><th>What</th><th>x</th><th>y</th><th>S₁</th><th>S₂</th><th>A₁</th><th>A₂</th><th>Z</th><th>Qty</th></tr>
              </thead>
              <tbody>
                <tr><td className="basis-cell">Row 3 × (−k)</td><td>−2k</td><td>−k</td><td>0</td><td>0</td><td>0</td><td>−k</td><td>0</td><td>−12k</td></tr>
                <tr><td className="basis-cell">Old Bottom Row</td><td>−2k−50</td><td>−9k−40</td><td>0</td><td>k</td><td>0</td><td>k</td><td>1</td><td>−36k</td></tr>
                <tr style={{ borderTop: '2px solid var(--accent-blue)' }}>
                  <td className="basis-cell" style={{ color: 'var(--accent-emerald)' }}>New Bottom Row</td>
                  <td>−4k−50</td><td>−10k−40</td><td>0</td><td>k</td><td>0</td>
                  <td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>0</td>
                  <td>1</td><td>−48k</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TipCard type="tip">
            Both A₁ and A₂ are now <strong>0</strong> in the bottom row. All k's are gone from those columns!
          </TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 3.4" title="Tableau 1 — Ready for Pivoting!" highlight>
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
            <h3>✅ What We Did</h3>
            <ul>
              <li>Removed k from A₁: Row 2 × (−k) + Bottom Row</li>
              <li>Removed k from A₂: Row 3 × (−k) + Bottom Row</li>
              <li>Both artificial columns now show 0 in the bottom row</li>
            </ul>
          </div>
          <TipCard type="shortcut">
            <strong>Pattern:</strong> For each artificial variable in the Basis, multiply its row by −k and add to the bottom row. That's it!
          </TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <>
          <Quiz
            id="dk1"
            question="Why do we remove k from the objective row?"
            options={['To make the table look cleaner', 'So we can find the most negative number for pivoting', 'Because artificial variables must be zero', 'Because we want to minimize k']}
            correctIndex={1}
            explanation="We need clean numbers in the bottom row so we can compare them and find the most negative one — that tells us where to pivot next."
            wrongExplanations={{0: "It's not about looks — we need clean numbers to compare for pivoting.", 2: "The variables themselves might not be zero yet — we're clearing k from the bottom row columns.", 3: "We're not minimizing k. k is just a big penalty number."}}
            hint="What's the next step? (Finding where to pivot.) What do you need for that?"
            onCorrect={() => setSolved(s => ({...s, dk1: true}))}
          />
          <Quiz
            id="dk2"
            question="To remove k from an artificial variable's column, what do you do?"
            options={['Multiply the bottom row by k', 'Divide the row by k', 'Multiply the artificial\'s row by −k and add to the bottom row', 'Just set k to zero']}
            correctIndex={2}
            explanation="Multiply the row where that artificial is the basis by −k, then add those results to the bottom row. The k cancels out!"
            wrongExplanations={{0: "Multiplying the bottom row by k would give k² — even worse!", 1: "Dividing would change the equation, which we can't do.", 3: "We can't just erase numbers — we must use valid row operations."}}
            hint="It's a row operation: multiply one row, then add to another."
            onCorrect={() => setSolved(s => ({...s, dk2: true}))}
          />
          {allDone && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🎉</div>
              <p className="step-text" style={{ textAlign: 'center' }}>
                <strong>Excellent!</strong> Now for the exciting part — pivoting!
              </p>
              <ContinueBtn onClick={onComplete} label="On to Steps 4–6 →" />
            </div>
          )}
        </>
      )}
    </Section>
  );
}
