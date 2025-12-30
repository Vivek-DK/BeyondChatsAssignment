import { useState } from "react";
import { updateArticle } from "../api/articles";

export default function EditArticle({ article, onSaved, onCancel }) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await updateArticle(article._id, {
        title,
        content
      });
      onSaved();
    } catch (err) {
      alert("Failed to update article");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h3>Edit Article</h3>

      <label>Author</label>
      <input
        value={article.author || "Unknown"}
        disabled
        style={{ width: "100%", marginBottom: 10 }}
      />

      <label>Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <label>Content</label>
      <textarea
        rows="8"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", resize: "none"}}
        
      />

      <div style={{ marginTop: 15 }}>
        <button onClick={handleUpdate} disabled={saving}>
          {saving ? "Updating..." : "Update"}
        </button>

        <button
          onClick={onCancel}
          style={{ marginLeft: 10 }}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
