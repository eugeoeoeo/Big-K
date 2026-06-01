import { useState, useEffect, useRef } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, LockedContinueBtn, Tableau } from '../components';

function RowMath({ title, formula, calcs }) {
  return (
    <div className="summary-box" style={{ marginTop: '16px', fontSize: '0.9rem' }}>
      <h4 style={{ color: 'var(--accent-blue)', marginBottom: 8, fontSize: '1rem' }}>{title}</h4>
      <div style={{ margin: '8px 0', fontFamily: 'monospace', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: 6, display: 'inline-block' }}>
        <strong style={{color: 'var(--text-muted)'}}>Formula:</strong> {formula}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8, marginTop: 12 }}>
        {calcs.map((calc, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Col {calc.col}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{calc.math}</div>
            <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginTop: 4, fontSize: '0.95rem' }}>= {calc.res}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SectionPivot({ onComplete }) {
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState({});
  const mark = (k) => setSolved(s => ({ ...s, [k]: true }));
  const count = Object.keys(solved).length;
  const total = 5;

  return (
    <Section badge="Steps 4–6 of 6" title="Pivoting & Iteration"
      intro="Now the main loop: find the pivot, do row operations, repeat until the answer is optimal. We will do every calculation item by item so you see EXACTLY where every number comes from.">

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
        <StepCard label="Step 4.2" title="First Pivot: Finding Column and Row">
          <p className="step-text"><strong>1. Pivot Column:</strong> Look at the bottom row. The most negative value is the pivot column.</p>
          <Tableau title="Tableau 1" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','2','3','1','0','0','0','0','24'],['A₁','2','9','0','−1','1','0','0','36'],['A₂','2','1','0','0','0','1','0','12'],['','−4k−50','−10k−40','0','k','0','0','1','−48k']]}
            pivotCol={2} />
          <p className="step-text">Since k is a huge penalty, <M>{'-10k - 40'}</M> is more negative than <M>{'-4k - 50'}</M>. The <strong>y column</strong> is our pivot column.</p>
          
          <p className="step-text" style={{ marginTop: '16px' }}><strong>2. Pivot Row:</strong> Divide Qty by the pivot column value for each row. Pick the <strong>smallest positive</strong> ratio.</p>
          <Tableau title="Ratio Test" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','2','3','1','0','0','0','0','24'],['A₁','2','9','0','−1','1','0','0','36'],['A₂','2','1','0','0','0','1','0','12'],['','−4k−50','−10k−40','0','k','0','0','1','−48k']]}
            pivotCol={2} pivotRow={1} ratios={['24÷3 = 8','36÷9 = 4 ✓','12÷1 = 12']} />
          <p className="step-text">The smallest ratio is <strong>4</strong>, so <strong>Row 2 (A₁)</strong> is the pivot row. The pivot element is <strong>9</strong>.</p>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 4.3" title="First Pivot: Making the Pivot Element 1">
          <p className="step-text">Our goal is to turn the pivot element (9) into a 1, and every other number in the y column into a 0.</p>
          <p className="step-text">First, we make the Pivot Row's pivot element 1. The old pivot row is Row 2 (A₁). We divide every single item in this row by 9.</p>
          
          <RowMath title="Make New Pivot Row (y replaces A₁)" formula="Old Row 2 ÷ 9" calcs={[
            { col: 'x', math: '2 ÷ 9', res: '2/9' },
            { col: 'y', math: '9 ÷ 9', res: '1' },
            { col: 'S₁', math: '0 ÷ 9', res: '0' },
            { col: 'S₂', math: '-1 ÷ 9', res: '-1/9' },
            { col: 'A₁', math: '1 ÷ 9', res: '1/9' },
            { col: 'A₂', math: '0 ÷ 9', res: '0' },
            { col: 'Qty', math: '36 ÷ 9', res: '4' },
          ]} />
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 4.4" title="First Pivot: Zeroing the rest of the column">
          <p className="step-text">Now we use the New Pivot Row to zero out the y column in all other rows item by item.</p>

          <RowMath title="Update S₁ Row" formula="Old S₁ − (3 × New Pivot Row)" calcs={[
            { col: 'x', math: '2 - 3(2/9)', res: '4/3' },
            { col: 'y', math: '3 - 3(1)', res: '0' },
            { col: 'S₁', math: '1 - 3(0)', res: '1' },
            { col: 'S₂', math: '0 - 3(-1/9)', res: '1/3' },
            { col: 'A₁', math: '0 - 3(1/9)', res: '-1/3' },
            { col: 'A₂', math: '0 - 3(0)', res: '0' },
            { col: 'Qty', math: '24 - 3(4)', res: '12' },
          ]} />

          <RowMath title="Update A₂ Row" formula="Old A₂ − (1 × New Pivot Row)" calcs={[
            { col: 'x', math: '2 - 1(2/9)', res: '16/9' },
            { col: 'y', math: '1 - 1(1)', res: '0' },
            { col: 'S₁', math: '0 - 1(0)', res: '0' },
            { col: 'S₂', math: '0 - 1(-1/9)', res: '1/9' },
            { col: 'A₁', math: '0 - 1(1/9)', res: '-1/9' },
            { col: 'A₂', math: '1 - 1(0)', res: '1' },
            { col: 'Qty', math: '12 - 1(4)', res: '8' },
          ]} />

          <RowMath title="Update Objective Row" formula="Old Obj − (-10k-40) × New Pivot Row   =>   Old Obj + (10k+40) × New Pivot Row" calcs={[
            { col: 'x', math: '(-4k-50) + (10k+40)(2/9)', res: '(-16k-370)/9' },
            { col: 'y', math: '(-10k-40) + (10k+40)(1)', res: '0' },
            { col: 'S₁', math: '0 + (10k+40)(0)', res: '0' },
            { col: 'S₂', math: 'k + (10k+40)(-1/9)', res: '(-k-40)/9' },
            { col: 'A₁', math: '0 + (10k+40)(1/9)', res: '(10k+40)/9' },
            { col: 'A₂', math: '0 + (10k+40)(0)', res: '0' },
            { col: 'Qty', math: '-48k + (10k+40)(4)', res: '-8k+160' },
          ]} />
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <StepCard label="Step 4.5" title="Second Pivot: Finding Column and Row">
          <p className="step-text">Here is <strong>Tableau 2</strong>, fully updated. We check the bottom row again.</p>
          <Tableau title="Tableau 2" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','4/3','0','1','1/3','−1/3','0','0','12'],['y','2/9','1','0','−1/9','1/9','0','0','4'],['A₂','16/9','0','0','1/9','−1/9','1','0','8'],['','(−16k−370)/9','0','0','(−k−40)/9','(10k+40)/9','0','1','−8k+160']]}
            pivotCol={1} />
          
          <p className="step-text">The most negative value is <M>{'(-16k-370)/9'}</M> (because −16k is worse than −k), so the <strong>x column</strong> is our new pivot column.</p>
          
          <p className="step-text" style={{ marginTop: '16px' }}><strong>Ratio Test:</strong></p>
          <Tableau title="Ratio Test" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','4/3','0','1','1/3','−1/3','0','0','12'],['y','2/9','1','0','−1/9','1/9','0','0','4'],['A₂','16/9','0','0','1/9','−1/9','1','0','8'],['','(−16k−370)/9','0','0','(−k−40)/9','(10k+40)/9','0','1','−8k+160']]}
            pivotCol={1} pivotRow={2} ratios={['12÷(4/3) = 9','4÷(2/9) = 18','8÷(16/9) = 4.5 ✓']} />
          <p className="step-text">Smallest positive ratio is <strong>4.5</strong>, so <strong>Row 3 (A₂)</strong> is the pivot row. Pivot element is <strong>16/9</strong>.</p>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {step >= 5 && (
        <StepCard label="Step 4.6" title="Second Pivot: Making the Pivot Element 1">
          <p className="step-text">We must turn the pivot element (16/9) into a 1.</p>
          <p className="step-text">We take the old pivot row (Row 3, which is A₂) and divide by (16/9) — which is the same as multiplying by (9/16).</p>
          
          <RowMath title="Make New Pivot Row (x replaces A₂)" formula="Old Row 3 × (9/16)" calcs={[
            { col: 'x', math: '16/9 × 9/16', res: '1' },
            { col: 'y', math: '0 × 9/16', res: '0' },
            { col: 'S₁', math: '0 × 9/16', res: '0' },
            { col: 'S₂', math: '1/9 × 9/16', res: '1/16' },
            { col: 'A₁', math: '-1/9 × 9/16', res: '-1/16' },
            { col: 'A₂', math: '1 × 9/16', res: '9/16' },
            { col: 'Qty', math: '8 × 9/16', res: '9/2' },
          ]} />
          {step === 5 && <ContinueBtn onClick={() => setStep(6)} />}
        </StepCard>
      )}

      {step >= 6 && (
        <StepCard label="Step 4.7" title="Second Pivot: Zeroing the rest of the column">
          <p className="step-text">Now we use the New Pivot Row to zero out the x column in all other rows.</p>

          <RowMath title="Update S₁ Row" formula="Old S₁ − (4/3) × New Pivot Row" calcs={[
            { col: 'x', math: '4/3 - (4/3)(1)', res: '0' },
            { col: 'y', math: '0 - (4/3)(0)', res: '0' },
            { col: 'S₁', math: '1 - (4/3)(0)', res: '1' },
            { col: 'S₂', math: '1/3 - (4/3)(1/16)', res: '1/4' },
            { col: 'A₁', math: '-1/3 - (4/3)(-1/16)', res: '-1/4' },
            { col: 'A₂', math: '0 - (4/3)(9/16)', res: '-3/4' },
            { col: 'Qty', math: '12 - (4/3)(9/2)', res: '6' },
          ]} />

          <RowMath title="Update y Row" formula="Old y − (2/9) × New Pivot Row" calcs={[
            { col: 'x', math: '2/9 - (2/9)(1)', res: '0' },
            { col: 'y', math: '1 - (2/9)(0)', res: '1' },
            { col: 'S₁', math: '0 - (2/9)(0)', res: '0' },
            { col: 'S₂', math: '-1/9 - (2/9)(1/16)', res: '-1/8' },
            { col: 'A₁', math: '1/9 - (2/9)(-1/16)', res: '1/8' },
            { col: 'A₂', math: '0 - (2/9)(9/16)', res: '-1/8' },
            { col: 'Qty', math: '4 - (2/9)(9/2)', res: '3' },
          ]} />

          <RowMath title="Update Objective Row" formula="Old Obj − (-16k-370)/9 × New Pivot Row   =>   Old Obj + (16k+370)/9 × New Pivot Row" calcs={[
            { col: 'x', math: '(-16k-370)/9 + ((16k+370)/9)(1)', res: '0' },
            { col: 'y', math: '0 + ((16k+370)/9)(0)', res: '0' },
            { col: 'S₁', math: '0 + ((16k+370)/9)(0)', res: '0' },
            { col: 'S₂', math: '(-k-40)/9 + ((16k+370)/9)(1/16)', res: '-15/8' },
            { col: 'A₁', math: '(10k+40)/9 + ((16k+370)/9)(-1/16)', res: '(8k+15)/8' },
            { col: 'A₂', math: '0 + ((16k+370)/9)(9/16)', res: '(8k+185)/8' },
            { col: 'Qty', math: '(-8k+160) + ((16k+370)/9)(9/2)', res: '345' },
          ]} />
          <TipCard type="shortcut">Notice how the <strong>k</strong> values completely canceled out in the S₂ column and Qty column during this step!</TipCard>
          {step === 6 && <ContinueBtn onClick={() => setStep(7)} />}
        </StepCard>
      )}

      {step >= 7 && (
        <StepCard label="Step 4.8" title="Third Pivot: Finding Column and Row">
          <p className="step-text">Here is <strong>Tableau 3</strong>. We check the bottom row one more time.</p>
          <Tableau title="Tableau 3" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','0','0','1','1/4','−1/4','−3/4','0','6'],['y','0','1','0','−1/8','1/8','−1/8','0','3'],['x','1','0','0','1/16','−1/16','9/16','0','9/2'],['','0','0','0','−15/8','(8k+15)/8','(8k+185)/8','1','345']]}
            pivotCol={4} />
          
          <p className="step-text">There is exactly one negative number left: <M>{'-15/8'}</M> in the <strong>S₂ column</strong>. This is our final pivot column.</p>
          
          <p className="step-text" style={{ marginTop: '16px' }}><strong>Ratio Test:</strong></p>
          <Tableau title="Ratio Test" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','0','0','1','1/4','−1/4','−3/4','0','6'],['y','0','1','0','−1/8','1/8','−1/8','0','3'],['x','1','0','0','1/16','−1/16','9/16','0','9/2'],['','0','0','0','−15/8','(8k+15)/8','(8k+185)/8','1','345']]}
            pivotCol={4} pivotRow={0} ratios={['6÷(1/4) = 24 ✓','3÷(−1/8) = Skip (negative)','(9/2)÷(1/16) = 72']} />
          <p className="step-text">Smallest positive ratio is <strong>24</strong>, so <strong>Row 1 (S₁)</strong> is the pivot row. Pivot element is <strong>1/4</strong>.</p>
          {step === 7 && <ContinueBtn onClick={() => setStep(8)} />}
        </StepCard>
      )}

      {step >= 8 && (
        <StepCard label="Step 4.9" title="Third Pivot: Making the Pivot Element 1">
          <p className="step-text">We must turn the pivot element (1/4) into a 1.</p>
          <p className="step-text">We take the old pivot row (Row 1, which is S₁) and divide by (1/4) — which is the same as multiplying by 4.</p>
          
          <RowMath title="Make New Pivot Row (S₂ replaces S₁)" formula="Old Row 1 × 4" calcs={[
            { col: 'x', math: '0 × 4', res: '0' },
            { col: 'y', math: '0 × 4', res: '0' },
            { col: 'S₁', math: '1 × 4', res: '4' },
            { col: 'S₂', math: '1/4 × 4', res: '1' },
            { col: 'A₁', math: '-1/4 × 4', res: '-1' },
            { col: 'A₂', math: '-3/4 × 4', res: '-3' },
            { col: 'Qty', math: '6 × 4', res: '24' },
          ]} />
          {step === 8 && <ContinueBtn onClick={() => setStep(9)} />}
        </StepCard>
      )}

      {step >= 9 && (
        <StepCard label="Step 4.10" title="Third Pivot: Zeroing the rest of the column">
          <p className="step-text">Last round of row operations to zero out S₂ everywhere else!</p>

          <RowMath title="Update y Row" formula="Old y − (-1/8) × New Pivot Row   =>   Old y + (1/8) × New Pivot Row" calcs={[
            { col: 'x', math: '0 + (1/8)(0)', res: '0' },
            { col: 'y', math: '1 + (1/8)(0)', res: '1' },
            { col: 'S₁', math: '0 + (1/8)(4)', res: '1/2' },
            { col: 'S₂', math: '-1/8 + (1/8)(1)', res: '0' },
            { col: 'A₁', math: '1/8 + (1/8)(-1)', res: '0' },
            { col: 'A₂', math: '-1/8 + (1/8)(-3)', res: '-1/2' },
            { col: 'Qty', math: '3 + (1/8)(24)', res: '6' },
          ]} />

          <RowMath title="Update x Row" formula="Old x − (1/16) × New Pivot Row" calcs={[
            { col: 'x', math: '1 - (1/16)(0)', res: '1' },
            { col: 'y', math: '0 - (1/16)(0)', res: '0' },
            { col: 'S₁', math: '0 - (1/16)(4)', res: '-1/4' },
            { col: 'S₂', math: '1/16 - (1/16)(1)', res: '0' },
            { col: 'A₁', math: '-1/16 - (1/16)(-1)', res: '0' },
            { col: 'A₂', math: '9/16 - (1/16)(-3)', res: '3/4' },
            { col: 'Qty', math: '9/2 - (1/16)(24)', res: '3' },
          ]} />

          <RowMath title="Update Objective Row" formula="Old Obj − (-15/8) × New Pivot Row   =>   Old Obj + (15/8) × New Pivot Row" calcs={[
            { col: 'x', math: '0 + (15/8)(0)', res: '0' },
            { col: 'y', math: '0 + (15/8)(0)', res: '0' },
            { col: 'S₁', math: '0 + (15/8)(4)', res: '15/2' },
            { col: 'S₂', math: '-15/8 + (15/8)(1)', res: '0' },
            { col: 'A₁', math: '(8k+15)/8 + (15/8)(-1)', res: 'k' },
            { col: 'A₂', math: '(8k+185)/8 + (15/8)(-3)', res: '(2k+35)/2' },
            { col: 'Qty', math: '345 + (15/8)(24)', res: '390' },
          ]} />
          {step === 9 && <ContinueBtn onClick={() => setStep(10)} />}
        </StepCard>
      )}

      {step >= 10 && (
        <StepCard label="Step 4.11" title="The Final Tableau!">
          <Tableau title="Tableau 4 — FINAL" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₂','0','0','4','1','−1','−3','0','24'],['y','0','1','1/2','0','0','−1/2','0','6'],['x','1','0','−1/4','0','0','3/4','0','3'],['','0','0','15/2','0','k','(2k+35)/2','1','390']]} />
          
          <p className="step-text" style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '1.1rem' }}>
            🎯 Check the bottom row: 0, 0, 15/2, 0, k, (2k+35)/2, 1. ALL are ≥ 0!<br/>
            OPTIMAL SOLUTION REACHED!
          </p>
          {step === 10 && <ContinueBtn onClick={() => setStep(11)} />}
        </StepCard>
      )}

      {step >= 11 && (
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
