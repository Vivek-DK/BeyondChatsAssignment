import dotenv from "dotenv";
import { searchGoogle, extractTopArticles } from "./googleSearch.js";

dotenv.config();

const title = "Chatbots Magic: Beginner’s";

async function test() {
  const results = await searchGoogle(title);
  const links = extractTopArticles(results);
  console.log(links);
}

test();
