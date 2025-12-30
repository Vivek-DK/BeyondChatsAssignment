import axios from "axios";

const API_BASE = "http://localhost:8080"; // change if needed

async function fetchOriginalArticle() {
  const res = await axios.get(`${API_BASE}/articles`);
  const articles = res.data;

  const original = articles.find(a => !a.isUpdated);
  if (!original) {
    throw new Error("No original article found");
  }

  return original;
}
export default fetchOriginalArticle;
  
fetchOriginalArticle()
  .then(article => {
    console.log("Fetched article:", article.title);
  })
  .catch(console.error);
