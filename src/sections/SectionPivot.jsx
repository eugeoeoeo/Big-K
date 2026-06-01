import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, LockedContinueBtn } from '../components';

// Premium Visual Pivot Teacher Component
function SimplexPivotTeacher({ config }) {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredCol, setHoveredCol] = useState(null);

  const stepData = config.steps[activeStep];
  const totalSteps = config.steps.length;

  // Compute the current state of the table at this step
  const currentRows = config.initialRows.map((row, ri) => {
    // Check if this row has been updated yet at the current step
    for (let s = 1; s <= activeStep; s++) {
      const step = config.steps[s];
      if (step && step.updatedRowIndex === ri) {
        return step.newRowValues;
      }
    }
    return row;
  });

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
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Pivot #{config.pivotNum}: Moving {config.pivotColName} into the Basis
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Watch the table update row-by-row as you perform row operations.
          </p>
        </div>
        <span className="section-badge" style={{ background: 'var(--accent-blue-glow)', color: 'var(--accent-blue)', margin: 0 }}>
          Pivot #{config.pivotNum}
        </span>
      </div>

      {/* Stepper Tabs */}
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 10,
        marginBottom: 20,
        borderBottom: '1px solid var(--border-glass)'
      }}>
        {config.steps.map((sub, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveStep(idx);
                setHoveredCol(null);
              }}
              style={{
                background: isActive ? 'var(--accent-blue)' : 'var(--bg-glass)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                border: '1px solid ' + (isActive ? 'var(--accent-blue)' : 'var(--border-glass)'),
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {idx === 0 ? '🎯 Goal' : `${idx}. ${sub.label}`}
            </button>
          );
        })}
      </div>

      {/* STEP INFO & EXPLANATION PANEL */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderLeft: '4px solid ' + (activeStep === 0 ? 'var(--accent-purple)' : 'var(--accent-blue)'),
        padding: '20px',
        borderRadius: '0 12px 12px 0',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700 }}>
          {stepData.title}
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          <div>
            <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 4 }}>💡 What are we doing here?</strong>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {stepData.why}
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--accent-purple)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 4 }}>🛠️ How did we get the formula?</strong>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {stepData.how}
            </p>
          </div>
        </div>

        {stepData.formula && (
          <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.25)', padding: '10px 14px', borderRadius: '6px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 8, border: '1px dashed var(--border-glass)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Formula for this step:</span>
            <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'monospace', fontSize: '0.95rem' }}>{stepData.formula}</strong>
          </div>
        )}
      </div>

      {/* DYNAMIC LIVE TABLEAU */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            📊 Live Simplex Tableau (Updates row-by-row)
          </span>
          {stepData.updatedRowIndex !== null && (
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
              💡 Hover over any cell in the active row to inspect its formula!
            </span>
          )}
        </div>

        <div className="tableau-wrapper">
          <table className="tableau">
            <thead>
              <tr>
                {config.headers.map((h, i) => {
                  const isPivotCol = i === config.pivotCol;
                  return (
                    <th key={i} className={isPivotCol ? 'pivot-col' : ''} style={{
                      background: isPivotCol ? 'rgba(56, 189, 248, 0.12)' : '',
                      color: isPivotCol ? 'var(--accent-blue)' : ''
                    }}>
                      {h}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, ri) => {
                const isActiveRow = ri === stepData.updatedRowIndex;
                const isObjRow = ri === currentRows.length - 1;
                
                return (
                  <tr key={ri} className={isObjRow ? 'obj-row' : ''} style={{
                    background: isActiveRow ? 'rgba(234, 179, 8, 0.06)' : '',
                    outline: isActiveRow ? '1px solid var(--accent-amber)' : '',
                    transition: 'all 0.3s ease'
                  }}>
                    {row.map((cell, ci) => {
                      const isPivotCell = ri === config.pivotRow && ci === config.pivotCol;
                      const isHovered = isActiveRow && ci === hoveredCol;

                      let cellStyle = { cursor: isActiveRow && ci > 0 ? 'pointer' : 'default', transition: 'all 0.15s ease' };
                      if (isPivotCell) {
                        cellStyle = {
                          ...cellStyle,
                          background: 'var(--accent-amber)',
                          color: '#000',
                          fontWeight: 'bold',
                          boxShadow: '0 0 6px var(--accent-amber)'
                        };
                      } else if (ci === config.pivotCol && !isObjRow) {
                        cellStyle = { ...cellStyle, background: 'rgba(56, 189, 248, 0.06)' };
                      }

                      if (isHovered) {
                        cellStyle = {
                          ...cellStyle,
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: 'var(--accent-emerald)',
                          fontWeight: 'bold'
                        };
                      }

                      return (
                        <td
                          key={ci}
                          style={cellStyle}
                          className={ci === 0 ? 'basis-cell' : ''}
                          onMouseEnter={() => isActiveRow && ci > 0 && setHoveredCol(ci)}
                          onMouseLeave={() => setHoveredCol(null)}
                        >
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

      {/* CELL INSPECTOR PANEL (EXPLAINS CELLS ON HOVER) */}
      {stepData.updatedRowIndex !== null && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.03)',
          border: '1px solid ' + (hoveredCol ? 'var(--accent-emerald)' : 'var(--border-glass)'),
          borderRadius: '12px',
          padding: '16px 20px',
          transition: 'all 0.2s ease',
          minHeight: '120px'
        }}>
          {hoveredCol && stepData.colCalcs && stepData.colCalcs[hoveredCol] ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  🔬 Cell Inspector: Column {config.headers[hoveredCol]} (Row {currentRows[stepData.updatedRowIndex][0]})
                </span>
                <span className="section-badge" style={{ background: 'var(--accent-emerald-glow)', color: 'var(--accent-emerald)', margin: 0 }}>
                  Active Row cell
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Why this number?</span>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{stepData.colCalcs[hoveredCol].why}</span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Calculation:</span>{' '}
                  <strong style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {stepData.colCalcs[hoveredCol].math}
                  </strong>
                  {' '}
                  <strong style={{ color: 'var(--accent-emerald)', fontSize: '1rem' }}>
                    = {stepData.colCalcs[hoveredCol].res}
                  </strong>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80px', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
              <span>🔍 Hover your mouse or tap any cell in the highlighted active row (Row {currentRows[stepData.updatedRowIndex][0]}) to see the cell-by-cell math details instantly!</span>
            </div>
          )}
        </div>
      )}

      {/* Stepper Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setActiveStep(prev => Math.max(0, prev - 1));
            setHoveredCol(null);
          }}
          disabled={activeStep === 0}
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          ← Prev Row Operation
        </button>

        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
          Step {activeStep + 1} of {totalSteps}
        </span>

        <button
          className="btn btn-primary"
          onClick={() => {
            setActiveStep(prev => Math.min(totalSteps - 1, prev + 1));
            setHoveredCol(null);
          }}
          disabled={activeStep === totalSteps - 1}
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          Next Row Operation →
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

  // COMPLETE EDUCATIONAL DATASETS FOR THE PIVOTS
  const pivot1Config = {
    pivotNum: 1,
    pivotColName: 'y',
    pivotCol: 2,
    pivotRow: 1,
    pivotElement: '9',
    headers: ['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty'],
    initialRows: [
      ['S₁','2','3','1','0','0','0','0','24'],
      ['A₁','2','9','0','−1','1','0','0','36'],
      ['A₂','2','1','0','0','0','1','0','12'],
      ['','−4k−50','−10k−40','0','k','0','0','1','−48k']
    ],
    steps: [
      {
        label: 'Goal',
        title: '🎯 The Goal of Pivot #1',
        why: 'In a valid Simplex Tableau, the column of a Basis variable must have a 1 at its active row and 0 everywhere else. Since "y" is entering the Basis replacing A₁, we must turn the "y" column from [3, 9, 1, −10k−40] into [0, 1, 0, 0].',
        how: 'We will do this in 4 row operations: first divide Row 2 (A₁) by 9 to turn the pivot element into a 1. Then, subtract multiples of this row from S₁, A₂, and the Objective row to turn their y coefficients into 0.',
        updatedRowIndex: null
      },
      {
        label: 'Make Pivot = 1',
        title: '1️⃣ Make New Pivot Row (y replaces A₁)',
        why: 'The pivot element at Row 2, Column y is 9. To turn it into 1, we divide every cell in this row by 9.',
        how: 'Take the old Row 2 and divide it by 9. The Basis changes from A₁ to y.',
        formula: 'New Row 2 = Old Row 2 ÷ 9',
        updatedRowIndex: 1,
        newRowValues: ['y','2/9','1','0','−1/9','1/9','0','0','4'],
        colCalcs: {
          1: { why: 'We divide the old x coefficient (2) by 9.', math: '2 ÷ 9', res: '2/9' },
          2: { why: 'We divide the pivot element (9) by 9 to get 1.', math: '9 ÷ 9', res: '1' },
          3: { why: 'We divide the old S₁ coefficient (0) by 9.', math: '0 ÷ 9', res: '0' },
          4: { why: 'We divide the old S₂ coefficient (−1) by 9.', math: '−1 ÷ 9', res: '−1/9' },
          5: { why: 'We divide the old A₁ coefficient (1) by 9.', math: '1 ÷ 9', res: '1/9' },
          6: { why: 'We divide the old A₂ coefficient (0) by 9.', math: '0 ÷ 9', res: '0' },
          8: { why: 'We divide the old quantity (36) by 9.', math: '36 ÷ 9', res: '4' }
        }
      },
      {
        label: 'Zero-out Row S₁',
        title: '2️⃣ Zero-out S₁ Row (Row 1)',
        why: 'Old Row 1 (S₁) has a 3 in the y column. To turn it into 0, we subtract 3 times our new pivot row.',
        how: 'We want 3 − X × 1 = 0, so X must be 3. We subtract 3 × (New y Row) from every column of old S₁.',
        formula: 'New S₁ Row = Old S₁ Row − 3 × (New y Row)',
        updatedRowIndex: 0,
        newRowValues: ['S₁','4/3','0','1','1/3','−1/3','0','0','12'],
        colCalcs: {
          1: { why: 'Old x (2) minus 3 times New x (2/9).', math: '2 − 3 × (2/9) = 2 − 2/3', res: '4/3' },
          2: { why: 'Old y (3) minus 3 times New y (1) cancels out to 0.', math: '3 − 3 × (1)', res: '0' },
          3: { why: 'Old S₁ (1) minus 3 times New S₁ (0).', math: '1 − 3 × (0)', res: '1' },
          4: { why: 'Old S₂ (0) minus 3 times New S₂ (−1/9).', math: '0 − 3 × (−1/9)', res: '1/3' },
          5: { why: 'Old A₁ (0) minus 3 times New A₁ (1/9).', math: '0 − 3 × (1/9)', res: '−1/3' },
          6: { why: 'Old A₂ (0) minus 3 times New A₂ (0).', math: '0 − 3 × (0)', res: '0' },
          8: { why: 'Old Qty (24) minus 3 times New Qty (4).', math: '24 − 3 × (4)', res: '12' }
        }
      },
      {
        label: 'Zero-out Row A₂',
        title: '3️⃣ Zero-out A₂ Row (Row 3)',
        why: 'Old Row 3 (A₂) has a 1 in the y column. We must turn it into 0.',
        how: 'Since it is already 1, we simply subtract 1 times the new pivot row: 1 − 1 = 0.',
        formula: 'New A₂ Row = Old A₂ Row − 1 × (New y Row)',
        updatedRowIndex: 2,
        newRowValues: ['A₂','16/9','0','0','1/9','−1/9','1','0','8'],
        colCalcs: {
          1: { why: 'Old x (2) minus New x (2/9).', math: '2 − 2/9', res: '16/9' },
          2: { why: 'Old y (1) minus New y (1) cancels out.', math: '1 − 1', res: '0' },
          3: { why: 'Old S₁ (0) minus New S₁ (0).', math: '0 − 0', res: '0' },
          4: { why: 'Old S₂ (0) minus New S₂ (−1/9).', math: '0 − (−1/9)', res: '1/9' },
          5: { why: 'Old A₁ (0) minus New A₁ (1/9).', math: '0 − 1/9', res: '−1/9' },
          6: { why: 'Old A₂ (1) minus New A₂ (0).', math: '1 − 0', res: '1' },
          8: { why: 'Old Qty (12) minus New Qty (4).', math: '12 − 4', res: '8' }
        }
      },
      {
        label: 'Zero-out Obj',
        title: '4️⃣ Zero-out Objective Row',
        why: 'The bottom row has −10k−40 in the y column. We must turn it into a 0.',
        how: 'To cancel out this negative term, we add (10k+40) times our new pivot row.',
        formula: 'New Obj = Old Obj + (10k+40) × (New y Row)',
        updatedRowIndex: 3,
        newRowValues: ['','(−16k−370)/9','0','0','(−k−40)/9','(10k+40)/9','0','1','−8k+160'],
        colCalcs: {
          1: { why: 'Old x (−4k−50) plus (10k+40) times New x (2/9).', math: '(−4k−50) + (10k+40)(2/9)', res: '(−16k−370)/9' },
          2: { why: 'Old y (−10k−40) plus (10k+40) times New y (1) cancels to 0.', math: '(−10k−40) + (10k+40)(1)', res: '0' },
          3: { why: 'Old S₁ (0) plus (10k+40) times New S₁ (0).', math: '0 + 0', res: '0' },
          4: { why: 'Old S₂ (k) plus (10k+40) times New S₂ (−1/9).', math: 'k + (10k+40)(−1/9)', res: '(−k−40)/9' },
          5: { why: 'Old A₁ (0) plus (10k+40) times New A₁ (1/9).', math: '0 + (10k+40)(1/9)', res: '(10k+40)/9' },
          6: { why: 'Old A₂ (0) plus (10k+40) times New A₂ (0).', math: '0 + 0', res: '0' },
          8: { why: 'Old Qty (−48k) plus (10k+40) times New Qty (4).', math: '−48k + (10k+40)(4)', res: '−8k+160' }
        }
      }
    ]
  };

  const pivot2Config = {
    pivotNum: 2,
    pivotColName: 'x',
    pivotCol: 1,
    pivotRow: 2,
    pivotElement: '16/9',
    headers: ['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty'],
    initialRows: [
      ['S₁','4/3','0','1','1/3','−1/3','0','0','12'],
      ['y','2/9','1','0','−1/9','1/9','0','0','4'],
      ['A₂','16/9','0','0','1/9','−1/9','1','0','8'],
      ['','(−16k−370)/9','0','0','(−k−40)/9','(10k+40)/9','0','1','−8k+160']
    ],
    steps: [
      {
        label: 'Goal',
        title: '🎯 The Goal of Pivot #2',
        why: 'Column "x" is entering the Basis replacing A₂. We must turn the x column from [4/3, 2/9, 16/9, (−16k−370)/9] into [0, 0, 1, 0].',
        how: 'To do this: Multiply Row 3 by 9/16 to turn the pivot element into a 1. Then, subtract multiples of this row from S₁, y, and the Objective row to turn their x values into 0.',
        updatedRowIndex: null
      },
      {
        label: 'Make Pivot = 1',
        title: '1️⃣ Make New Pivot Row (x replaces A₂)',
        why: 'The pivot element is 16/9. To turn it into 1, we multiply the entire Row 3 by 9/16.',
        how: 'Take old Row 3 and multiply every element by 9/16. The Basis changes from A₂ to x.',
        formula: 'New Row 3 = Old Row 3 × (9/16)',
        updatedRowIndex: 2,
        newRowValues: ['x','1','0','0','1/16','−1/16','9/16','0','9/2'],
        colCalcs: {
          1: { why: 'We multiply the old x (16/9) by 9/16 to get 1.', math: '16/9 × 9/16', res: '1' },
          2: { why: 'Old y (0) multiplied by 9/16.', math: '0 × 9/16', res: '0' },
          3: { why: 'Old S₁ (0) multiplied by 9/16.', math: '0 × 9/16', res: '0' },
          4: { why: 'Old S₂ (1/9) multiplied by 9/16.', math: '1/9 × 9/16', res: '1/16' },
          5: { why: 'Old A₁ (−1/9) multiplied by 9/16.', math: '−1/9 × 9/16', res: '−1/16' },
          6: { why: 'Old A₂ (1) multiplied by 9/16.', math: '1 × 9/16', res: '9/16' },
          8: { why: 'Old Qty (8) multiplied by 9/16.', math: '8 × 9/16', res: '9/2' }
        }
      },
      {
        label: 'Zero-out Row S₁',
        title: '2️⃣ Zero-out S₁ Row (Row 1)',
        why: 'Old Row 1 (S₁) has a 4/3 in the x column. We must turn it into 0.',
        how: 'We subtract 4/3 times our new pivot row: 4/3 − 4/3 × 1 = 0.',
        formula: 'New S₁ Row = Old S₁ Row − (4/3) × (New x Row)',
        updatedRowIndex: 0,
        newRowValues: ['S₁','0','0','1','1/4','−1/4','−3/4','0','6'],
        colCalcs: {
          1: { why: 'Old x (4/3) minus 4/3 times New x (1) cancels to 0.', math: '4/3 − 4/3(1)', res: '0' },
          2: { why: 'Old y (0) minus 4/3 times New y (0).', math: '0 − 0', res: '0' },
          3: { why: 'Old S₁ (1) minus 4/3 times New S₁ (0).', math: '1 − 0', res: '1' },
          4: { why: 'Old S₂ (1/3) minus 4/3 times New S₂ (1/16).', math: '1/3 − (4/3)(1/16)', res: '1/4' },
          5: { why: 'Old A₁ (−1/3) minus 4/3 times New A₁ (−1/16).', math: '−1/3 − (4/3)(−1/16)', res: '−1/4' },
          6: { why: 'Old A₂ (0) minus 4/3 times New A₂ (9/16).', math: '0 − (4/3)(9/16)', res: '−3/4' },
          8: { why: 'Old Qty (12) minus 4/3 times New Qty (9/2).', math: '12 − (4/3)(9/2)', res: '6' }
        }
      },
      {
        label: 'Zero-out Row y',
        title: '3️⃣ Zero-out y Row (Row 2)',
        why: 'Old Row 2 (y) has a 2/9 in the x column. We must turn it into 0.',
        how: 'We subtract 2/9 times our new pivot row: 2/9 − 2/9 × 1 = 0.',
        formula: 'New y Row = Old y Row − (2/9) × (New x Row)',
        updatedRowIndex: 1,
        newRowValues: ['y','0','1','0','−1/8','1/8','−1/8','0','3'],
        colCalcs: {
          1: { why: 'Old x (2/9) minus 2/9 times New x (1) cancels to 0.', math: '2/9 − 2/9(1)', res: '0' },
          2: { why: 'Old y (1) minus 2/9 times New y (0).', math: '1 − 0', res: '1' },
          3: { why: 'Old S₁ (0) minus 2/9 times New S₁ (0).', math: '0 − 0', res: '0' },
          4: { why: 'Old S₂ (−1/9) minus 2/9 times New S₂ (1/16).', math: '−1/9 − (2/9)(1/16)', res: '−1/8' },
          5: { why: 'Old A₁ (1/9) minus 2/9 times New A₁ (−1/16).', math: '1/9 − (2/9)(−1/16)', res: '1/8' },
          6: { why: 'Old A₂ (0) minus 2/9 times New A₂ (9/16).', math: '0 − (2/9)(9/16)', res: '−1/8' },
          8: { why: 'Old Qty (4) minus 2/9 times New Qty (9/2).', math: '4 − (2/9)(9/2)', res: '3' }
        }
      },
      {
        label: 'Zero-out Obj',
        title: '4️⃣ Zero-out Objective Row',
        why: 'The bottom row has (−16k−370)/9 in the x column. We must turn it into a 0.',
        how: 'To cancel out this negative term, we add (16k+370)/9 times our new pivot row.',
        formula: 'New Obj = Old Obj + ((16k+370)/9) × (New x Row)',
        updatedRowIndex: 3,
        newRowValues: ['','0','0','0','−15/8','(8k+15)/8','(8k+185)/8','1','345'],
        colCalcs: {
          1: { why: 'Old x minus New x cancels to 0.', math: '(−16k−370)/9 + ((16k+370)/9)(1)', res: '0' },
          2: { why: 'Old y (0) plus (16k+370)/9 times New y (0).', math: '0 + 0', res: '0' },
          3: { why: 'Old S₁ (0) plus (16k+370)/9 times New S₁ (0).', math: '0 + 0', res: '0' },
          4: { why: 'Old S₂ plus new term.', math: '(−k−40)/9 + ((16k+370)/9)(1/16)', res: '−15/8' },
          5: { why: 'Old A₁ plus new term.', math: '(10k+40)/9 + ((16k+370)/9)(−1/16)', res: '(8k+15)/8' },
          6: { why: 'Old A₂ plus new term.', math: '0 + ((16k+370)/9)(9/16)', res: '(8k+185)/8' },
          8: { why: 'Old Qty plus new term.', math: '(−8k+160) + ((16k+370)/9)(9/2)', res: '345' }
        }
      }
    ]
  };

  const pivot3Config = {
    pivotNum: 3,
    pivotColName: 'S₂',
    pivotCol: 4,
    pivotRow: 0,
    pivotElement: '1/4',
    headers: ['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty'],
    initialRows: [
      ['S₁','0','0','1','1/4','−1/4','−3/4','0','6'],
      ['y','0','1','0','−1/8','1/8','−1/8','0','3'],
      ['x','1','0','0','1/16','−1/16','9/16','0','9/2'],
      ['','0','0','0','−15/8','(8k+15)/8','(8k+185)/8','1','345']
    ],
    steps: [
      {
        label: 'Goal',
        title: '🎯 The Goal of Pivot #3',
        why: 'Column S₂ is entering the Basis replacing S₁. We must turn the S₂ column from [1/4, −1/8, 1/16, −15/8] into [1, 0, 0, 0].',
        how: 'To do this: Multiply Row 1 by 4 to turn the pivot element into a 1. Then, clear out S₂ in y, x, and Objective rows using row operations.',
        updatedRowIndex: null
      },
      {
        label: 'Make Pivot = 1',
        title: '1️⃣ Make New Pivot Row (S₂ replaces S₁)',
        why: 'The pivot element is 1/4. To turn it into 1, we multiply Row 1 by 4.',
        how: 'Multiply every value in Row 1 by 4. The Basis changes from S₁ to S₂.',
        formula: 'New Row 1 = Old Row 1 × 4',
        updatedRowIndex: 0,
        newRowValues: ['S₂','0','0','4','1','−1','−3','0','24'],
        colCalcs: {
          1: { why: 'Old x (0) multiplied by 4.', math: '0 × 4', res: '0' },
          2: { why: 'Old y (0) multiplied by 4.', math: '0 × 4', res: '0' },
          3: { why: 'Old S₁ (1) multiplied by 4.', math: '1 × 4', res: '4' },
          4: { why: 'Old S₂ (1/4) multiplied by 4.', math: '1/4 × 4', res: '1' },
          5: { why: 'Old A₁ (−1/4) multiplied by 4.', math: '−1/4 × 4', res: '−1' },
          6: { why: 'Old A₂ (−3/4) multiplied by 4.', math: '−3/4 × 4', res: '−3' },
          8: { why: 'Old Qty (6) multiplied by 4.', math: '6 × 4', res: '24' }
        }
      },
      {
        label: 'Zero-out Row y',
        title: '2️⃣ Zero-out y Row (Row 2)',
        why: 'Old Row 2 (y) has −1/8 in the S₂ column. We must turn it into 0.',
        how: 'Since it is negative, we ADD 1/8 times our new pivot row: −1/8 + 1/8 × 1 = 0.',
        formula: 'New y Row = Old y Row + (1/8) × (New S₂ Row)',
        updatedRowIndex: 1,
        newRowValues: ['y','0','1','1/2','0','0','−1/2','0','6'],
        colCalcs: {
          1: { why: 'Old x (0) plus 1/8 times New x (0).', math: '0 + (1/8)(0)', res: '0' },
          2: { why: 'Old y (1) plus 1/8 times New y (0).', math: '1 + (1/8)(0)', res: '1' },
          3: { why: 'Old S₁ (0) plus 1/8 times New S₁ (4).', math: '0 + (1/8)(4)', res: '1/2' },
          4: { why: 'Old S₂ (−1/8) plus 1/8 times New S₂ (1) cancels.', math: '−1/8 + (1/8)(1)', res: '0' },
          5: { why: 'Old A₁ (1/8) plus 1/8 times New A₁ (−1).', math: '1/8 + (1/8)(−1)', res: '0' },
          6: { why: 'Old A₂ (−1/8) plus 1/8 times New A₂ (−3).', math: '−1/8 + (1/8)(−3)', res: '−1/2' },
          8: { why: 'Old Qty (3) plus 1/8 times New Qty (24).', math: '3 + (1/8)(24)', res: '6' }
        }
      },
      {
        label: 'Zero-out Row x',
        title: '3️⃣ Zero-out x Row (Row 3)',
        why: 'Old Row 3 (x) has 1/16 in the S₂ column. We must turn it into 0.',
        how: 'Subtract 1/16 times our new pivot row from old Row 3: 1/16 − 1/16 × 1 = 0.',
        formula: 'New x Row = Old x Row − (1/16) × (New S₂ Row)',
        updatedRowIndex: 2,
        newRowValues: ['x','1','0','−1/4','0','0','3/4','0','3'],
        colCalcs: {
          1: { why: 'Old x (1) minus 1/16 times New x (0).', math: '1 − (1/16)(0)', res: '1' },
          2: { why: 'Old y (0) minus 1/16 times New y (0).', math: '0 − (1/16)(0)', res: '0' },
          3: { why: 'Old S₁ (0) minus 1/16 times New S₁ (4).', math: '0 − (1/16)(4)', res: '−1/4' },
          4: { why: 'Old S₂ (1/16) minus 1/16 times New S₂ (1) cancels.', math: '1/16 − (1/16)(1)', res: '0' },
          5: { why: 'Old A₁ (−1/16) minus 1/16 times New A₁ (−1).', math: '−1/16 − (1/16)(−1)', res: '0' },
          6: { why: 'Old A₂ (9/16) minus 1/16 times New A₂ (−3).', math: '9/16 − (1/16)(−3)', res: '3/4' },
          8: { why: 'Old Qty (9/2) minus 1/16 times New Qty (24).', math: '9/2 − (1/16)(24)', res: '3' }
        }
      },
      {
        label: 'Zero-out Obj',
        title: '4️⃣ Zero-out Objective Row',
        why: 'The bottom row has −15/8 in the S₂ column. We must turn it into 0.',
        how: 'Add 15/8 times our new pivot row to the objective row.',
        formula: 'New Obj = Old Obj + (15/8) × (New S₂ Row)',
        updatedRowIndex: 3,
        newRowValues: ['','0','0','15/2','0','k','(2k+35)/2','1','390'],
        colCalcs: {
          1: { why: 'Old x (0) plus 15/8 times New x (0).', math: '0 + 0', res: '0' },
          2: { why: 'Old y (0) plus 15/8 times New y (0).', math: '0 + 0', res: '0' },
          3: { why: 'Old S₁ (0) plus 15/8 times New S₁ (4).', math: '0 + (15/8)(4)', res: '15/2' },
          4: { why: 'Old S₂ (−15/8) plus 15/8 times New S₂ (1) cancels.', math: '−15/8 + (15/8)(1)', res: '0' },
          5: { why: 'Old A₁ ((8k+15)/8) plus 15/8 times New A₁ (−1).', math: '(8k+15)/8 + (15/8)(−1)', res: 'k' },
          6: { why: 'Old A₂ ((8k+185)/8) plus 15/8 times New A₂ (−3).', math: '(8k+185)/8 + (15/8)(−3)', res: '(2k+35)/2' },
          8: { why: 'Old Qty (345) plus 15/8 times New Qty (24).', math: '345 + (15/8)(24)', res: '390' }
        }
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
          <SimplexPivotTeacher config={pivot1Config} />
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
          <SimplexPivotTeacher config={pivot2Config} />
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
          <SimplexPivotTeacher config={pivot3Config} />
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
