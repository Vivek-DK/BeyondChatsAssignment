import axios from "axios";
import { load } from "cheerio";

const BASE_URL = "https://beyondchats.com/blogs/";

function getLastPageUrl(html) {
  const $ = load(html);
  let maxPage = 1;

  $("a.page-numbers").each((_, el) => {
    const href = $(el).attr("href");
    const match = href?.match(/\/page\/(\d+)\//);
    if (match) {
      maxPage = Math.max(maxPage-1, Number(match[1]));
    }
  });

  return `${BASE_URL}page/${maxPage}/`;
}

export async function scrapeArticle(articleUrl) {
  const { data: html } = await axios.get(articleUrl);
  const $ = load(html);

  $("footer, nav, aside, header, form").remove();

  const title = $("h1.elementor-heading-title").first().text().trim();

  const author =
    $("a span.elementor-icon-list-text").first().text().trim() || "Unknown";
const publishedAt =
  $('.elementor-post-info__item--type-date time').first().text().trim() || null;

  let content = "";

  $(".elementor-widget p, .elementor-widget h2, .elementor-widget h3").each(
    (_, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (text.length > 60) {
        content += text + "\n\n";
      }
    }
  );

  return {
    title,
    content: content.trim(),
    author,
    publishedAt,
    sourceUrl: articleUrl,
  };
}

export default async function scrapeBeyondChats() {
  // Fetch first page
  const { data: firstPageHtml } = await axios.get(BASE_URL);

  // Compute last page URL
  const lastPageUrl = getLastPageUrl(firstPageHtml);

  // Fetch last page
  const { data: lastPageHtml } = await axios.get(lastPageUrl);
  const $ = load(lastPageHtml);

  // Extract oldest article links
  const articleLinks = [];
  $("article h2.entry-title a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && articleLinks.length < 5) {
      articleLinks.push(href);
    }
  });

  // Scrape articles
  const articles = [];
  for (const url of articleLinks) {
    articles.push(await scrapeArticle(url));
  }

  return articles;
}
