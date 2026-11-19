import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const SITE_URL = "https://kattula-pavan-kumar.vercel.app";

// Add new routes here when pages are added to src/App.tsx.
const SITEMAP_ROUTES: { path: string; changefreq?: string; priority?: number }[] = [
  { path: "/", changefreq: "monthly", priority: 1.0 },
];

// Generates dist/sitemap.xml on every build with lastmod = build date.
function sitemap(): Plugin {
  return {
    name: "generate-sitemap",
    apply: "build",
    generateBundle() {
      const lastmod = new Date().toISOString().split("T")[0];
      const urls = SITEMAP_ROUTES.map(
        ({ path, changefreq, priority }) =>
          [
            "  <url>",
            `    <loc>${SITE_URL}${path}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            changefreq && `    <changefreq>${changefreq}</changefreq>`,
            priority !== undefined && `    <priority>${priority.toFixed(1)}</priority>`,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
      ).join("\n");

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
});
