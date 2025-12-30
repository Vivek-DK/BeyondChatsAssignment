import axios from "axios";
import { load } from "cheerio";

function normalizeUrl(url) {
  const mirrorDomains = [
    "medium.com",
    "chatbotsmagazine.com",
  ];

  if (mirrorDomains.some(d => url.includes(d))) {
    return `https://r.jina.ai/${url}`;
  }

  return url;
}

export async function scrapeArticleContent(url) {
  const finalUrl = normalizeUrl(url);

  console.log("Fetching:", finalUrl); // DEBUG — do NOT remove yet

  const { data } = await axios.get(finalUrl, {
    timeout: 15000,
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  // If using readable mirror, return directly
  if (finalUrl.startsWith("https://r.jina.ai/")) {
    if (typeof data !== "string" || data.trim().length === 0) {
      throw new Error("Readable mirror returned empty content");
    }

    return data.trim();
  }

  // Fallback HTML parsing (won’t run for these domains)
  const $ = load(data);
  $("script, style, nav, footer, header, aside, noscript").remove();

  let content = "";
  $("article p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 60) {
      content += text + "\n\n";
    }
  });

  if (content.length < 500) {
    throw new Error("Failed to extract content");
  }

  return content.trim();
}
