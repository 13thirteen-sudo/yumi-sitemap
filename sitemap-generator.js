import fs from "fs";
import fetch from "node-fetch";

async function generate() {
  const res = await fetch("https://journal.yumi.co.uk/wp-json/wp/v2/posts?per_page=100&_embed");
  const posts = await res.json();

  const xmlItems = posts.map((post) => {
    return `
  <url>
    <loc>https://yumi.co.uk/pages/journal/${post.slug}</loc>
    <lastmod>${post.modified || post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems.join("\n")}
</urlset>`;

  fs.writeFileSync("sitemap.xml", sitemap);
}

generate();
