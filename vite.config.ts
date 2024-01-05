import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(
    {
        plugins: [react()],
        resolve: {
            alias: {
                "@assets": "/src/assets"
            }
        },
        server: {
            proxy: {
                "/api/tmdb": {
                    target: "http://localhost:5002",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api\/tmdb/, "")
                }
            }
        }
    });