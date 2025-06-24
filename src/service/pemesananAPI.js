import axios from 'axios';

const API_URL = "https://qcaxdmwqvijffnxihbhd.supabase.co/rest/v1/pemesanan";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjYXhkbXdxdmlqZmZueGloYmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDEyMDgsImV4cCI6MjA2NjI3NzIwOH0.xwnyXRpDaa4dWN9-9AiOSD1W1pkCUr4dhLc6WJnZk4U" // jangan tampilkan ke publik di real project

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const pemesananAPI = {
  async fetchPemesanan() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createPemesanan(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async getAllPemesanan() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async deletePemesanan(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  async updatePemesanan(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return response.data;
  },

  async getPemesananById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}&select=*`, { headers });
    return response.data[0];
  },
};
