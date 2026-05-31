import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, LockedContinueBtn, Tableau } from '../components';

export default function SectionTableau({ onComplete }) {
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState({});
  const mark = (k) => setSolved(s => ({ ...s, [k]: true }));
  const count = Object.keys(solved).length;
  const total = 5;

  return (
    <Section badge="Step 2 of 6" title="Constructing the Simplex Tableau"
      intro="Now we put our equations into a neat table — the simplex tableau. Think of it like a spreadsheet where all the math happens.">

      <StepCard label="Step 2.1" title="What is a Simplex Tableau?">
        <p className="step-text">A tableau is an <strong>organized table</strong> of numbers from our equations. Each row = one equation, each column = one variable.</p>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {step >= 1 && (
        <StepCard label="Step 2.2" title="How Big is Our Table?">
          <div className="grid-2">
            <div className="step-card" style={{ margin: 0, padding: 20 }}>
              <div style={{ color: 'var(--accent-blue)', fontWeight: 700, marginBottom: 8 }}>📏 Rows = equations</div>
              <p className="step-text" style={{ margin: 0 }}><strong>4 equations → 4 rows</strong></p>
            </div>
            <div className="step-card" style={{ margin: 0, padding: 20 }}>
              <div style={{ color: 'var(--accent-purple)', fontWeight: 700, marginBottom: 8 }}>📐 Columns = variables + 2</div>
              <p className="step-text" style={{ margin: 0 }}><strong>7 variables + 2 = 9 columns</strong></p>
            </div>
          </div>
          <TipCard type="shortcut"><strong>Quick formula:</strong> Rows = equations. Columns = variables + 2 (for Basis + Qty).</TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 2.3" title="Basis Column">
          <p className="step-text">The <strong>Basis</strong> shows which variable "owns" each row — it's the variable we added during conversion:</p>
          <TipCard type="remember">
            • Row 1 (≤): Basis = <strong>S₁</strong><br/>
            • Row 2 (≥): Basis = <strong>A₁</strong><br/>
            • Row 3 (=): Basis = <strong>A₂</strong><br/>
            • Row 4: No basis (objective row)
          </TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 2.4" title="Filling Each Row">
          <p className="step-text">Read the number in front of each variable. If it doesn't appear, write <strong>0</strong>.</p>
          <Tableau title="Row 1: 2x + 3y + S₁ = 24" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['S₁','2','3','1','0','0','0','0','24']]} objRowIndex={-1} />
          <Tableau title="Row 2: 2x + 9y − S₂ + A₁ = 36" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['A₁','2','9','0','−1','1','0','0','36']]} objRowIndex={-1} />
          <Tableau title="Row 3: 2x + y + A₂ = 12" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['A₂','2','1','0','0','0','1','0','12']]} objRowIndex={-1} />
          <Tableau title="Objective: −50x − 40y + kA₁ + kA₂ + Z = 0" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[['','−50','−40','0','0','k','k','1','0']]} objRowIndex={0} />
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <StepCard label="Step 2.5" title="Complete Pre-Tableau 1" highlight>
          <Tableau title="Pre-Tableau 1" headers={['Basis','x','y','S₁','S₂','A₁','A₂','Z','Qty']}
            rows={[
              ['S₁','2','3','1','0','0','0','0','24'],
              ['A₁','2','9','0','−1','1','0','0','36'],
              ['A₂','2','1','0','0','0','1','0','12'],
              ['','−50','−40','0','0','k','k','1','0'],
            ]} />
          <div className="summary-box"><h3>🔑 Notice</h3><ul>
            <li>Each equation = one row</li><li>Basis = the variable we added (S₁, A₁, A₂)</li>
            <li>Qty = right-hand side numbers</li><li>Bottom row still has k — we remove that next!</li>
          </ul></div>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {step >= 5 && (
        <>
          <Quiz id="t1" question="How many ROWS does our tableau have?"
            options={['3 (one per constraint)','4 (3 constraints + 1 objective)','7 (one per variable)','9 (variables + 2)']} correctIndex={1}
            explanation="Each equation becomes a row: 3 constraints + 1 objective = 4 rows."
            wrongExplanations={{0:"Don't forget the objective function row!",2:"Variables determine COLUMNS, not rows.",3:"9 is the number of columns."}}
            hint="Count all equations, including the objective." onCorrect={() => mark('t1')} />

          <Quiz id="t2" question="How many COLUMNS does our tableau have?"
            options={['4','7','9','11']} correctIndex={2}
            explanation="7 variables (x, y, S₁, S₂, A₁, A₂, Z) + 2 (Basis + Qty) = 9."
            wrongExplanations={{0:"That's the number of rows.",1:"You forgot the Basis and Qty columns.",3:"Count again: x, y, S₁, S₂, A₁, A₂, Z = 7, plus Basis and Qty = 9."}}
            hint="Count all variables, then add 2." onCorrect={() => mark('t2')} />

          <Quiz id="t3" question={<>What number goes under S₂ for <M>{'2x + 9y - S_2 + A_1 = 36'}</M>?</>}
            options={['1','0','−1','9']} correctIndex={2}
            explanation="S₂ is SUBTRACTED, so its number is −1."
            wrongExplanations={{0:"Watch the sign! −S₂ means −1.",1:"S₂ does appear — it's subtracted.",3:"9 is for y, not S₂."}}
            hint="Look at the sign in front of S₂." onCorrect={() => mark('t3')} />

          <Quiz id="t4" question="What goes in the Basis column for a ≤ constraint row?"
            options={['The decision variable (x or y)','The slack variable (S)','The artificial variable (A)','Nothing']} correctIndex={1}
            explanation="For ≤, we added a slack variable S — that's the basis for that row."
            wrongExplanations={{0:"Decision variables aren't basis variables initially.",2:"Artificial variables are for ≥ and = rows.",3:"Every constraint row has a basis variable."}}
            hint="What variable did we ADD for ≤ constraints?" onCorrect={() => mark('t4')} />

          <Quiz id="t5" question="What goes in the Basis column for the objective row?"
            options={['Z','k','S₁','Nothing — it\'s left empty']} correctIndex={3}
            explanation="The objective row has no basis variable. It's left empty."
            wrongExplanations={{0:"Z appears in the row data but isn't the basis.",1:"k is just a large number, not a variable.",2:"S₁ is the basis for Row 1, not the objective."}}
            hint="Does the objective row 'belong' to any single variable?" onCorrect={() => mark('t5')} />

          <LockedContinueBtn onClick={onComplete} label="Next Lesson →" solvedCount={count} totalCount={total} />
        </>
      )}
    </Section>
  );
}
