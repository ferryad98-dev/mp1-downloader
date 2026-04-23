import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Ganti dari swc ke babel biar stabil di Termux
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Paksa pake 0.0.0.0 biar gampang diakses browser HP
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    // componentTagger SUDAH DIHAPUS (Bebas Watermark!)
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));