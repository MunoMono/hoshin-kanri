import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/hoshin-kanri/",
  server: { open: "/hoshin-kanri/" },
  resolve: {
    alias: [{ find: /^~(.*)$/, replacement: "$1" }],
  },
});