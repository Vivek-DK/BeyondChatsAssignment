# BeyondChats Assignment – AI Article Scraper & Rewriter

## Project Description

This is a full-stack web application built as part of the BeyondChats technical assignment.

The system:
- Scrapes blog articles
- Stores them in MongoDB
- Searches Google for competing articles
- Scrapes competitor content
- Rewrites the original article using an LLM
- Publishes the rewritten article with citations
- Provides a React frontend for CRUD operations

The project is divided into **three phases** as required.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- Cheerio
- Serper.dev (Google Search API)
- OpenRouter / Gemma LLM

### Frontend
- React (Vite)
- Axios
- React Router DOM

---

## Complete Project Structure
beyondchats-assignment/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ │ └── articleController.js
│ │ ├── models/
│ │ │ └── Article.js
│ │ ├── routes/
│ │ │ └── articleRoutes.js
│ │ ├── services/
│ │ │ ├── rewriteArticleService.js
│ │ │ └── llm/
│ │ │ ├── llmClient.js
│ │ │ └── rewritePrompt.js
│ │ └── index.js
│ │
│ ├── scripts/
│ │ ├── beyondchatsScraper.js
│ │ ├── googleSearch.js
│ │ └── scrapeArticleContent.js
│ │
│ ├── .env
│ ├── package.json
│ └── package-lock.json
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ └── articles.js
│ │ ├── components/
│ │ │ ├── ArticleCard.jsx
│ │ │ ├── CreateArticle.jsx
│ │ │ └── EditArticle.jsx
│ │ ├── pages/
│ │ │ ├── ArticleList.jsx
│ │ │ └── ArticleDetail.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ │
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
└── README.md

---

## Environment Variables

Create a `.env` file inside the **backend** directory:
MONGO_URL=your_mongodb_connection_string
SERPER_API_KEY=your_serper_api_key
OPENROUTER_API_KEY=your_llm_api_key


---

## Phase 1 – Scraping & CRUD APIs

### Features
- Scrapes the **5 oldest articles** from BeyondChats
- Extracts title, content, author, date, and source URL
- Stores articles in MongoDB
- Provides full CRUD operations

### API Endpoints
POST /api/articles
GET /api/articles
GET /api/articles/:id
PUT /api/articles/:id
DELETE /api/articles/:id

---

## Phase 2 – AI Rewrite Pipeline

### Rewrite Endpoint
POST /api/articles/:id/rewrite


### Rewrite Flow

1. Fetch article from MongoDB
2. Search article title on Google using Serper.dev
3. Extract top 2 competitor blog/article links
4. Scrape main readable content from competitor pages
5. Rewrite original article using LLM
6. Append references section
7. Save rewritten content to MongoDB

### Safeguards
- Blocks forums, marketplaces, videos, feeds
- Skips thin or blocked competitor pages
- Prevents rewriting short content
- Always cites reference links

---

## Phase 3 – React Frontend

### Features
- List articles
- View article details
- Create article (modal with blur background)
- Edit article content
- Delete article
- Rewrite article using AI
- Loading indicators for rewrite & delete
- Status labels (Original / Rewritten)
- Displays competitor references

### Routes
/ -> Article list
/article/:id -> Article details

---

## Database Schema

Article {
title: String
content: String
author: String
publishedAt: String
sourceUrl: String
rewrittenContent: String
rewrittenAt: Date
competitorLinks: [String]
createdAt: Date
updatedAt: Date
}


---

## Running the Project (Git Bash)

### Backend

cd backend
npm install
npm start


Runs at:


---

### Frontend

cd frontend
npm install
npm run dev

Runs at:


---

## Key Design Decisions

- URL-based competitor filtering
- Scraping determines content validity
- Defensive error handling at every stage
- Clear separation of concerns
- Production-style rewrite pipeline

---

## Future Improvements

- Background job queue for AI rewriting
- Retry logic for blocked pages
- Markdown rendering in UI
- Authentication & authorization
- Dockerized deployment

---

## Final Notes

This project demonstrates:
- Real-world web scraping
- AI-assisted content rewriting
- REST API design
- React-based content management UI

All assignment phases have been implemented successfully.

