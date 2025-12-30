import { Link } from "react-router-dom";

export default function ArticleCard({
  article,
  onEdit,
  onRewrite,
  onDelete,
  isRewriting,
  isDeleting
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 16,
        marginBottom: 16,
        borderRadius: 6,
        opacity: isDeleting ? 0.6 : 1
      }}
    >
      <h3>
        {article.title}
        {article.rewrittenContent && (
          <span
            style={{
              marginLeft: 10,
              fontSize: 12,
              padding: "2px 8px",
              background: "#e6f4ea",
              color: "#137333",
              borderRadius: 12
            }}
          >
            Rewritten
          </span>
        )}
      </h3>

      <p style={{ fontSize: 14, color: "#555" }}>
        Author: <strong>{article.author || "Unknown"}</strong>
      </p>

      <Link to={`/article/${article._id}`}>View Details</Link>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => onEdit(article)}>
          Edit
        </button>

        <button
          onClick={() => onRewrite(article._id)}
          disabled={isRewriting || isDeleting}
          style={{ marginLeft: 10 }}
        >
          {isRewriting ? "Rewriting..." : "Rewrite"}
        </button>

        <button
          onClick={() => onDelete(article._id)}
          disabled={isDeleting || isRewriting}
          style={{ marginLeft: 10 }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
