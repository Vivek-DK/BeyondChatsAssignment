import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
