import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ozyefewxntiytabcwstr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96eWVmZXd4bnRpeXRhYmN3c3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzM4MDAsImV4cCI6MjA1ODI0OTgwMH0.ierFSJTPWlSWkqLDsf1aSSjxOgMbLPrvQGMZmJ36ie8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
