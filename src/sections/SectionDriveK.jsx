import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, LockedContinueBtn, Tableau } from '../components';

export default function SectionDriveK({ onComplete }) {
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState({});
  const mark = (k) => setSolved(s => ({ ...s, [k]: true }));
  const count = Object.keys(solved).length;
  const total = 4;

  return (
    <Section badge="Step 3 of 6" title="Driving Out the Big K"
      intro="The bottom row still has k under A₁ and A₂. We need to get rid of them using row operations.">

      <StepCard label="Step 3.1" title="Why Remove k?">
        <p className="step-text">We need <strong>regular numbers</strong> in the bottom row so we can find the most negative one for pivoting. With k there, we can't compare properly.</p>
        <TipCard type="remember">We use <strong>row operations</strong>: multiply a row by something, then add to the bottom row.</TipCard>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {step >= 1 && (
        <StepCard label="Step 3.2" title="Drive Out k from A₁">
          <p className="step-text"><strong>A₁ is in Row 2.</strong> Multiply Row 2 by <M>{'-k'}</M>, add to bottom row.</p>
          <div style={{ overflowX: 'auto', margin: '12px 0', fontSize: '0.85rem' }}>
            <table className="tableau"><thead><tr><th>What</th><th>x</th><th>y</th><th>S₁</th><th>S₂</th><th>A₁</th><th>A₂</th><th>Z</th><th>Qty</th></tr></thead>
            <tbody>
              <tr><td className="basis-cell">R2 × (−k)</td><td>−2k</td><td>−9k</td><td>0</td><td>k</td><td>−k</td><td>0</td><td>0</td><td>−36k</td></tr>
              <tr><td className="basis-cell">Old Bottom</td><td>−50</td><td>−40</td><td>0</td><td>0</td><td>k</td><td>k</td><td>1</td><td>0</td></tr>
              <tr style={{ borderTop: '2px solid var(--accent-blue)' }}><td className="basis-cell" style={{ color: 'var(--accent-emerald)' }}>New Bottom</td><td>−2k−50</td><td>−9k−40</td><td>0</td><td>k</td><td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>0</td><td>k</td><td>1</td><td>−36k</td></tr>
            </tbody></table>
          </div>
          <TipCard type="tip">A₁ is now <strong>0</strong> in the bottom row!</TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 3.3" title="Drive Out k from A₂">
          <p className="step-text"><strong>A₂ is in Row 3.</strong> Same move: Row 3 × (−k) + bottom row.</p>
          <div style={{ overflowX: 'auto', margin: '12px 0', fontSize: '0.85rem' }}>
            <table className="tableau"><thead><tr><th>What</th><th>x</th><th>y</th><th>S₁</th><th>S₂</th><th>A₁</th><th>A₂</th><th>Z</th><th>Qty</th></tr></thead>
            <tbody>
              <tr><td className="basis-cell">R3 × (−k)</td><td>−2k</td><td>−k</td><td>0</td><td>0</td><td>0</td><td>−k</td><td>0</td><td>−12k</td></tr>
              <tr><td className="basis-cell">Old Bottom</td><td>−2k−50</td><td>−9k−40</td><td>0</td><td>k</td><td>0</td><td>k</td><td>1</td><td>−36k</td></tr>
              <tr style={{ borderTop: '2px solid var(--accent-blue)' }}><td className="basis-cell" style={{ color: 'var(--accent-emerald)' }}>New Bottom</td><td>−4k−50</td><td>−10k−40</td><td>0</td><td>k</td><td>0</td><td style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>0</td><td>1</td><td>−48k</td></tr>
            </tbody></table>
          </div>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 3.4" title="Tableau 1 — Ready!" highlight>
          <Tableau title="Tableau 1" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','2','3','1','0','0','0','0','24'],['A₁','2','9','0','−1','1','0','0','36'],['A₂','2','1','0','0','0','1','0','12'],['','−4k−50','−10k−40','0','k','0','0','1','−48k']]} />
          <div className="summary-box"><h3>✅ What We Did</h3><ul>
            <li>A₁: Row 2 × (−k) + Bottom → A₁ column = 0</li>
            <li>A₂: Row 3 × (−k) + Bottom → A₂ column = 0</li>
          </ul></div>
          <TipCard type="shortcut"><strong>Pattern:</strong> For each artificial in the Basis, multiply its row by −k and add to the bottom row.</TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <>
          <Quiz id="d1" question="Why do we remove k from the bottom row?"
            options={['To make it look cleaner','So we can find the most negative number for pivoting','Because k must always be zero','To minimize the objective function']}
            correctIndex={1} explanation="We need clean numbers to compare and find where to pivot."
            wrongExplanations={{0:"It's functional, not cosmetic.",2:"k isn't always zero — it's removed from specific columns.",3:"We're maximizing, not minimizing."}}
            hint="What's the next step after this?" onCorrect={() => mark('d1')} />

          <Quiz id="d2" question="To remove k from A₁'s column, what do you do?"
            options={['Multiply bottom row by k','Divide Row 2 by k','Multiply Row 2 by −k and add to bottom row','Set k = 0']}
            correctIndex={2} explanation="Row 2 × (−k) + bottom row. The k cancels out!"
            wrongExplanations={{0:"That gives k² — worse!",1:"Can't just divide — must use row operations.",3:"We can't erase numbers — must use valid operations."}}
            hint="It's a row operation: multiply one row, add to another." onCorrect={() => mark('d2')} />

          <Quiz id="d3" question="After driving out k from A₁, what's the value under A₁ in the bottom row?"
            options={['k','−k','1','0']} correctIndex={3}
            explanation="That's the whole point — k cancels to 0!"
            wrongExplanations={{0:"We just removed k from there!",1:"The operation cancels k completely.",2:"It becomes 0, not 1."}}
            hint="What's k + (−k)?" onCorrect={() => mark('d3')} />

          <Quiz id="d4" question="Which rows do you use to drive out k? (In general)"
            options={['Only the first and last rows','The rows where artificial variables are in the Basis','All constraint rows','Only the objective row']}
            correctIndex={1} explanation="You operate on the rows where artificial variables are the basis — those are the ones with k in their columns."
            wrongExplanations={{0:"It depends on where the artificials are.",2:"Only rows with artificial basis variables.",3:"The objective row is what we're modifying, not the source."}}
            hint="Which rows 'own' the artificial variables?" onCorrect={() => mark('d4')} />

          <LockedContinueBtn onClick={onComplete} label="Next Lesson →" solvedCount={count} totalCount={total} />
        </>
      )}
    </Section>
  );
}
