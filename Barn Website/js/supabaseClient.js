import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://nuksrawjlmfktyoumlhq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51a3NyYXdqbG1ma3R5b3VtbGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDk3MjEsImV4cCI6MjA2NTIyNTcyMX0.t5luWEGYz-xo4VJT6kXumX-2-IHyF1N5ZTIMLHZePzM';
export const supabase = createClient(supabaseUrl, supabaseKey);
