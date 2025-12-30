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

The project is divided into three phases:
- Phase 1: Scraping, storage, and CRUD APIs
- Phase 2: Google search, competitor scraping, AI rewriting
- Phase 3: React frontend

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


## 🗂️ Project Structure

```

## 🗂️ Project Structure

```
backend/
├── node/
│   ├── log/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── db.js
│   ├── package.json
│   └── .env
│
├── python/
│   ├── chatbot/
│   ├── Face_Shape/
│   ├── models/
│   ├── static/
│   ├── Trained_models/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
frontend/
├── src/
├── public/
└── package.json
```
---

## Environment Variables

Create a .env file inside the backend directory:

MONGO_URL=your_mongodb_connection_string  
SERPER_API_KEY=your_serper_api_key  
OPENROUTER_API_KEY=your_llm_api_key  

---

## API Endpoints

POST    /api/articles  
GET     /api/articles  
GET     /api/articles/:id  
PUT     /api/articles/:id  
DELETE  /api/articles/:id  
POST    /api/articles/:id/rewrite  

---

## Running the Project (Git Bash)

### Backend

cd backend  
npm install  
npm start  

Backend runs on http://localhost:8080

### Frontend

cd frontend  
npm install  
npm run dev  

Frontend runs on http://localhost:5173

---

## Notes

- Competitor articles are filtered to avoid forums, feeds, and non-blog pages
- Scraping failures are handled gracefully
- Rewritten articles always include reference links
- Clean separation of backend, scripts, and frontend layers

---

## Status

All assignment phases implemented successfully.
