import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import path from "path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Define `__dirname` in an ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "../chat-server/public"), // Build to Express public/
    emptyOutDir: true, // Clear previous build
  },
  server: {
    proxy: {
      "/api": "http://localhost", // API requests go to Express
      "/socket.io": {
        target: "http://localhost", // WebSockets go to Express
        ws: true, // Enable WebSocket support
      },
    },
  },
})
