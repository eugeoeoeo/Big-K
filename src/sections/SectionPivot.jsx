import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, LockedContinueBtn, Tableau } from '../components';

export default function SectionPivot({ onComplete }) {
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState({});
  const mark = (k) => setSolved(s => ({ ...s, [k]: true }));
  const count = Object.keys(solved).length;
  const total = 5;

  return (
    <Section badge="Steps 4–6 of 6" title="Pivoting & Iteration"
      intro="Now the main loop: find the pivot, do row operations, repeat until the answer is optimal.">

      <StepCard label="Step 4.1" title="The Pivot Loop">
        <div style={{ display: 'grid', gap: 12, margin: '16px 0' }}>
          <div className="step-card" style={{ margin: 0, padding: 16, borderLeft: '3px solid var(--accent-blue)' }}>
            <strong style={{ color: 'var(--accent-blue)' }}>Step 4 — Find pivot:</strong> Most negative in bottom row = pivot column. Smallest positive ratio = pivot row.
          </div>
          <div className="step-card" style={{ margin: 0, padding: 16, borderLeft: '3px solid var(--accent-emerald)' }}>
            <strong style={{ color: 'var(--accent-emerald)' }}>Step 5 — Row operations:</strong> Make pivot = 1, everything else in that column = 0.
          </div>
          <div className="step-card" style={{ margin: 0, padding: 16, borderLeft: '3px solid var(--accent-purple)' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>Step 6 — Check:</strong> Still negatives in bottom row? → Repeat. All ≥ 0? → <strong>DONE!</strong>
          </div>
        </div>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {step >= 1 && (
        <StepCard label="Step 4.2" title="Finding the Pivot Column">
          <p className="step-text">Bottom row: find the <strong>most negative number</strong> → that's the pivot column.</p>
          <Tableau title="Tableau 1" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','2','3','1','0','0','0','0','24'],['A₁','2','9','0','−1','1','0','0','36'],['A₂','2','1','0','0','0','1','0','12'],['','−4k−50','−10k−40','0','k','0','0','1','−48k']]}
            pivotCol={2} />
          <p className="step-text">Since k is huge, <M>{'-10k-40'}</M> is the most negative → <strong>y column!</strong></p>
          <TipCard type="shortcut">When comparing: bigger k multiplier = more negative. −10k beats −4k.</TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 4.3" title="Ratio Test → Pivot Row">
          <p className="step-text">Divide Qty by the pivot column number. Pick <strong>smallest positive</strong>.</p>
          <Tableau title="Ratio Test" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','2','3','1','0','0','0','0','24'],['A₁','2','9','0','−1','1','0','0','36'],['A₂','2','1','0','0','0','1','0','12'],['','−4k−50','−10k−40','0','k','0','0','1','−48k']]}
            pivotCol={2} pivotRow={1} ratios={['24÷3 = 8','36÷9 = 4 ✓','12÷1 = 12']} />
          <p className="step-text">Smallest = <strong>4</strong> → pivot row = A₁. Pivot element = <strong>9</strong>.</p>
          <TipCard type="mistake">Skip rows where the pivot column number is 0 or negative!</TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 4.4" title="Row Operations">
          <p className="step-text"><strong>1)</strong> Divide pivot row by 9 (makes pivot = 1).<br/>
            <strong>2)</strong> Use new row to zero out y in other rows.</p>
          <TipCard type="tip">Multiplier = negative of that row's number in the pivot column.</TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <StepCard label="Step 4.5" title="After Pivots → Final Tableau">
          <p className="step-text">After 3 rounds of pivoting:</p>
          <Tableau title="Tableau 4 — FINAL" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','0','0','4','1','−1','−3','0','24'],['y','0','1','1/2','0','0','−1/2','0','6'],['x','1','0','−1/4','0','0','3/4','0','3'],['','0','0','15/2','0','k','(2k+35)/4','1','390']]} />
          <p className="step-text" style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
            🎯 Bottom row: all ≥ 0 → OPTIMAL! We're done!
          </p>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {step >= 5 && (
        <>
          <Quiz id="p1" question="How do you find the pivot COLUMN?"
            options={['Biggest number in bottom row','Most negative number in bottom row','First non-zero column','Smallest ratio']}
            correctIndex={1} explanation="Most negative = most room for improvement = pivot column."
            wrongExplanations={{0:"We want MOST NEGATIVE, not biggest.",2:"Not just any non-zero — the most negative.",3:"Ratios are for finding the pivot ROW."}}
            hint="Which direction gives the most improvement?" onCorrect={() => mark('p1')} />

          <Quiz id="p2" question="How do you find the pivot ROW?"
            options={['Most negative ratio','Biggest ratio','Smallest POSITIVE ratio','Any row works']}
            correctIndex={2} explanation="Divide Qty by pivot column number, pick the smallest positive result."
            wrongExplanations={{0:"Negative ratios are skipped entirely!",1:"We want SMALLEST, not biggest.",3:"Only one specific row works — the smallest positive ratio."}}
            hint="Qty ÷ pivot column number = ?" onCorrect={() => mark('p2')} />

          <Quiz id="p3" question="If a number in the pivot column is 0 or negative, what do you do in the ratio test?"
            options={['Use it anyway','Take absolute value','Skip that row','Set ratio to infinity']}
            correctIndex={2} explanation="Skip it. Only positive numbers give valid ratios."
            wrongExplanations={{0:"That gives invalid ratios.",1:"Changing values changes the math.",3:"Just skip it entirely."}}
            hint="Can you divide by zero?" onCorrect={() => mark('p3')} />

          <Quiz id="p4" question="What does the pivot element become after row operations?"
            options={['0','The original value','1','k']}
            correctIndex={2} explanation="We divide the pivot row by the pivot element, making it 1."
            wrongExplanations={{0:"0 is what the OTHER entries in that column become.",1:"We change it to 1 by dividing.",3:"k has nothing to do with this step."}}
            hint="We divide the pivot row by the pivot element..." onCorrect={() => mark('p4')} />

          <Quiz id="p5" question="When do you STOP pivoting?"
            options={['After exactly 3 pivots','When all bottom row numbers are ≥ 0','When all variables are in the basis','When k disappears completely']}
            correctIndex={1} explanation="All non-negative in the bottom row = optimal! No more improvement possible."
            wrongExplanations={{0:"The number of pivots varies per problem.",2:"Not all variables need to be in the basis.",3:"k might still appear — we just need all values ≥ 0."}}
            hint="What does a negative in the bottom row mean?" onCorrect={() => mark('p5')} />

          <LockedContinueBtn onClick={onComplete} label="Read the Solution →" solvedCount={count} totalCount={total} />
        </>
      )}
    </Section>
  );
}
