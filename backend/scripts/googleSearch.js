import axios from "axios";

const SERPER_URL = "https://google.serper.dev/search";

export async function searchGoogle(query) {
  try {
    const response = await axios.post(
      SERPER_URL,
      {
        q: query,
        num: 10
      },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json"
        },
        timeout: 10000
      }
    );

    return response.data.organic || [];
  } catch (err) {
    throw new Error(
      `Google search failed: ${err.response?.status || err.message}`
    );
  }
}

export function extractTopArticles(results) {
  const blockedDomains = [
    "beyondchats.com",
    "youtube.com",
    "amazon.",
    "flipkart.",
    "reddit.com",
    "quora.com",
    "stackoverflow.com",
    "github.com"
  ];

  const valid = [];

  for (const item of results) {
    const url = item.link;
    if (!url) continue;

    // Domain blacklist
    if (blockedDomains.some(d => url.includes(d))) continue;

    // Reject files & feeds
    if (
      url.endsWith(".pdf") ||
      url.includes("/feed") ||
      url.includes("/tag/") ||
      url.includes("/category/")
    ) {
      continue;
    }

    // Must look like an article URL
    if (
      !url.includes("/blog") &&
      !url.includes("/article") &&
      !url.includes("/guide") &&
      !url.includes("/learn") &&
      !url.includes("medium.com")
    ) {
      continue;
    }

    valid.push(url);

    if (valid.length === 2) break;
  }

  if (valid.length < 2) {
    throw new Error("Not enough valid competitor articles found from Google");
  }

  return valid;
}
