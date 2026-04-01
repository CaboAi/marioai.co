import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://marioai.co";
const CONTENT_DIR = path.resolve("content/blog");
const OUTPUT = path.resolve("dist/sitemap.xml");

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "monthly" },
  { url: "/blog", priority: "0.8", changefreq: "weekly" },
];

function getBlogPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8");
      const { data } = matter(raw);
      const slug = f.replace(".md", "");
      return {
        url: `/blog/${slug}`,
        lastmod: data.date || new Date().toISOString().split("T")[0],
        priority: "0.7",
        changefreq: "monthly",
      };
    });
}

function buildSitemap() {
  const posts = getBlogPosts();
  const allPages = [...staticPages, ...posts];
  const today = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, xml);
  console.log(`Sitemap generated: ${OUTPUT} (${allPages.length} URLs)`);
}

buildSitemap();
