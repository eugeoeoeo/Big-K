import { useState } from 'react';
import { loginUser, signupUser } from './supabase';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const fn = mode === 'login' ? loginUser : signupUser;
    const result = await fn(username, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      localStorage.setItem('bigk_user', JSON.stringify(result.user));
      onLogin(result.user);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)',
        padding: 40, width: '100%', maxWidth: 400, backdropFilter: 'blur(12px)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 800,
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>⚡ Big K</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
            LP Maximization Reviewer
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Username</label>
            <input
              className="quiz-input" type="text" value={username}
              onChange={e => setUsername(e.target.value)} placeholder="Enter username"
              autoComplete="username" style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Password</label>
            <input
              className="quiz-input" type="password" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="Enter password"
              autoComplete="current-password" style={{ marginBottom: 0 }}
            />
          </div>

          {error && (
            <div style={{
              background: 'var(--accent-rose-glow)', border: '1px solid rgba(244,63,94,0.3)',
              borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 16,
              fontSize: '0.85rem', color: '#fca5a5',
            }}>{error}</div>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading || !username || !password}
            style={{ width: '100%', justifyContent: 'center', padding: '14px 24px' }}>
            {loading ? '...' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {mode === 'login' ? (
            <>No account? <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => { setMode('signup'); setError(''); }}>Sign up</span></>
          ) : (
            <>Have an account? <span style={{ color: 'var(--accent-blue)', cursor: 'pointer' }} onClick={() => { setMode('login'); setError(''); }}>Log in</span></>
          )}
        </div>
      </div>
    </div>
  );
}
