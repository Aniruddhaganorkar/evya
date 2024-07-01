import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'default';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'default';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
