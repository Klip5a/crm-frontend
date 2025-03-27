import react from "@vitejs/plugin-react";
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
});
