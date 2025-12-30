import { useEffect, useState } from "react";
import { getArticles, deleteArticle, rewriteArticle } from "../api/articles";
import CreateArticle from "./CreateArticle";
import EditArticle from "../components/EditArticle";
import ArticleCard from "../components/ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const [rewritingId, setRewritingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchArticles = () => {
    setLoading(true);
    getArticles()
      .then(res => setArticles(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;

    try {
      setDeletingId(id);
      await deleteArticle(id);
      fetchArticles();
    } finally {
      setDeletingId(null);
    }
  };

  const handleRewrite = async (id) => {
    if (!window.confirm("Rewrite this article?")) return;

    try {
      setRewritingId(id);
      await rewriteArticle(id);
      fetchArticles();
    } catch {
      alert("Rewrite failed");
    } finally {
      setRewritingId(null);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  const blur = showCreate || editingArticle;

  return (
    <>
      <div
        style={{
          maxWidth: 900,
          margin: "40px auto",
          filter: blur ? "blur(4px)" : "none",
          transition: "0.2s"
        }}
      >
        <h1>Articles</h1>

        <button onClick={() => setShowCreate(true)} style={{ marginBottom: 20 }}>
          + Create Article
        </button>

        {articles.map(article => (
          <ArticleCard
            key={article._id}
            article={article}
            onEdit={setEditingArticle}
            onRewrite={handleRewrite}
            onDelete={handleDelete}
            isRewriting={rewritingId === article._id}
            isDeleting={deletingId === article._id}
          />
        ))}
      </div>

      {showCreate && (
        <Modal onClose={() => setShowCreate(false)}>
          <CreateArticle
            onSuccess={() => {
              setShowCreate(false);
              fetchArticles();
            }}
          />
        </Modal>
      )}

      {editingArticle && (
        <Modal onClose={() => setEditingArticle(null)}>
          <EditArticle
            article={editingArticle}
            onSaved={() => {
              setEditingArticle(null);
              fetchArticles();
            }}
            onCancel={() => setEditingArticle(null)}
          />
        </Modal>
      )}
    </>
  );
}

/* Reusable modal */
function Modal({ children, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          width: "100%",
          maxWidth: 600
        }}
      >
        {children}
      </div>
    </div>
  );
}
