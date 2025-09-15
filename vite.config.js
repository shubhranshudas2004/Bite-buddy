import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the warning limit (default = 500 KB)
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          // Split React into its own chunk
          react: ["react", "react-dom"],

          // Split common vendor libraries
          vendor: ["axios", "lodash", "chart.js"],

          // Example: if you use React Router
          router: ["react-router-dom"],
        },
      },
    },
  },
});
