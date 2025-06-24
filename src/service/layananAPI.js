import axios from 'axios'

const API_URL = "https://qcaxdmwqvijffnxihbhd.supabase.co/rest/v1/layanan"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjYXhkbXdxdmlqZmZueGloYmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDEyMDgsImV4cCI6MjA2NjI3NzIwOH0.xwnyXRpDaa4dWN9-9AiOSD1W1pkCUr4dhLc6WJnZk4U"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const layananAPI = {
    async fetchLayanan() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createLayanan(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },
    async deleteLayanan(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },
    async updateLayanan(id, data) {
        const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, {
        headers,
        });
        return response.data;
    },
    async getLayananById(id) {
      const response = await axios.get(`${API_URL}?id=eq.${id}&select=*`, { headers });
      return response.data[0]; // Ambil item pertama dari array hasil query
    },

}