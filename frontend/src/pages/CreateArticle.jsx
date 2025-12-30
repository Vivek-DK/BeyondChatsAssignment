import { useState } from "react";
import { createArticle } from "../api/articles";

export default function CreateArticle({ onSuccess = () => {} }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !author.trim() ||
      !content.trim() ||
      !sourceUrl.trim()
    ) {
      return alert("All fields are required");
    }

    // URL validation
    try {
      new URL(sourceUrl);
    } catch {
      return alert("Enter a valid URL");
    }

    try {
      setLoading(true);

      await createArticle({
        title: title.trim(),
        author: author.trim(),
        content: content.trim(),
        sourceUrl: sourceUrl.trim()   
      });

      setTitle("");
      setAuthor("");
      setContent("");
      setSourceUrl("");

      onSuccess();
      alert("Article created successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        err.response?.data?.error ||
        "Failed to create article"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 20,
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        background: "#fff",
        paddingRight: 40,
      }}
    >
      <h3 style={{ marginBottom: 15 }}>Create Article</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 10
        }}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 10
        }}
      />

      <textarea
        placeholder="Content"
        rows="6"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          resize: "none"
        }}
      />

      <input
        type="url"
        placeholder="Source URL"
        value={sourceUrl}
        onChange={(e) => setSourceUrl(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 10
        }}
        required
      />
      
      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 12,
          padding: "8px 16px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
