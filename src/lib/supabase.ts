import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

// v1 uses local mock data; this client is ready for the schema in supabase/.
// When env vars are missing we export a null-safe placeholder.
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null
