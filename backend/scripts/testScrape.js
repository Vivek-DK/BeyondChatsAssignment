import dotenv from "dotenv";
import { scrapeArticleContent } from "./scrapeArticleContent.js";

dotenv.config();

const urls = [
  "https://chatbotsmagazine.com/the-complete-beginner-s-guide-to-chatbots-8280b7b906ca",
  "https://medium.com/@suraj_bansal/build-your-own-ai-chatbot-a-beginners-guide-to-rag-and-langchain-0189a18ec401",
];

async function test() {
  for (const url of urls) {
    const content = await scrapeArticleContent(url);
    console.log("URL:", url);
    console.log("Content length:", content.length);
    console.log(content.slice(0, 300));
    console.log("-----");
  }
}

test();
