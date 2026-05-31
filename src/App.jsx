import { useState, useEffect, useRef } from 'react';
import SectionIntro from './sections/SectionIntro';
import SectionConversion from './sections/SectionConversion';
import SectionTableau from './sections/SectionTableau';
import SectionDriveK from './sections/SectionDriveK';
import SectionPivot from './sections/SectionPivot';
import SectionSolution from './sections/SectionSolution';
import SectionExam from './sections/SectionExam';

const SECTIONS = [
  { id: 'intro', label: 'Introduction', icon: '🚀' },
  { id: 'conversion', label: 'Step 1: Convert Constraints', icon: '🔄' },
  { id: 'tableau', label: 'Step 2: Build Tableau', icon: '📊' },
  { id: 'drivek', label: 'Step 3: Drive Out k', icon: '🎯' },
  { id: 'pivot', label: 'Steps 4–6: Pivoting', icon: '🔁' },
  { id: 'solution', label: 'Read the Solution', icon: '📖' },
  { id: 'exam', label: 'Final Exam', icon: '📝' },
];

export default function App() {
  const [completed, setCompleted] = useState(new Set());
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef([]);

  const handleComplete = (index) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
    if (index < SECTIONS.length - 1) {
      setActiveSection(index + 1);
      // Wait for React to render the new section before scrolling
      setTimeout(() => {
        sectionRefs.current[index + 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  };

  const progress = ((completed.size) / SECTIONS.length) * 100;

  const canAccess = (index) => {
    if (index === 0) return true;
    return completed.has(index - 1);
  };

  const handleNavClick = (index) => {
    if (canAccess(index)) {
      setActiveSection(index);
      setMenuOpen(false);
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-layout">
      {/* Mobile header */}
      <div className="mobile-header">
        <div className="mobile-header-brand">⚡ Big K</div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar overlay (mobile) */}
      <div className={`sidebar-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* Sidebar */}
      <nav className={`sidebar${menuOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">Big K</div>
          <div className="sidebar-subtitle">LP Maximization Reviewer</div>
        </div>
        <div className="sidebar-nav">
          {SECTIONS.map((s, i) => {
            const isCompleted = completed.has(i);
            const isActive = i === activeSection;
            const isLocked = !canAccess(i);
            let cls = 'nav-item';
            if (isCompleted) cls += ' completed';
            if (isActive && !isCompleted) cls += ' active';
            if (isLocked) cls += ' locked';
            return (
              <div key={s.id} className={cls} onClick={() => handleNavClick(i)}>
                <div className="nav-icon">
                  {isCompleted ? '✓' : isLocked ? '🔒' : i + 1}
                </div>
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-glass)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Progress: {Math.round(progress)}%
          <div style={{ height: 4, background: 'var(--bg-glass)', borderRadius: 2, marginTop: 8 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))', borderRadius: 2, transition: 'width 0.6s ease' }} />
          </div>
        </div>
      </nav>

      {/* Progress bar */}
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Main content */}
      <main className="main-content">
        <div ref={el => sectionRefs.current[0] = el}>
          <SectionIntro onComplete={() => handleComplete(0)} />
        </div>

        {canAccess(1) && (
          <div ref={el => sectionRefs.current[1] = el}>
            <div className="divider" />
            <SectionConversion onComplete={() => handleComplete(1)} />
          </div>
        )}

        {canAccess(2) && (
          <div ref={el => sectionRefs.current[2] = el}>
            <div className="divider" />
            <SectionTableau onComplete={() => handleComplete(2)} />
          </div>
        )}

        {canAccess(3) && (
          <div ref={el => sectionRefs.current[3] = el}>
            <div className="divider" />
            <SectionDriveK onComplete={() => handleComplete(3)} />
          </div>
        )}

        {canAccess(4) && (
          <div ref={el => sectionRefs.current[4] = el}>
            <div className="divider" />
            <SectionPivot onComplete={() => handleComplete(4)} />
          </div>
        )}

        {canAccess(5) && (
          <div ref={el => sectionRefs.current[5] = el}>
            <div className="divider" />
            <SectionSolution onComplete={() => handleComplete(5)} />
          </div>
        )}

        {canAccess(6) && (
          <div ref={el => sectionRefs.current[6] = el}>
            <div className="divider" />
            <SectionExam onComplete={() => handleComplete(6)} />
          </div>
        )}

        <div style={{ height: 80 }} />
      </main>
    </div>
  );
}
