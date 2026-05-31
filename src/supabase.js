import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kzanzzflulhfxudycquk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6YW56emZsdWxoZnh1ZHljcXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMTI0NzksImV4cCI6MjA5NTc4ODQ3OX0.REdJ22uPfGoYzB5ZjV0JkzSZwFfYhL3FeaVNpOpcVfs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Auth helpers ---

export async function loginUser(username, password) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error && error.code === 'PGRST116') {
    return { error: 'User not found. Click "Sign Up" to create an account.' };
  }
  if (error) return { error: error.message };
  if (data.password !== password) return { error: 'Wrong password.' };
  return { user: data };
}

export async function signupUser(username, password) {
  if (!username.trim() || !password.trim()) return { error: 'Username and password required.' };
  const { data, error } = await supabase
    .from('users')
    .insert({ username: username.trim(), password })
    .select()
    .single();
  if (error) {
    if (error.code === '23505') return { error: 'Username already taken.' };
    return { error: error.message };
  }
  return { user: data };
}

// --- Progress helpers ---

export async function loadProgress(userId) {
  const { data, error } = await supabase
    .from('section_progress')
    .select('section_index')
    .eq('user_id', userId)
    .eq('completed', true);
  if (error) return new Set();
  return new Set(data.map(r => r.section_index));
}

export async function saveProgress(userId, sectionIndex) {
  await supabase.from('section_progress').upsert({
    user_id: userId,
    section_index: sectionIndex,
    completed: true,
    completed_at: new Date().toISOString(),
  }, { onConflict: 'user_id,section_index' });
}

export async function deleteProgress(userId, sectionIndex) {
  await supabase.from('section_progress')
    .delete()
    .eq('user_id', userId)
    .eq('section_index', sectionIndex);
}

export async function deleteAllProgress(userId) {
  await supabase.from('section_progress')
    .delete()
    .eq('user_id', userId);
}
