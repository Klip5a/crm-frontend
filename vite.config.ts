import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react({})],
  server: {
    watch: {
      usePolling: true, // Включает поллинг файловой системы
    },
    hmr: {
      overlay: false, // Отключает всплывающее окно с ошибками в браузере
    },
  },
  resolve: {
    alias: {
      "@entities": path.resolve("", "src/entities"),
      "@features": path.resolve("", "src/features"),
      "@shared": path.resolve("", "src/shared"),
      "@pages": path.resolve("", "src/pages"),
      "@widgets": path.resolve("", "src/widgets"),
      "@app": path.resolve("", "src/app"),
      "@processes": path.resolve("", "src/processes"),
    },
  },
});
