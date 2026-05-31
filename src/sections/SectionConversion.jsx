import { useState } from 'react';
import { Section, StepCard, M, TipCard, Quiz, ContinueBtn, LockedContinueBtn } from '../components';

export default function SectionConversion({ onComplete }) {
  const [step, setStep] = useState(0);
  const [solved, setSolved] = useState({});
  const mark = (k) => setSolved(s => ({ ...s, [k]: true }));
  const count = Object.keys(solved).length;
  const total = 6;

  return (
    <Section badge="Step 1 of 6" title="Converting the Constraints"
      intro="The simplex algorithm only works with equations (=), not inequalities (≤ or ≥). So first, we turn every constraint into an equation by adding helper variables.">

      <StepCard label="Step 1.1" title="Why Do We Need to Convert?">
        <p className="step-text">The simplex method solves <strong>equations</strong>, but our constraints use ≤ and ≥. We need to turn them into equations first.</p>
        <p className="step-text">We do this by adding helper variables:</p>
        <ul style={{ listStyle: 'none', marginBottom: 16 }}>
          <li style={{ padding: '6px 0', color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--accent-blue)' }}>Slack Variables (S)</strong> — fill the "gap" to make it equal</li>
          <li style={{ padding: '6px 0', color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--accent-purple)' }}>Artificial Variables (A)</strong> — temporary helpers that give the algorithm a starting point</li>
        </ul>
        {step === 0 && <ContinueBtn onClick={() => setStep(1)} />}
      </StepCard>

      {step >= 1 && (
        <StepCard label="Step 1.2 — Rule 1" title='For ≤ Constraints: Just ADD S'>
          <p className="step-text">When a constraint says "less than or equal to," there's <strong>room leftover</strong>. S fills that gap.</p>
          <div className="math-arrow"><M display>{'2x + 3y \\leq 24'}</M><span className="arrow">→</span><M display>{'2x + 3y + S_1 = 24'}</M></div>
          <TipCard type="shortcut"><strong>≤ = just add S.</strong> One variable, done.</TipCard>
          {step === 1 && <ContinueBtn onClick={() => setStep(2)} />}
        </StepCard>
      )}

      {step >= 2 && (
        <StepCard label="Step 1.3 — Rule 2" title='For ≥ Constraints: Subtract S, Add A'>
          <p className="step-text">With ≥, the value goes <strong>over</strong> the minimum. <strong>Subtract</strong> S (extra) and <strong>add</strong> A (starter).</p>
          <div className="math-arrow"><M display>{'2x + 9y \\geq 36'}</M><span className="arrow">→</span><M display>{'2x + 9y - S_2 + A_1 = 36'}</M></div>
          <TipCard type="shortcut"><strong>≥ = subtract S, add A.</strong> Two things.</TipCard>
          {step === 2 && <ContinueBtn onClick={() => setStep(3)} />}
        </StepCard>
      )}

      {step >= 3 && (
        <StepCard label="Step 1.4 — Rule 3" title='For = Constraints: Just Add A'>
          <p className="step-text">Already an equation — no gap. But still need A as a starter.</p>
          <div className="math-arrow"><M display>{'2x + y = 12'}</M><span className="arrow">→</span><M display>{'2x + y + A_2 = 12'}</M></div>
          {step === 3 && <ContinueBtn onClick={() => setStep(4)} />}
        </StepCard>
      )}

      {step >= 4 && (
        <StepCard label="Step 1.5" title="Rewrite the Objective Function with Big-K">
          <p className="step-text"><strong>1)</strong> Move everything left (signs flip):</p>
          <div className="math-arrow"><M display>{'Z = 50x + 40y'}</M><span className="arrow">→</span><M display>{'-50x - 40y + Z = 0'}</M></div>
          <p className="step-text"><strong>2)</strong> Add each artificial variable with huge number k:</p>
          <M display>{'-50x - 40y + kA_1 + kA_2 + Z = 0'}</M>
          <TipCard type="remember"><strong>Big K is a penalty.</strong> It forces the algorithm to remove artificial variables.</TipCard>
          {step === 4 && <ContinueBtn onClick={() => setStep(5)} />}
        </StepCard>
      )}

      {step >= 5 && (
        <StepCard label="Step 1.6 — Summary" title="Our Converted System" highlight>
          <div className="summary-box">
            <h3>✨ Complete System</h3>
            <M display>{'2x + 3y + S_1 = 24'}</M>
            <M display>{'2x + 9y - S_2 + A_1 = 36'}</M>
            <M display>{'2x + y + A_2 = 12'}</M>
            <M display>{'-50x - 40y + kA_1 + kA_2 + Z = 0'}</M>
          </div>
          <TipCard type="shortcut"><strong>3 rules:</strong> ≤ → +S &nbsp; ≥ → −S+A &nbsp; = → +A &nbsp; Objective → flip signs, add kA</TipCard>
          {step === 5 && <ContinueBtn onClick={() => setStep(6)} />}
        </StepCard>
      )}

      {step >= 6 && (
        <>
          <Quiz id="c1" question={<>Convert <M>{'5x + 3y \\leq 30'}</M></>}
            options={['5x + 3y + S = 30', '5x + 3y - S + A = 30', '5x + 3y + A = 30', '5x + 3y - S = 30']} correctIndex={0}
            explanation="≤ → just add S!" wrongExplanations={{1:"That's for ≥.",2:"A is only for ≥ and =.",3:"S is ADDED, not subtracted."}}
            hint="≤ is the simplest rule." onCorrect={() => mark('c1')} />

          <Quiz id="c2" question={<>Convert <M>{'4x + 2y \\geq 20'}</M></>}
            options={['4x + 2y + S = 20', '4x + 2y + A = 20', '4x + 2y - S + A = 20', '4x + 2y + S + A = 20']} correctIndex={2}
            explanation="≥ → subtract S, add A." wrongExplanations={{0:"That's for ≤.",1:"Missing the slack S.",3:"S should be SUBTRACTED."}}
            hint="≥ needs two things." onCorrect={() => mark('c2')} />

          <Quiz id="c3" question={<>Convert <M>{'x + 5y = 10'}</M></>}
            options={['x + 5y + S = 10', 'x + 5y + A = 10', 'x + 5y - S + A = 10', 'Already done, no change']} correctIndex={1}
            explanation="= → just add A. No slack needed since it's already equal." wrongExplanations={{0:"No slack for =. It's already exact.",2:"That's for ≥, not =.",3:"We still need an artificial variable for the algorithm to start."}}
            hint="= is already an equation. What's the only thing we add?" onCorrect={() => mark('c3')} />

          <Quiz id="c4" question="What does a slack variable (S) represent?"
            options={['A penalty for artificial variables','The leftover/gap in an inequality','The starting point for the algorithm','The objective function value']} correctIndex={1}
            explanation="S fills the gap between the left side and right side of an inequality."
            wrongExplanations={{0:"That's what Big K does.",2:"That's what artificial variables do.",3:"That's Z."}}
            hint="Think about what 'slack' means in everyday language." onCorrect={() => mark('c4')} />

          <Quiz id="c5" question="Why do we SUBTRACT the slack variable for ≥ constraints?"
            options={['Because ≥ means you have LESS than the limit','Because ≥ means you have MORE than the minimum — subtract the excess','Because subtraction makes the math easier','Because all slack variables are subtracted']} correctIndex={1}
            explanation="With ≥, the left side is OVER the minimum. The slack measures that excess, so we subtract it."
            wrongExplanations={{0:"≥ means MORE, not less.",2:"It's not about ease — it reflects the math.",3:"Only ≥ slacks are subtracted. ≤ slacks are added."}}
            hint="≥ means 'at least'. If you have more than the minimum, what's the extra?" onCorrect={() => mark('c5')} />

          <Quiz id="c6" question="If objective is Z = 10x + 5y with artificials A₁ and A₂, what's the rewritten form?"
            options={['-10x - 5y + Z = 0', '-10x - 5y + kA₁ + kA₂ + Z = 0', '10x + 5y + kA₁ + kA₂ + Z = 0', '-10x - 5y - kA₁ - kA₂ + Z = 0']} correctIndex={1}
            explanation="Move left (flip signs), add kA for each artificial, add Z, set = 0."
            wrongExplanations={{0:"You forgot the kA terms!",2:"Signs flip when moving left: 10x → −10x.",3:"k is POSITIVE (penalty), not negative."}}
            hint="Flip signs, k is always positive." onCorrect={() => mark('c6')} />

          <LockedContinueBtn onClick={onComplete} label="Next Lesson →" solvedCount={count} totalCount={total} />
        </>
      )}
    </Section>
  );
}
