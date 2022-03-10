import { createClient } from "@supabase/supabase-js";

import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://eivbdaaigzocwzacfroc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpdmJkYWFpZ3pvY3d6YWNmcm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ2NTQ4NTQsImV4cCI6MTk2MDIzMDg1NH0.J63edoltrnb1ic_NfMoVxrrJ3j9WOHaKBujBc-t-UZg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
});
