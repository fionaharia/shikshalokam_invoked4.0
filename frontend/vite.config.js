import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  server: {
    fs: {
      // Allow serving files from the entire project root.
      allow: [path.resolve(__dirname)],
    },
  },
  build:{
    rollupOptions: {
      external: ['i18next'],
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
