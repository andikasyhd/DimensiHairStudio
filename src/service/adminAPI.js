// service/adminAPI.js
import axios from "axios";

const API_URL = "https://qcaxdmwqvijffnxihbhd.supabase.co/rest/v1/admin";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjYXhkbXdxdmlqZmZueGloYmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDEyMDgsImV4cCI6MjA2NjI3NzIwOH0.xwnyXRpDaa4dWN9-9AiOSD1W1pkCUr4dhLc6WJnZk4U"; 

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
     Prefer: "return=representation",
}

export const adminAPI = {
  register: async ({ username, password }) => {
    const res = await axios.post(API_URL, { username, password }, { headers });
    return res.data[0]; // karena Prefer: return=representation
  },

  login: async ({ username, password }) => {
    const { data } = await axios.get(
      `${API_URL}?username=eq.${username}&password=eq.${password}`,
      { headers }
    );
    if (data.length === 0) throw new Error("Username atau password salah");
    return data[0];
  },
};
