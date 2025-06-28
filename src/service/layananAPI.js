// src/service/layananAPI.js
import { supabase } from "./supabaseClient";

const BUCKET_NAME = "layanan";

export const layananAPI = {
  async fetchLayanan() {
    const { data, error } = await supabase
      .from("layanan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createLayanan(data) {
    const { error } = await supabase.from("layanan").insert(data);
    if (error) throw error;
  },

  async deleteLayanan(id) {
    const { error } = await supabase.from("layanan").delete().eq("id", id);
    if (error) throw error;
  },

  async updateLayanan(id, data) {
    const { error } = await supabase.from("layanan").update(data).eq("id", id);
    if (error) throw error;
  },

  async getLayananById(id) {
    const { data, error } = await supabase
      .from("layanan")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

     // Upload gambar ke Supabase Storage dan ambil public URL-nya
  async uploadGambar(file) {
    if (!file) throw new Error("File tidak ditemukan");

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file ke bucket
    const { error: uploadError } = await supabase
      .storage
      .from(BUCKET_NAME)
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    // Ambil URL publik
    const { data, error: urlError } = supabase
      .storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    if (urlError) {
      console.error("Public URL error:", urlError);
      throw urlError;
    }

    return data.publicUrl;
  },

  // Simpan data layanan ke tabel 'layanan'
  async createLayanan(data) {
    const { error } = await supabase
      .from("layanan")
      .insert([data]);

    if (error) {
      console.error("Insert error:", error);
      throw error;
    }
  },
};