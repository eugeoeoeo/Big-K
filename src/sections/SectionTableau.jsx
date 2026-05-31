import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, Tableau } from '../components';

export default function SectionTableau({ onComplete }) {
  const [step, setStep] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  return (
    <Section
      badge="Step 2 of 6"
      title="Constructing the Simplex Tableau"
      intro="Now we organize all our equations into a structured table — the simplex tableau. This table is where all the magic happens. Let's build it piece by piece."
    >
      {/* 2.1: What is a tableau? */}
      <StepCard label="Step 2.1" title="What is a Simplex Tableau?">
        <p className="step-text">
          A tableau is just an <strong>organized table</strong> that holds all the coefficients from our equations.
          Instead of writing equations over and over, we put everything in rows and columns so we can
          do row operations efficiently.
        </p>
        <TipCard type="tip">
          Think of it like a spreadsheet for your math. Each row is one equation, each column is one variable.
        </TipCard>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {/* 2.2: Dimensions */}
      {step >= 1 && (
        <StepCard label="Step 2.2" title="How Big is Our Table?">
          <p className="step-text">
            Let's figure out the size of our tableau:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '16px 0' }}>
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
                = Number of variables + 2<br/><strong>We have 7 variables → 9 columns</strong><br/>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>(+2 for "Basis" and "Qty")</span>
              </p>
            </div>
          </div>
          <p className="step-text">
            Our variables are: <M>{'x, y, S_1, S_2, A_1, A_2, Z'}</M> (7 total)<br/>
            Plus "Basis" column (left) and "Qty" column (right) = <strong>9 columns</strong>.
          </p>
          <TipCard type="shortcut">
            <strong>Quick formula:</strong> Rows = equations. Columns = variables + 2. That's it!
          </TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {/* 2.3: Column Headers */}
      {step >= 2 && (
        <StepCard label="Step 2.3" title="Setting Up the Column Headers">
          <p className="step-text">
            The columns are labeled with each variable, plus "Basis" on the left and "Qty" on the right:
          </p>
          <Tableau
            title="Column Headers"
            headers={['Basis', 'x', 'y', 'S₁', 'S₂', 'A₁', 'A₂', 'Z', 'Qty']}
            rows={[
              ['?', '', '', '', '', '', '', '', ''],
              ['?', '', '', '', '', '', '', '', ''],
              ['?', '', '', '', '', '', '', '', ''],
              ['', '', '', '', '', '', '', '', ''],
            ]}
          />
          <p className="step-text">
            Now, what goes in the <strong>Basis</strong> column? These are the variables that "start" in the solution.
            For each constraint row, the basis is the variable that has a coefficient of 1 in that row and 0 in all other rows.
          </p>
          <TipCard type="remember">
            For our problem:<br/>
            • Row 1 (from ≤): <strong>S₁</strong> is the basis (it was the variable we added)<br/>
            • Row 2 (from ≥): <strong>A₁</strong> is the basis (artificial variable we added)<br/>
            • Row 3 (from =): <strong>A₂</strong> is the basis (artificial variable we added)<br/>
            • Row 4: No basis — this is the objective row
          </TipCard>
          <TipCard type="tip">
            The basis variable is essentially the "identity" variable for that row — it has coefficient 1 in its own row and 0 everywhere else.
            Slack and artificial variables naturally have this property when we first set up.
          </TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {/* 2.4: Fill Row 1 */}
      {step >= 3 && (
        <StepCard label="Step 2.4" title="Filling Row 1 — From the ≤ Constraint">
          <p className="step-text">
            Our first equation is: <M>{'2x + 3y + S_1 = 24'}</M>
          </p>
          <p className="step-text">
            We just read off the coefficients for each variable. If a variable doesn't appear, its coefficient is <strong>0</strong>.
          </p>
          <div style={{ overflowX: 'auto', margin: '16px 0' }}>
            <table className="tableau" style={{ fontSize: '0.85rem' }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--accent-blue)', textAlign: 'left' }}>Variable:</td>
                  <td>x</td><td>y</td><td>S₁</td><td>S₂</td><td>A₁</td><td>A₂</td><td>Z</td><td>Qty</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--accent-emerald)', textAlign: 'left' }}>Coefficient:</td>
                  <td>2</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>24</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TipCard type="shortcut">
            Just read left to right: "2x means 2 under x, 3y means 3 under y, S₁ has 1, everything else is 0, and 24 goes under Qty."
          </TipCard>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {/* 2.5: Fill Row 2 */}
      {step >= 4 && (
        <StepCard label="Step 2.5" title="Filling Row 2 — From the ≥ Constraint">
          <p className="step-text">
            Second equation: <M>{'2x + 9y - S_2 + A_1 = 36'}</M>
          </p>
          <p className="step-text">
            Read off the coefficients. Notice <M>{'S_2'}</M> has a <strong>negative</strong> sign!
          </p>
          <div style={{ overflowX: 'auto', margin: '16px 0' }}>
            <table className="tableau" style={{ fontSize: '0.85rem' }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--accent-blue)', textAlign: 'left' }}>Variable:</td>
                  <td>x</td><td>y</td><td>S₁</td><td>S₂</td><td>A₁</td><td>A₂</td><td>Z</td><td>Qty</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--accent-emerald)', textAlign: 'left' }}>Coefficient:</td>
                  <td>2</td><td>9</td><td>0</td><td className="negative">−1</td><td>1</td><td>0</td><td>0</td><td>36</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TipCard type="mistake">
            Don't forget the <strong>negative sign</strong> on S₂! Since we SUBTRACTED it in the ≥ conversion, it's −1, not +1.
          </TipCard>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {/* 2.6: Fill Row 3 */}
      {step >= 5 && (
        <StepCard label="Step 2.6" title="Filling Row 3 — From the = Constraint">
          <p className="step-text">
            Third equation: <M>{'2x + y + A_2 = 12'}</M>
          </p>
          <div style={{ overflowX: 'auto', margin: '16px 0' }}>
            <table className="tableau" style={{ fontSize: '0.85rem' }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--accent-blue)', textAlign: 'left' }}>Variable:</td>
                  <td>x</td><td>y</td><td>S₁</td><td>S₂</td><td>A₁</td><td>A₂</td><td>Z</td><td>Qty</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--accent-emerald)', textAlign: 'left' }}>Coefficient:</td>
                  <td>2</td><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>12</td>
                </tr>
              </tbody>
            </table>
          </div>
          {step === 5 && <ContinueBtn onClick={() => setStep(6)} />}
        </StepCard>
      )}

      {/* 2.7: Objective Row */}
      {step >= 6 && (
        <StepCard label="Step 2.7" title="Filling the Objective Row">
          <p className="step-text">
            Objective equation: <M>{'-50x - 40y + kA_1 + kA_2 + Z = 0'}</M>
          </p>
          <div style={{ overflowX: 'auto', margin: '16px 0' }}>
            <table className="tableau" style={{ fontSize: '0.85rem' }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--accent-blue)', textAlign: 'left' }}>Variable:</td>
                  <td>x</td><td>y</td><td>S₁</td><td>S₂</td><td>A₁</td><td>A₂</td><td>Z</td><td>Qty</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: 'var(--accent-emerald)', textAlign: 'left' }}>Coefficient:</td>
                  <td className="negative">−50</td><td className="negative">−40</td><td>0</td><td>0</td><td className="highlight-cell">k</td><td className="highlight-cell">k</td><td>1</td><td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TipCard type="tip">
            Notice: the objective row has <strong>no basis variable</strong>. The basis column is left empty for this row.
            Also notice the <M>{'k'}</M> values under A₁ and A₂ — these are the Big-K penalties.
          </TipCard>
          {step === 6 && <ContinueBtn onClick={() => setStep(7)} />}
        </StepCard>
      )}

      {/* 2.8: Complete Pre-Tableau */}
      {step >= 7 && (
        <StepCard label="Step 2.8" title="The Complete Pre-Tableau 1" highlight>
          <p className="step-text">
            Putting it all together — here's our first simplex tableau!
          </p>
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
              <li>Each constraint equation maps to one row</li>
              <li>The Basis column shows which variable is "active" for that row (S₁, A₁, A₂)</li>
              <li>The Qty column shows the right-hand side values (24, 36, 12, 0)</li>
              <li>The objective row (bottom) still has <M>{'k'}</M> values — we need to remove those next!</li>
            </ul>
          </div>
          {step === 7 && <ContinueBtn onClick={() => setStep(8)} />}
        </StepCard>
      )}

      {/* QUIZ */}
      {step >= 8 && (
        <>
          <Quiz
            id="tab1"
            question="How do you determine the number of ROWS in a simplex tableau?"
            options={[
              'Number of variables',
              'Number of constraints only',
              'Number of equations (constraints + objective)',
              'Number of variables + 2',
            ]}
            correctIndex={2}
            explanation="Each equation (including the objective function) becomes one row in the tableau."
            wrongExplanations={{
              0: "Variables determine the number of COLUMNS, not rows.",
              1: "Close! But you also need a row for the objective function equation.",
              3: "That formula is for the number of COLUMNS (variables + 2 for Basis and Qty).",
            }}
            hint="Think about what goes in each row of the tableau."
          />
          <Quiz
            id="tab2"
            question={<>In our tableau, what coefficient goes under S₂ in the row for <M>{'2x + 9y - S_2 + A_1 = 36'}</M>?</>}
            options={['1', '0', '−1', '9']}
            correctIndex={2}
            explanation="S₂ is SUBTRACTED in the equation, so its coefficient is −1."
            wrongExplanations={{
              0: "Be careful with the sign! S₂ is subtracted (−S₂), so the coefficient is −1, not +1.",
              1: "S₂ does appear in this equation — it's being subtracted.",
              3: "9 is the coefficient of y, not S₂.",
            }}
            hint="Look at the sign in front of S₂ in the equation."
            onCorrect={() => setQuizDone(true)}
          />
          {quizDone && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🎉</div>
              <p className="step-text" style={{ textAlign: 'center' }}>
                <strong>Awesome!</strong> You can build a simplex tableau. Next, we need to remove those pesky k values.
              </p>
              <ContinueBtn onClick={onComplete} label="On to Step 3 →" />
            </div>
          )}
        </>
      )}
    </Section>
  );
}
