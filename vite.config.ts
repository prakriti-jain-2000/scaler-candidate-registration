import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const BASE_PATH = "sales-hiring-home";

// After build, ALSO expose the assets directory at /sales-hiring-home/assets/
// so URLs referenced by index.html (which uses Vite `base`) resolve to real files
// — both on lovable.app and when proxied through CloudFront at scaler.com/sales-hiring-home.
// index.html stays at the build root so the SPA fallback can serve it for any route.
function mirrorAssetsUnderBasePath(): Plugin {
  return {
    name: "mirror-assets-under-base-path",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const assetsSrc = path.join(distDir, "assets");
      if (!fs.existsSync(assetsSrc)) return;

      const targetDir = path.join(distDir, BASE_PATH);
      const assetsDest = path.join(targetDir, "assets");
      fs.mkdirSync(targetDir, { recursive: true });
      if (fs.existsSync(assetsDest)) {
        fs.rmSync(assetsDest, { recursive: true, force: true });
      }
      // Recursive copy (Node 16.7+)
      fs.cpSync(assetsSrc, assetsDest, { recursive: true });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: `/${BASE_PATH}/`,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode !== "development" && mirrorAssetsUnderBasePath(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
