import { marked } from "marked";

const modules = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  eager: true,
  import: "default",
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data = {};

  for (const line of frontmatter.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }
    data[key] = value;
  }

  return { data, content };
}

function parsePost(filePath, raw) {
  const { data, content } = parseFrontmatter(raw);
  const slug = filePath.replace("/content/blog/", "").replace(".md", "");
  const html = marked(content);
  return { ...data, slug, html };
}

export function getAllPosts() {
  return Object.entries(modules)
    .map(([path, raw]) => parsePost(path, raw))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${slug}.md`)
  );
  if (!entry) return null;
  return parsePost(entry[0], entry[1]);
}
