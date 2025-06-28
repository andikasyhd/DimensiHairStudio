// src/service/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qcaxdmwqvijffnxihbhd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjYXhkbXdxdmlqZmZueGloYmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDEyMDgsImV4cCI6MjA2NjI3NzIwOH0.xwnyXRpDaa4dWN9-9AiOSD1W1pkCUr4dhLc6WJnZk4U";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
