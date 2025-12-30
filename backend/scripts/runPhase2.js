import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Article from "../src/models/Article.js";

import { searchGoogle, extractTopArticles } from "./googleSearch.js";
import { scrapeArticleContent } from "./scrapeArticleContent.js";
import { rewriteArticle } from "../src/services/rewriteArticleService.js";

const MONGO_URI = process.env.MONGO_URL;

async function run(articleId) {
  if (!articleId) {
    throw new Error("Article ID is required");
  }

  await mongoose.connect(MONGO_URI);
  console.log("DB connected");

  const article = await Article.findById(articleId);
  if (!article) {
    throw new Error("Article not found");
  }

  console.log(`Rewriting article: ${article.title}`);

  // 1. Google Search
  const searchResults = await searchGoogle(article.title);
  await delay(1500);

  // 2. Extract competitors
  const competitorLinks = extractTopArticles(searchResults);
  console.log("Competitor links:", competitorLinks);

  // 3. Scrape competitors
  const competitorContents = [];

  for (const link of competitorLinks) {
    try {
      const content = await scrapeArticleContent(link);
      competitorContents.push({ url: link, content });
      await delay(1500);
    } catch (err) {
      console.warn(`Skipping competitor: ${link}`);
    }
  }

  if (competitorContents.length === 0) {
    throw new Error("No competitor content available for rewrite");
  }

  // 4. Rewrite
  const rewritten = await rewriteArticle(article, competitorContents);

  const finalContent = `
${rewritten.rewrittenContent}

---

### References
${competitorLinks.map((u, i) => `${i + 1}. ${u}`).join("\n")}
  `.trim();

  // 5. Save
  article.rewrittenContent = finalContent;
  article.rewrittenAt = new Date();
  article.competitorLinks = competitorLinks;
  article.rewriteMeta = {
    model: "gemma-3-4b",
    temperature: 0.6
  };

  await article.save();

  console.log("Phase 2 completed successfully");
  await mongoose.disconnect();
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

const articleId = process.argv[2];
run(articleId).catch(err => {
  console.error("Phase 2 failed:", err.message);
  process.exit(1);
});
