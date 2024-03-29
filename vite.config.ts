import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(
    {
        plugins: [svgr(), react()],
        build: { chunkSizeWarningLimit: 1600 },
        resolve: {
            alias: {
                "@assets": "/src/assets"
            }
        }
    });