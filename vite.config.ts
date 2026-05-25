import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const BASE_PATH = "sales-hiring-home";

// After build, move the entire dist output into a `sales-hiring-home/` subfolder
// so that hosting serves files at /sales-hiring-home/assets/... (matches Vite `base`).
// Also drops a tiny root index.html that redirects to /sales-hiring-home/ so the
// bare lovable.app URL still resolves to the app.
function nestUnderBasePath(): Plugin {
  return {
    name: "nest-under-base-path",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      if (!fs.existsSync(distDir)) return;
      const targetDir = path.join(distDir, BASE_PATH);
      fs.mkdirSync(targetDir, { recursive: true });

      for (const entry of fs.readdirSync(distDir)) {
        if (entry === BASE_PATH) continue;
        fs.renameSync(path.join(distDir, entry), path.join(targetDir, entry));
      }

      // Root redirect so `/` still lands on the app on the lovable.app domain.
      const redirectHtml = `<!doctype html><meta charset="utf-8"><title>Redirecting…</title><meta http-equiv="refresh" content="0; url=/${BASE_PATH}/"><link rel="canonical" href="/${BASE_PATH}/"><script>location.replace('/${BASE_PATH}/' + location.search + location.hash)</script>`;
      fs.writeFileSync(path.join(distDir, "index.html"), redirectHtml);
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
    mode !== "development" && nestUnderBasePath(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
