import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://dtduvvlhqvnhdwdkcvic.supabase.co';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  '';

export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add your project URL and publishable key to .env.');
  }
  return supabase;
}

export async function fetchProfile(userId) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('profiles')
    .select('id, email, display_name, role, created_at')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, displayName) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('profiles')
    .update({ display_name: displayName })
    .eq('id', userId)
    .select('id, email, display_name, role, created_at')
    .single();
  if (error) throw error;
  return data;
}

export async function fetchAdminProfiles() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('profiles')
    .select('id, email, display_name, role, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchAnalyses(userId) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('analyses')
    .select('analysis')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map((row) => row.analysis);
}

export async function saveAnalysis(userId, analysis) {
  const client = requireSupabase();
  const { error } = await client
    .from('analyses')
    .upsert(
      {
        user_id: userId,
        analysis_id: analysis.id,
        analysis
      },
      { onConflict: 'user_id,analysis_id' }
    );
  if (error) throw error;
}
