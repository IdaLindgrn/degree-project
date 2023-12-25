import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.REACT_APP_SUPABASE_URL!;
const supabaseKey: string = import.meta.env.REACT_APP_ANON_KEY!;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
