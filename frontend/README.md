# Podcast Aggregator

A full-stack podcast aggregator application with a Node.js/Express backend and a React + Vite frontend. Users can register, log in, search for podcasts, and view podcast details.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend](#backend)
  - [Setup](#backend-setup)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Features
- User registration and authentication (JWT-based)
- Search podcasts via ListenNotes API and local MongoDB
- View all podcasts and podcast details
- Sample podcast data for demo/testing
- Modern React frontend with Redux state management

---

## Project Structure
```
podcast-aggregator/
  backend/        # Node.js/Express/MongoDB API
    src/
      models/     # Mongoose models (User, Podcast)
      routes/     # Express routes (auth, podcast)
      index.js    # App entry point
    package.json
  frontend/       # React + Vite app
    src/
      pages/      # Home, Login, Register
      slices/     # Redux slices
      store.js    # Redux store
    package.json
README.md         # Project overview (this file)
```

---

## Backend
Node.js, Express, MongoDB (Mongoose), JWT, ListenNotes API

### Backend Setup
1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   LISTEN_NOTES_API_KEY=your_listennotes_api_key
   ```
4. Start the server:
   ```bash
   node src/index.js
   ```
   The backend runs on `http://localhost:5000` by default.

### API Endpoints
- `POST   /api/auth/register` — Register a new user
- `POST   /api/auth/login` — Login and receive JWT
- `GET    /api/podcast/search?q=...` — Search podcasts (ListenNotes, with caching)
- `POST   /api/podcast/sample` — Add sample podcasts to DB
- `POST   /api/podcast/searchbar` — Search podcasts in local DB
- `GET    /api/podcast/all` — Get all podcasts from DB

---

## Frontend
React (with Vite), Redux Toolkit, Axios, React Router

### Frontend Setup
1. `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` by default.

---

## Environment Variables
- **Backend**: `.env` file in `backend/` for MongoDB URI, JWT secret, ListenNotes API key
- **Frontend**: No special environment variables required by default

---

## License
MIT
