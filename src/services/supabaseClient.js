import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (
  import.meta.env.VITE_SUPABASE_URL ||
  'https://dtduvvlhqvnhdwdkcvic.supabase.co'
).trim();
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  ''
).trim();

function isLegacyAnonKey(key) {
  const payload = key.split('.')[1];
  if (!key.startsWith('eyJ') || !payload) return false;

  try {
    const claims = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return claims.role === 'anon';
  } catch {
    return false;
  }
}

const isSupportedSupabaseKey =
  supabaseKey.startsWith('sb_publishable_') || isLegacyAnonKey(supabaseKey);

export const supabaseConfigurationError = !supabaseUrl
  ? 'Add VITE_SUPABASE_URL to your local .env file.'
  : !supabaseKey
    ? 'Add VITE_SUPABASE_PUBLISHABLE_KEY to your local .env file.'
    : !isSupportedSupabaseKey
      ? 'Use the Supabase publishable key or legacy anon key in your local .env file. Never use a secret or service-role key in the browser.'
      : '';
export const supabaseConfigured = !supabaseConfigurationError;
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

function requireSupabase() {
  if (!supabase) {
    throw new Error(supabaseConfigurationError || 'Supabase is not configured.');
  }
  return supabase;
}

export async function fetchProfile(userId) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('profiles')
    .select('id, email, display_name, avatar_url, role, created_at')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, displayName, avatarUrl) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('profiles')
    .update({ display_name: displayName, avatar_url: avatarUrl })
    .eq('id', userId)
    .select('id, email, display_name, avatar_url, role, created_at')
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
