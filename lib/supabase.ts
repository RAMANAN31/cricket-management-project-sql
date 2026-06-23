import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole =
  | 'athlete'
  | 'coach'
  | 'psychologist'
  | 'fitness_coach'
  | 'team_manager'
  | 'selector'
  | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  team_id?: string;
  sport?: string;
  created_at: string;
}
