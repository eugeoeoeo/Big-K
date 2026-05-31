import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, Tableau } from '../components';

export default function SectionTableau({ onComplete }) {
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState({});
  const allDone = solved.tab1 && solved.tab2;

  return (
    <Section
      badge="Step 2 of 6"
      title="Constructing the Simplex Tableau"
      intro="Now we organize our equations into a neat table — the simplex tableau. Think of it like a spreadsheet where all the math happens."
    >
      <StepCard label="Step 2.1" title="What is a Simplex Tableau?">
        <p className="step-text">
          A tableau is just an <strong>organized table</strong> that holds all the numbers from our equations. 
          Instead of rewriting equations, we put the numbers in rows and columns to make math easier.
        </p>
        <TipCard type="tip">
          Think of it like a spreadsheet: each row = one equation, each column = one variable.
        </TipCard>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {step >= 1 && (
        <StepCard label="Step 2.2" title="How Big is Our Table?">
          <p className="step-text">First, figure out the size:</p>
          <div className="grid-2">
            <div className="step-card" style={{ margin: 0, padding: 20 }}>
              <div style={{ color: 'var(--accent-blue)', fontWeight: 700, marginBottom: 8 }}>📏 Rows</div>
              <p className="step-text" style={{ margin: 0 }}>
                = Number of equations<br/><strong>We have 4 equations → 4 rows</strong><br/>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>(3 constraints + 1 objective)</span>
              </p>
            </div>
            <div className="step-card" style={{ margin: 0, padding: 20 }}>
              <div style={{ color: 'var(--accent-purple)', fontWeight: 700, marginBottom: 8 }}>📐 Columns</div>
              <p className="step-text" style={{ margin: 0 }}>
                = Number of variables + 2<br/><strong>7 variables + 2 = 9 columns</strong><br/>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>(+2 for "Basis" and "Qty")</span>
              </p>
            </div>
          </div>
          <TipCard type="shortcut">
            <strong>Quick formula:</strong> Rows = equations. Columns = variables + 2. Done!
          </TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 2.3" title="Setting Up the Headers & Basis">
          <p className="step-text">
            Columns are labeled with each variable, plus "Basis" on the left and "Qty" on the right.
          </p>
          <p className="step-text">
            The <strong>Basis column</strong> shows which variable "owns" that row. Simply put — it's 
            the variable we added during conversion:
          </p>
          <TipCard type="remember">
            • Row 1 (from ≤): Basis = <strong>S₁</strong> (the slack we added)<br/>
            • Row 2 (from ≥): Basis = <strong>A₁</strong> (the artificial we added)<br/>
            • Row 3 (from =): Basis = <strong>A₂</strong> (the artificial we added)<br/>
            • Row 4: No basis — this is the objective row
          </TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 2.4" title="Filling Row 1 — From the ≤ Constraint">
          <p className="step-text">
            Equation: <M>{'2x + 3y + S_1 = 24'}</M>
          </p>
          <p className="step-text">
            Just read off the number in front of each variable. If a variable doesn't appear, write <strong>0</strong>.
          </p>
          <Tableau
            title="Row 1: reading from 2x + 3y + S₁ = 24"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[['S₁', '2', '3', '1', '0', '0', '0', '0', '24']]}
            objRowIndex={-1}
          />
          <TipCard type="shortcut">
            Just read left to right: "2x → put 2 under x, 3y → put 3 under y, S₁ → put 1, everything else → 0, and 24 goes under Qty."
          </TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <StepCard label="Step 2.5" title="Filling Row 2 — From the ≥ Constraint">
          <p className="step-text">
            Equation: <M>{'2x + 9y - S_2 + A_1 = 36'}</M>
          </p>
          <p className="step-text">Watch the signs! <M>{'S_2'}</M> is <strong>subtracted</strong>, so its number is <strong>−1</strong>.</p>
          <Tableau
            title="Row 2: reading from 2x + 9y − S₂ + A₁ = 36"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[['A₁', '2', '9', '0', '−1', '1', '0', '0', '36']]}
            objRowIndex={-1}
          />
          <TipCard type="mistake">
            Don't forget the <strong>negative sign</strong> on S₂! We subtracted it in the ≥ conversion, so it's −1, not +1.
          </TipCard>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {step >= 5 && (
        <StepCard label="Step 2.6" title="Filling Row 3 — From the = Constraint">
          <p className="step-text">Equation: <M>{'2x + y + A_2 = 12'}</M></p>
          <Tableau
            title="Row 3: reading from 2x + y + A₂ = 12"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[['A₂', '2', '1', '0', '0', '0', '1', '0', '12']]}
            objRowIndex={-1}
          />
          {step === 5 && <ContinueBtn onClick={() => setStep(6)} />}
        </StepCard>
      )}

      {step >= 6 && (
        <StepCard label="Step 2.7" title="Filling the Objective Row">
          <p className="step-text">Equation: <M>{'-50x - 40y + kA_1 + kA_2 + Z = 0'}</M></p>
          <Tableau
            title="Objective Row"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[['', '−50', '−40', '0', '0', 'k', 'k', '1', '0']]}
            objRowIndex={0}
          />
          <TipCard type="tip">
            The objective row has <strong>no basis variable</strong> — leave it empty. 
            Notice the <M>{'k'}</M> under A₁ and A₂ — those are the Big-K penalties.
          </TipCard>
          {step === 6 && <ContinueBtn onClick={() => setStep(7)} />}
        </StepCard>
      )}

      {step >= 7 && (
        <StepCard label="Step 2.8" title="The Complete Pre-Tableau 1" highlight>
          <p className="step-text">All rows together — our first tableau!</p>
          <Tableau
            title="Pre-Tableau 1"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[
              ['S₁', '2', '3', '1', '0', '0', '0', '0', '24'],
              ['A₁', '2', '9', '0', '−1', '1', '0', '0', '36'],
              ['A₂', '2', '1', '0', '0', '0', '1', '0', '12'],
              ['', '−50', '−40', '0', '0', 'k', 'k', '1', '0'],
            ]}
          />
          <div className="summary-box">
            <h3>🔑 Key Things to Notice</h3>
            <ul>
              <li>Each equation became one row</li>
              <li>Basis column = the variable we added for that row (S₁, A₁, A₂)</li>
              <li>Qty column = the right-hand side numbers (24, 36, 12, 0)</li>
              <li>The bottom row still has k values — we'll remove those next!</li>
            </ul>
          </div>
          {step === 7 && <ContinueBtn onClick={() => setStep(8)} />}
        </StepCard>
      )}

      {step >= 8 && (
        <>
          <Quiz
            id="tab1"
            question="How do you figure out the number of ROWS in a simplex tableau?"
            options={['Count the variables', 'Count only the constraints', 'Count all equations (constraints + objective)', 'Count the variables + 2']}
            correctIndex={2}
            explanation="Each equation (constraints AND objective) becomes one row."
            wrongExplanations={{0: "Variables decide the COLUMNS, not rows.", 1: "Close, but you also need a row for the objective function.", 3: "That's for COLUMNS (variables + 2 for Basis and Qty)."}}
            hint="What goes in each row of the tableau?"
            onCorrect={() => setSolved(s => ({...s, tab1: true}))}
          />
          <Quiz
            id="tab2"
            question={<>What number goes under S₂ in the row for <M>{'2x + 9y - S_2 + A_1 = 36'}</M>?</>}
            options={['1', '0', '−1', '9']}
            correctIndex={2}
            explanation="S₂ is SUBTRACTED, so its number is −1."
            wrongExplanations={{0: "Watch the sign! S₂ is subtracted (−S₂), so it's −1, not +1.", 1: "S₂ does appear — it's being subtracted.", 3: "9 is the number for y, not S₂."}}
            hint="Look at the sign in front of S₂."
            onCorrect={() => setSolved(s => ({...s, tab2: true}))}
          />
          {allDone && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🎉</div>
              <p className="step-text" style={{ textAlign: 'center' }}>
                <strong>Awesome!</strong> You can build a simplex tableau. Now let's get rid of those k values.
              </p>
              <ContinueBtn onClick={onComplete} label="On to Step 3 →" />
            </div>
          )}
        </>
      )}
    </Section>
  );
}
