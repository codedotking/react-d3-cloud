import { defineConfig } from "vite";
import { resolve } from 'path'
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "./lib/react-d3-cloud",
      formats: ["es"],
      // the proper extensions will be added
      fileName: 'index',
    },
  },
});
