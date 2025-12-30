import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, rewriteArticle } from "../api/articles";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(id.trim())
      .then(res => setArticle(res.data))
      .finally(() => setLoading(false));
  }, [id]);


  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h1>{article.title}</h1>

      <p style={{ color: "#555", marginTop: -10 }}>
        Author: <strong>{article.author || "Unknown"}</strong>
      </p>

      <h3>Original Article</h3>
      <p style={{ whiteSpace: "pre-wrap" }}>
        {article.content}
      </p>

      {article.rewrittenContent && (
        <>
          <hr />
          <h3>Rewritten Article</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {article.rewrittenContent}
          </p>

          {article.competitorLinks?.length > 0 && (
            <>
              <h4>References</h4>
              <ul>
                {article.competitorLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
