import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_REACT_APP_SUPABASE_URL!;
const supabaseKey: string = import.meta.env.VITE_REACT_APP_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
