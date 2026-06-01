import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, LockedContinueBtn, Tableau } from '../components';

// Premium Interactive Stepper Lesson Component
function InteractivePivotLesson({ data }) {
  const [activeStep, setActiveStep] = useState(0);

  const stepData = data.substeps[activeStep];
  const totalSteps = data.substeps.length;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid var(--border-glass)',
      borderRadius: 'var(--radius-xl)',
      padding: '24px',
      margin: '24px 0',
      backdropFilter: 'blur(12px)',
      boxShadow: 'var(--shadow-lg)'
    }}>
      {/* Title & Pivot Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Interactive Pivot #{data.pivotNum}: Moving {data.pivotColName} into the Basis
        </h3>
        <span className="section-badge" style={{ background: 'var(--accent-blue-glow)', color: 'var(--accent-blue)', margin: 0 }}>
          Pivot #{data.pivotNum}
        </span>
      </div>

      {/* Stepper Navigation */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 12,
        marginBottom: 20,
        borderBottom: '1px solid var(--border-glass)'
      }}>
        {data.substeps.map((sub, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                background: isActive ? 'var(--accent-blue)' : 'var(--bg-glass)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                border: '1px solid ' + (isActive ? 'var(--accent-blue)' : 'var(--border-glass)'),
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {idx === 0 ? '🎯 Goal' : `${idx}. ${sub.label}`}
            </button>
          );
        })}
      </div>

      {/* Two Column Layout: Left=Pedagogy, Right=Calculations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Card of Pedagogy */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderLeft: '4px solid ' + (activeStep === 0 ? 'var(--accent-purple)' : 'var(--accent-blue)'),
          padding: '20px',
          borderRadius: '0 8px 8px 0'
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            {stepData.title}
          </h4>
          
          <div style={{ marginBottom: 12 }}>
            <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 4 }}>💡 Why are we doing this?</strong>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {stepData.why}
            </p>
          </div>

          <div>
            <strong style={{ color: 'var(--accent-purple)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 4 }}>🛠️ How did we get the formula?</strong>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {stepData.how}
            </p>
          </div>

          {stepData.formula && (
            <div style={{ marginTop: 16, background: 'rgba(0,0,0,0.2)', padding: '10px 14px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.9rem', border: '1px dashed var(--border-glass)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Formula for this Row:</span> <strong style={{ color: 'var(--accent-emerald)' }}>{stepData.formula}</strong>
            </div>
          )}
        </div>

        {/* Math Grid showing item-by-item details */}
        {stepData.calcs && (
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              🔢 Step-by-Step Calculations (For every single column)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
              {stepData.calcs.map((c, ci) => (
                <div key={ci} style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-glass)',
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
                    Col {c.col}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
                    {c.math}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-emerald)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 4, marginTop: 4 }}>
                    = {c.res}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Visual Tableau Highlight Area */}
      <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          👀 Where is this happening in the table? (Active row is glowing!)
        </div>

        <div className="tableau-wrapper">
          <table className="tableau">
            <thead>
              <tr>
                {data.headers.map((h, i) => {
                  const isPivotCol = i === data.pivotCol;
                  return (
                    <th key={i} className={isPivotCol ? 'pivot-col' : ''} style={{
                      background: isPivotCol ? 'rgba(56, 189, 248, 0.15)' : '',
                      color: isPivotCol ? 'var(--accent-blue)' : ''
                    }}>
                      {h}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, ri) => {
                const isActiveRow = ri === stepData.highlightRow;
                const isObjRow = ri === data.rows.length - 1;
                return (
                  <tr key={ri} className={isObjRow ? 'obj-row' : ''} style={{
                    background: isActiveRow ? 'rgba(234, 179, 8, 0.08)' : '',
                    boxShadow: isActiveRow ? 'inset 0 0 10px rgba(234, 179, 8, 0.2)' : '',
                    border: isActiveRow ? '2px solid var(--accent-amber)' : ''
                  }}>
                    {row.map((cell, ci) => {
                      const isPivotCell = ri === data.pivotRow && ci === data.pivotCol;
                      let cellStyle = {};
                      if (isPivotCell) {
                        cellStyle = {
                          background: 'var(--accent-amber)',
                          color: '#000',
                          fontWeight: 'bold',
                          boxShadow: '0 0 8px var(--accent-amber)'
                        };
                      } else if (ci === data.pivotCol && !isObjRow) {
                        cellStyle = { background: 'rgba(56, 189, 248, 0.08)' };
                      }

                      return (
                        <td key={ci} style={cellStyle} className={ci === 0 ? 'basis-cell' : ''}>
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mini Next Step Indicator inside Stepper */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          ← Prev Operation
        </button>

        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
          Row Operation {activeStep + 1} of {totalSteps}
        </span>

        <button
          className="btn btn-primary"
          onClick={() => setActiveStep(prev => Math.min(totalSteps - 1, prev + 1))}
          disabled={activeStep === totalSteps - 1}
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          Next Operation →
        </button>
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

  // Complete mathematical configurations for the interactive lessons
  const pivot1Data = {
    pivotNum: 1,
    pivotColName: 'y',
    pivotRowName: 'A₁',
    headers: ['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty'],
    pivotCol: 2,
    pivotRow: 1,
    rows: [
      ['S₁','2','3','1','0','0','0','0','24'],
      ['A₁','2','9','0','−1','1','0','0','36'],
      ['A₂','2','1','0','0','0','1','0','12'],
      ['','−4k−50','−10k−40','0','k','0','0','1','−48k']
    ],
    substeps: [
      {
        title: '🎯 The Goal of Pivot #1',
        why: 'In Simplex, basis variables must form an identity matrix. Column "y" is entering the basis replacing A₁, so its column must transform from [3, 9, 1, −10k-40] into [0, 1, 0, 0].',
        how: 'To do this: First make the pivot element 1 by dividing the pivot row by 9. Then, subtract multiples of this row from all other rows to change their y coefficients to 0.',
        type: 'goal',
        highlightRow: 1,
      },
      {
        label: 'Make Pivot = 1',
        title: '1️⃣ Make New Pivot Row (y replaces A₁)',
        why: 'The pivot element is 9, but we need it to be 1. To do this, we divide every single entry in the A₁ row by 9.',
        how: 'Take the old Row 2 (A₁) and divide each coefficient by 9. S₁: 0÷9=0, S₂: -1÷9=-1/9, etc.',
        formula: 'New Row 2 = Old Row 2 ÷ 9',
        highlightRow: 1,
        calcs: [
          { col: 'x', math: '2 ÷ 9', res: '2/9' },
          { col: 'y', math: '9 ÷ 9', res: '1' },
          { col: 'S₁', math: '0 ÷ 9', res: '0' },
          { col: 'S₂', math: '−1 ÷ 9', res: '−1/9' },
          { col: 'A₁', math: '1 ÷ 9', res: '1/9' },
          { col: 'A₂', math: '0 ÷ 9', res: '0' },
          { col: 'Qty', math: '36 ÷ 9', res: '4' }
        ]
      },
      {
        label: 'Zero-out Row 1',
        title: '2️⃣ Zero-out S₁ Row (Row 1)',
        why: 'Old Row 1 (S₁) has a 3 in the y column. To turn it into 0, we subtract 3 times our new pivot row.',
        how: 'Why 3? Because 3 − 3 × (1) = 0. We must do this for every single cell in the row so the whole equation stays balanced!',
        formula: 'New S₁ Row = Old S₁ Row − 3 × (New y Row)',
        highlightRow: 0,
        calcs: [
          { col: 'x', math: '2 − 3 × (2/9)', res: '4/3' },
          { col: 'y', math: '3 − 3 × (1)', res: '0' },
          { col: 'S₁', math: '1 − 3 × (0)', res: '1' },
          { col: 'S₂', math: '0 − 3 × (−1/9)', res: '1/3' },
          { col: 'A₁', math: '0 − 3 × (1/9)', res: '−1/3' },
          { col: 'A₂', math: '0 − 3 × (0)', res: '0' },
          { col: 'Qty', math: '24 − 3 × (4)', res: '12' }
        ]
      },
      {
        label: 'Zero-out Row 3',
        title: '3️⃣ Zero-out A₂ Row (Row 3)',
        why: 'Old Row 3 (A₂) has a 1 in the y column. We must turn it into 0.',
        how: 'To make 1 into 0 using a pivot row with 1, we subtract 1 times the new pivot row: 1 − 1 = 0.',
        formula: 'New A₂ Row = Old A₂ Row − 1 × (New y Row)',
        highlightRow: 2,
        calcs: [
          { col: 'x', math: '2 − 1 × (2/9)', res: '16/9' },
          { col: 'y', math: '1 − 1 × (1)', res: '0' },
          { col: 'S₁', math: '0 − 1 × (0)', res: '0' },
          { col: 'S₂', math: '0 − 1 × (−1/9)', res: '1/9' },
          { col: 'A₁', math: '0 − 1 × (1/9)', res: '−1/9' },
          { col: 'A₂', math: '1 − 1 × (0)', res: '1' },
          { col: 'Qty', math: '12 − 1 × (4)', res: '8' }
        ]
      },
      {
        label: 'Zero-out Obj',
        title: '4️⃣ Zero-out Objective Row',
        why: 'The bottom row currently has −10k−40 in the y column. We must turn it into a 0.',
        how: 'To cancel out −10k−40, we add (10k+40) times the new pivot row: (−10k−40) + (10k+40) × 1 = 0.',
        formula: 'New Obj = Old Obj + (10k+40) × (New y Row)',
        highlightRow: 3,
        calcs: [
          { col: 'x', math: '(−4k−50) + (10k+40)(2/9)', res: '(−16k−370)/9' },
          { col: 'y', math: '(−10k−40) + (10k+40)(1)', res: '0' },
          { col: 'S₁', math: '0 + (10k+40)(0)', res: '0' },
          { col: 'S₂', math: 'k + (10k+40)(−1/9)', res: '(−k−40)/9' },
          { col: 'A₁', math: '0 + (10k+40)(1/9)', res: '(10k+40)/9' },
          { col: 'A₂', math: '0 + (10k+40)(0)', res: '0' },
          { col: 'Qty', math: '−48k + (10k+40)(4)', res: '−8k+160' }
        ]
      }
    ]
  };

  const pivot2Data = {
    pivotNum: 2,
    pivotColName: 'x',
    pivotRowName: 'A₂',
    headers: ['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty'],
    pivotCol: 1,
    pivotRow: 2,
    rows: [
      ['S₁','4/3','0','1','1/3','−1/3','0','0','12'],
      ['y','2/9','1','0','−1/9','1/9','0','0','4'],
      ['A₂','16/9','0','0','1/9','−1/9','1','0','8'],
      ['','(−16k−370)/9','0','0','(−k−40)/9','(10k+40)/9','0','1','−8k+160']
    ],
    substeps: [
      {
        title: '🎯 The Goal of Pivot #2',
        why: 'Now we pivot column x into the basis replacing A₂. We must turn column x into [0, 0, 1, 0] so it forms the next part of our identity matrix.',
        how: 'To do this: First make the pivot element 1 by multiplying Row 3 by 9/16. Then, subtract multiples of this row from all other rows to zero out their x coefficients.',
        type: 'goal',
        highlightRow: 2,
      },
      {
        label: 'Make Pivot = 1',
        title: '1️⃣ Make New Pivot Row (x replaces A₂)',
        why: 'The pivot element is 16/9. To turn it into 1, we multiply the entire row by 9/16.',
        how: 'Multiply each element in Row 3 by 9/16. E.g., Qty: 8 × (9/16) = 9/2.',
        formula: 'New Row 3 = Old Row 3 × (9/16)',
        highlightRow: 2,
        calcs: [
          { col: 'x', math: '16/9 × 9/16', res: '1' },
          { col: 'y', math: '0 × 9/16', res: '0' },
          { col: 'S₁', math: '0 × 9/16', res: '0' },
          { col: 'S₂', math: '1/9 × 9/16', res: '1/16' },
          { col: 'A₁', math: '−1/9 × 9/16', res: '−1/16' },
          { col: 'A₂', math: '1 × 9/16', res: '9/16' },
          { col: 'Qty', math: '8 × 9/16', res: '9/2' }
        ]
      },
      {
        label: 'Zero-out Row 1',
        title: '2️⃣ Zero-out S₁ Row (Row 1)',
        why: 'Old Row 1 has a 4/3 in the x column. We must turn it into 0.',
        how: 'We subtract 4/3 times our new pivot row from old Row 1: 4/3 − 4/3 × 1 = 0.',
        formula: 'New S₁ Row = Old S₁ Row − (4/3) × (New x Row)',
        highlightRow: 0,
        calcs: [
          { col: 'x', math: '4/3 − 4/3(1)', res: '0' },
          { col: 'y', math: '0 − 4/3(0)', res: '0' },
          { col: 'S₁', math: '1 − 4/3(0)', res: '1' },
          { col: 'S₂', math: '1/3 − (4/3)(1/16)', res: '1/4' },
          { col: 'A₁', math: '−1/3 − (4/3)(−1/16)', res: '−1/4' },
          { col: 'A₂', math: '0 − (4/3)(9/16)', res: '−3/4' },
          { col: 'Qty', math: '12 − (4/3)(9/2)', res: '6' }
        ]
      },
      {
        label: 'Zero-out Row 2',
        title: '3️⃣ Zero-out y Row (Row 2)',
        why: 'Old Row 2 (y) has a 2/9 in the x column. We must turn it into 0.',
        how: 'Subtract 2/9 times the new pivot row from the old y row: 2/9 − 2/9 × 1 = 0.',
        formula: 'New y Row = Old y Row − (2/9) × (New x Row)',
        highlightRow: 1,
        calcs: [
          { col: 'x', math: '2/9 − 2/9(1)', res: '0' },
          { col: 'y', math: '1 − 2/9(0)', res: '1' },
          { col: 'S₁', math: '0 − 2/9(0)', res: '0' },
          { col: 'S₂', math: '−1/9 − (2/9)(1/16)', res: '−1/8' },
          { col: 'A₁', math: '1/9 − (2/9)(−1/16)', res: '1/8' },
          { col: 'A₂', math: '0 − (2/9)(9/16)', res: '−1/8' },
          { col: 'Qty', math: '4 − (2/9)(9/2)', res: '3' }
        ]
      },
      {
        label: 'Zero-out Obj',
        title: '4️⃣ Zero-out Objective Row',
        why: 'The bottom row has (−16k−370)/9 in the x column. We must turn it into 0.',
        how: 'To cancel out this negative term, we add (16k+370)/9 times our new pivot row.',
        formula: 'New Obj = Old Obj + ((16k+370)/9) × (New x Row)',
        highlightRow: 3,
        calcs: [
          { col: 'x', math: '(−16k−370)/9 + ((16k+370)/9)(1)', res: '0' },
          { col: 'y', math: '0 + 0', res: '0' },
          { col: 'S₁', math: '0 + 0', res: '0' },
          { col: 'S₂', math: '(−k−40)/9 + ((16k+370)/9)(1/16)', res: '−15/8' },
          { col: 'A₁', math: '(10k+40)/9 + ((16k+370)/9)(−1/16)', res: '(8k+15)/8' },
          { col: 'A₂', math: '0 + ((16k+370)/9)(9/16)', res: '(8k+185)/8' },
          { col: 'Qty', math: '(−8k+160) + ((16k+370)/9)(9/2)', res: '345' }
        ]
      }
    ]
  };

  const pivot3Data = {
    pivotNum: 3,
    pivotColName: 'S₂',
    pivotRowName: 'S₁',
    headers: ['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty'],
    pivotCol: 4,
    pivotRow: 0,
    rows: [
      ['S₁','0','0','1','1/4','−1/4','−3/4','0','6'],
      ['y','0','1','0','−1/8','1/8','−1/8','0','3'],
      ['x','1','0','0','1/16','−1/16','9/16','0','9/2'],
      ['','0','0','0','−15/8','(8k+15)/8','(8k+185)/8','1','345']
    ],
    substeps: [
      {
        title: '🎯 The Goal of Pivot #3',
        why: 'In the third iteration, column S₂ enters the basis replacing S₁. We must turn the S₂ column into [1, 0, 0, 0].',
        how: 'To do this: First make the pivot element 1 by multiplying Row 1 by 4. Then, use row operations to clear out S₂ in all other rows.',
        type: 'goal',
        highlightRow: 0,
      },
      {
        label: 'Make Pivot = 1',
        title: '1️⃣ Make New Pivot Row (S₂ replaces S₁)',
        why: 'The pivot element is 1/4. To turn it into 1, we multiply the entire row by 4.',
        how: 'Multiply every value in Row 1 by 4. E.g., Qty: 6 × 4 = 24.',
        formula: 'New Row 1 = Old Row 1 × 4',
        highlightRow: 0,
        calcs: [
          { col: 'x', math: '0 × 4', res: '0' },
          { col: 'y', math: '0 × 4', res: '0' },
          { col: 'S₁', math: '1 × 4', res: '4' },
          { col: 'S₂', math: '1/4 × 4', res: '1' },
          { col: 'A₁', math: '−1/4 × 4', res: '−1' },
          { col: 'A₂', math: '−3/4 × 4', res: '−3' },
          { col: 'Qty', math: '6 × 4', res: '24' }
        ]
      },
      {
        label: 'Zero-out Row 2',
        title: '2️⃣ Zero-out y Row (Row 2)',
        why: 'Old Row 2 (y) has a −1/8 in the S₂ column. We must turn it into 0.',
        how: 'Since it is negative, we ADD 1/8 times our new pivot row: −1/8 + 1/8 × 1 = 0.',
        formula: 'New y Row = Old y Row + (1/8) × (New S₂ Row)',
        highlightRow: 1,
        calcs: [
          { col: 'x', math: '0 + (1/8)(0)', res: '0' },
          { col: 'y', math: '1 + (1/8)(0)', res: '1' },
          { col: 'S₁', math: '0 + (1/8)(4)', res: '1/2' },
          { col: 'S₂', math: '−1/8 + (1/8)(1)', res: '0' },
          { col: 'A₁', math: '1/8 + (1/8)(−1)', res: '0' },
          { col: 'A₂', math: '−1/8 + (1/8)(−3)', res: '−1/2' },
          { col: 'Qty', math: '3 + (1/8)(24)', res: '6' }
        ]
      },
      {
        label: 'Zero-out Row 3',
        title: '3️⃣ Zero-out x Row (Row 3)',
        why: 'Old Row 3 (x) has a 1/16 in the S₂ column. We must turn it into 0.',
        how: 'Subtract 1/16 times our new pivot row: 1/16 − 1/16 × 1 = 0.',
        formula: 'New x Row = Old x Row − (1/16) × (New S₂ Row)',
        highlightRow: 2,
        calcs: [
          { col: 'x', math: '1 − (1/16)(0)', res: '1' },
          { col: 'y', math: '0 − (1/16)(0)', res: '0' },
          { col: 'S₁', math: '0 − (1/16)(4)', res: '−1/4' },
          { col: 'S₂', math: '1/16 − (1/16)(1)', res: '0' },
          { col: 'A₁', math: '−1/16 − (1/16)(−1)', res: '0' },
          { col: 'A₂', math: '9/16 − (1/16)(−3)', res: '3/4' },
          { col: 'Qty', math: '9/2 − (1/16)(24)', res: '3' }
        ]
      },
      {
        label: 'Zero-out Obj',
        title: '4️⃣ Zero-out Objective Row',
        why: 'The bottom row has −15/8 in the S₂ column. We must turn it into 0.',
        how: 'Add 15/8 times our new pivot row: −15/8 + 15/8 × 1 = 0.',
        formula: 'New Obj = Old Obj + (15/8) × (New S₂ Row)',
        highlightRow: 3,
        calcs: [
          { col: 'x', math: '0 + (15/8)(0)', res: '0' },
          { col: 'y', math: '0 + (15/8)(0)', res: '0' },
          { col: 'S₁', math: '0 + (15/8)(4)', res: '15/2' },
          { col: 'S₂', math: '−15/8 + (15/8)(1)', res: '0' },
          { col: 'A₁', math: '(8k+15)/8 + (15/8)(−1)', res: 'k' },
          { col: 'A₂', math: '(8k+185)/8 + (15/8)(−3)', res: '(2k+35)/2' },
          { col: 'Qty', math: '345 + (15/8)(24)', res: '390' }
        ]
      }
    ]
  };

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
        <StepCard label="Step 4.2" title="First Pivot: Selecting Column and Row">
          <p className="step-text"><strong>1. Finding the Pivot Column:</strong> We inspect the objective row. The most negative coefficient is our pivot column.</p>
          <Tableau title="Tableau 1" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','2','3','1','0','0','0','0','24'],['A₁','2','9','0','−1','1','0','0','36'],['A₂','2','1','0','0','0','1','0','12'],['','−4k−50','−10k−40','0','k','0','0','1','−48k']]}
            pivotCol={2} />
          <p className="step-text">Since k represents an extremely large penalty number, <M>{'-10k - 40'}</M> is more negative than <M>{'-4k - 50'}</M>. Therefore, the <strong>y column</strong> enters the basis.</p>
          
          <p className="step-text" style={{ marginTop: '20px' }}><strong>2. Finding the Pivot Row:</strong> We divide the Qty column by the positive numbers in the y column. We select the row with the <strong>smallest positive</strong> ratio.</p>
          <Tableau title="Ratio Test" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','2','3','1','0','0','0','0','24'],['A₁','2','9','0','−1','1','0','0','36'],['A₂','2','1','0','0','0','1','0','12'],['','−4k−50','−10k−40','0','k','0','0','1','−48k']]}
            pivotCol={2} pivotRow={1} ratios={['24÷3 = 8','36÷9 = 4 ✓','12÷1 = 12']} />
          <p className="step-text">The smallest ratio is <strong>4</strong>, which belongs to <strong>Row 2 (A₁)</strong>. The pivot element is <strong>9</strong>.</p>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 4.3" title="First Pivot: Row Operations">
          <p className="step-text">Now we perform the row operations. Use the stepper below to see exactly how each row in the table changes, step by step, cell by cell.</p>
          <InteractivePivotLesson data={pivot1Data} />
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 4.4" title="Second Pivot: Selecting Column and Row">
          <p className="step-text">Here is the updated **Tableau 2**. Let\'s find the next entering and leaving variables.</p>
          <Tableau title="Tableau 2" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','4/3','0','1','1/3','−1/3','0','0','12'],['y','2/9','1','0','−1/9','1/9','0','0','4'],['A₂','16/9','0','0','1/9','−1/9','1','0','8'],['','(−16k−370)/9','0','0','(−k−40)/9','(10k+40)/9','0','1','−8k+160']]}
            pivotCol={1} />
          
          <p className="step-text">In the objective row, <M>{'(-16k-370)/9'}</M> is the most negative term. So the <strong>x column</strong> is our entering variable.</p>
          
          <p className="step-text" style={{ marginTop: '20px' }}><strong>Ratio Test:</strong></p>
          <Tableau title="Ratio Test" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','4/3','0','1','1/3','−1/3','0','0','12'],['y','2/9','1','0','−1/9','1/9','0','0','4'],['A₂','16/9','0','0','1/9','−1/9','1','0','8'],['','(−16k−370)/9','0','0','(−k−40)/9','(10k+40)/9','0','1','−8k+160']]}
            pivotCol={1} pivotRow={2} ratios={['12÷(4/3) = 9','4÷(2/9) = 18','8÷(16/9) = 4.5 ✓']} />
          <p className="step-text">The smallest positive ratio is <strong>4.5</strong>, so <strong>Row 3 (A₂)</strong> leaves the basis. The pivot element is <strong>16/9</strong>.</p>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <StepCard label="Step 4.5" title="Second Pivot: Row Operations">
          <p className="step-text">Use the stepper below to observe every calculation for Pivot #2, row by row and cell by cell.</p>
          <InteractivePivotLesson data={pivot2Data} />
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {step >= 5 && (
        <StepCard label="Step 4.6" title="Third Pivot: Selecting Column and Row">
          <p className="step-text">Here is **Tableau 3**. Let\'s see if there is still room for improvement.</p>
          <Tableau title="Tableau 3" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','0','0','1','1/4','−1/4','−3/4','0','6'],['y','0','1','0','−1/8','1/8','−1/8','0','3'],['x','1','0','0','1/16','−1/16','9/16','0','9/2'],['','0','0','0','−15/8','(8k+15)/8','(8k+185)/8','1','345']]}
            pivotCol={4} />
          
          <p className="step-text">There is one remaining negative number in the bottom row: <M>{'-15/8'}</M> in the <strong>S₂ column</strong>. It enters the basis.</p>
          
          <p className="step-text" style={{ marginTop: '20px' }}><strong>Ratio Test:</strong></p>
          <Tableau title="Ratio Test" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','0','0','1','1/4','−1/4','−3/4','0','6'],['y','0','1','0','−1/8','1/8','−1/8','0','3'],['x','1','0','0','1/16','−1/16','9/16','0','9/2'],['','0','0','0','−15/8','(8k+15)/8','(8k+185)/8','1','345']]}
            pivotCol={4} pivotRow={0} ratios={['6÷(1/4) = 24 ✓','3÷(−1/8) = Skip (negative)','(9/2)÷(1/16) = 72']} />
          <p className="step-text">The smallest positive ratio is <strong>24</strong>. Therefore, <strong>Row 1 (S₁)</strong> leaves. The pivot element is <strong>1/4</strong>.</p>
          {step === 5 && <ContinueBtn onClick={() => setStep(6)} />}
        </StepCard>
      )}

      {step >= 6 && (
        <StepCard label="Step 4.7" title="Third Pivot: Row Operations">
          <p className="step-text">Use the stepper below to view every cell operation for the third and final pivot.</p>
          <InteractivePivotLesson data={pivot3Data} />
          {step === 6 && <ContinueBtn onClick={() => setStep(7)} />}
        </StepCard>
      )}

      {step >= 7 && (
        <StepCard label="Step 4.8" title="The Final Optimal Tableau!">
          <p className="step-text">After completing all pivot steps, we obtain the optimal tableau. Notice that the artificial columns A₁ and A₂ still have k in the objective row, but they are no longer in the Basis. S₁ and S₂ now represent the final slack, and x and y are the optimal product values.</p>
          <Tableau title="Tableau 4 — FINAL" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₂','0','0','4','1','−1','−3','0','24'],['y','0','1','1/2','0','0','−1/2','0','6'],['x','1','0','−1/4','0','0','3/4','0','3'],['','0','0','15/2','0','k','(2k+35)/2','1','390']]} />
          
          <p className="step-text" style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '1.1rem', marginTop: '16px' }}>
            🎯 Look at the bottom row: [0, 0, 15/2, 0, k, (2k+35)/2, 1]. All values are non-negative (≥ 0)! <br/>
            This signifies that we have reached the absolute best possible solution!
          </p>
          {step === 7 && <ContinueBtn onClick={() => setStep(8)} />}
        </StepCard>
      )}

      {step >= 8 && (
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
