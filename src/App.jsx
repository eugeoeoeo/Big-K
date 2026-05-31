import { useState, useRef, useEffect } from 'react';
import Login from './Login';
import { loadProgress, saveProgress, deleteProgress, deleteAllProgress } from './supabase';
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

const SECTION_COMPONENTS = [SectionIntro, SectionConversion, SectionTableau, SectionDriveK, SectionPivot, SectionSolution, SectionExam];

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bigk_user')); } catch { return null; }
  });
  const [completed, setCompleted] = useState(new Set());
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [retakeKeys, setRetakeKeys] = useState({});
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef([]);

  // Load progress from Supabase on login
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadProgress(user.id).then(set => {
      setCompleted(set);
      setLoading(false);
    });
  }, [user]);

  const handleLogin = (u) => setUser(u);

  const handleLogout = () => {
    localStorage.removeItem('bigk_user');
    setUser(null);
    setCompleted(new Set());
    setActiveSection(0);
    setRetakeKeys({});
  };

  const handleComplete = (index) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
    if (user) saveProgress(user.id, index);
    if (index < SECTIONS.length - 1) {
      setActiveSection(index + 1);
      setTimeout(() => {
        sectionRefs.current[index + 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
  };

  const handleRetake = (index) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
    if (user) deleteProgress(user.id, index);
    setRetakeKeys(prev => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
    setActiveSection(index);
    setMenuOpen(false);
    setTimeout(() => {
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  const handleResetAll = () => {
    setCompleted(new Set());
    if (user) deleteAllProgress(user.id);
    setRetakeKeys({});
    setActiveSection(0);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user) return <Login onLogin={handleLogin} />;
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading progress...</div>;

  const progress = ((completed.size) / SECTIONS.length) * 100;
  const canAccess = (i) => i === 0 || completed.has(i - 1);

  return (
    <div className="app-layout">
      <div className="mobile-header">
        <div className="mobile-header-brand">⚡ Big K</div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`sidebar-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />

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
              <div key={s.id} className={cls} style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}
                  onClick={() => canAccess(i) && (setActiveSection(i), setMenuOpen(false), sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' }))}>
                  <div className="nav-icon">{isCompleted ? '✓' : isLocked ? '🔒' : i + 1}</div>
                  <span>{s.label}</span>
                </div>
                {isCompleted && (
                  <button onClick={(e) => { e.stopPropagation(); handleRetake(i); }} title="Retake"
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', padding: '4px 8px', borderRadius: 4 }}>↺</button>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-glass)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 6 }}>Progress: {Math.round(progress)}%</div>
          <div style={{ height: 4, background: 'var(--bg-glass)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))', borderRadius: 2, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            👤 {user.username}
            <span style={{ color: 'var(--accent-blue)', cursor: 'pointer', marginLeft: 'auto' }} onClick={handleLogout}>Log out</span>
          </div>
          {completed.size > 0 && (
            <button onClick={handleResetAll}
              style={{ marginTop: 8, background: 'none', border: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.72rem', padding: '5px 10px', borderRadius: 6, cursor: 'pointer', width: '100%' }}>
              ↺ Reset All
            </button>
          )}
        </div>
      </nav>

      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <main className="main-content">
        {SECTIONS.map((s, i) => {
          if (!canAccess(i) && !completed.has(i)) return null;
          const Comp = SECTION_COMPONENTS[i];
          return (
            <div key={s.id} ref={el => sectionRefs.current[i] = el}>
              {i > 0 && <div className="divider" />}
              <Comp key={`${s.id}-${retakeKeys[i] || 0}`} onComplete={() => handleComplete(i)} />
            </div>
          );
        })}
        <div style={{ height: 80 }} />
      </main>
    </div>
  );
}
