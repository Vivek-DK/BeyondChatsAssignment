import mongoose from "mongoose";
import dotenv from "dotenv";
import scrapeBeyondChats from "./scrapeLogic.js";
import Article from "../src/models/Article.js";

dotenv.config();

async function runScraper() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connection established");

    const articles = await scrapeBeyondChats();
    console.log(`Scraped ${articles.length} articles`);

    for (const article of articles) {
      const exists = await Article.findOne({
        sourceUrl: article.sourceUrl,
      });

      if (exists) {
        console.log(`Skipping duplicate: ${article.title}`);
        continue;
      }

      await Article.create({
        title: article.title,
        content: article.content,
        author: article.author,
        sourceUrl: article.sourceUrl,
        isUpdated: false,
      });

      console.log(`Inserted: ${article.title}`);
    }

    await mongoose.connection.close();
    console.log("Scraping completed. DB connection closed.");
  } catch (error) {
    console.error("Scraper failed:", error);
    process.exit(1);
  }
}

runScraper();
