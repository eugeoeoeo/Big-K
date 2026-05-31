import { useState } from 'react';
import { Section, StepCard, M, TipCard, ContinueBtn, Tableau } from '../components';

export default function SectionSolution({ onComplete }) {
  const [step, setStep] = useState(0);

  return (
    <Section
      badge="Reading Results"
      title="Reading the Final Solution"
      intro="We've reached the optimal tableau. Now let's extract the answer — it's easier than you think!"
    >
      <StepCard label="Step 1" title="The Final Tableau">
        <Tableau
          title="Tableau 4 — Final"
          headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
          rows={[
            ['S₁', '0', '0', '4', '1', '−1', '−3', '0', '24'],
            ['y', '0', '1', '1/2', '0', '0', '−1/2', '0', '6'],
            ['x', '1', '0', '−1/4', '0', '0', '3/4', '0', '3'],
            ['', '0', '0', '15/2', '0', 'k', '(2k+35)/4', '1', '390'],
          ]}
        />
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {step >= 1 && (
        <StepCard label="Step 2" title="How to Read the Answer">
          <p className="step-text">
            Reading the solution is simple — just look at the <strong>Basis</strong> column and the <strong>Qty</strong> column:
          </p>
          <div style={{ display: 'grid', gap: 12, margin: '16px 0' }}>
            <div className="step-card" style={{ margin: 0, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Basis = <strong style={{ color: 'var(--accent-purple)' }}>x</strong></span>
              <span className="arrow">→</span>
              <span>Qty = <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.2rem' }}>3</strong></span>
            </div>
            <div className="step-card" style={{ margin: 0, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Basis = <strong style={{ color: 'var(--accent-purple)' }}>y</strong></span>
              <span className="arrow">→</span>
              <span>Qty = <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.2rem' }}>6</strong></span>
            </div>
            <div className="step-card" style={{ margin: 0, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Objective row</span>
              <span className="arrow">→</span>
              <span>Z = <strong style={{ color: 'var(--accent-amber)', fontSize: '1.2rem' }}>390</strong></span>
            </div>
          </div>
          <TipCard type="shortcut">
            <strong>Quick rule:</strong> Variables in the Basis column → their value is in the Qty column.
            Variables NOT in the Basis → their value is <strong>0</strong>.
            Z (objective value) = Qty in the objective row.
          </TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 3" title="Verify the Answer" highlight>
          <p className="step-text">Let's check: <M>{'x = 3, \\; y = 6'}</M></p>
          <div className="summary-box">
            <h3>✅ Verification</h3>
            <ul>
              <li><M>{'Z = 50(3) + 40(6) = 150 + 240 = 390'}</M> ✓</li>
              <li><M>{'2(3) + 3(6) = 6 + 18 = 24 \\leq 24'}</M> ✓</li>
              <li><M>{'2(3) + 9(6) = 6 + 54 = 60 \\geq 36'}</M> ✓</li>
              <li><M>{'2(3) + 6 = 12 = 12'}</M> ✓</li>
            </ul>
          </div>

          <div className="result-card" style={{ marginTop: 24 }}>
            <div style={{ fontSize: '2.5rem' }}>🏆</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: 8 }}>Final Answer</div>
            <M display>{'x = 3, \\quad y = 6, \\quad Z_{\\max} = 390'}</M>
            <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: '0.9rem' }}>
              Setting x = 3 and y = 6 maximizes Z to 390 while satisfying all constraints.
            </p>
          </div>

          <TipCard type="remember">
            <strong>Always verify!</strong> Plug your answer back into the original constraints to make sure everything checks out.
            This catches errors and builds confidence in your solution.
          </TipCard>

          <ContinueBtn onClick={onComplete} label="Take the Final Exam →" />
        </StepCard>
      )}
    </Section>
  );
}
