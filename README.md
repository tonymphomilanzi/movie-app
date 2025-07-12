<div align="center">
  <br />
  <a href="" target="_blank">
  <img src="https://github.com/user-attachments/assets/5618142e-5002-4b0d-89dd-192b1f6d7e5a" alt="Movie App Banner" />
  </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/-TMDB_API-black?style=for-the-badge&logoColor=white&logo=themoviedatabase&color=01B4E4" alt="TMDB" />
  </div>

  <h3 align="center">Personal Build</h3>
  <p align="center">Search, browse, and watch trailers for the latest trending movies, all in one slick UI.</p>
</div>

---

## 📖 Overview

This is a **fully responsive movie browser app** built with **React** and powered by the **TMDB API**. It showcases trending films, genre filtering, real-time search, infinite scroll with auto-load, and trailers via YouTube. Animations are handled with **Framer Motion** for a smooth experience.

This project helped me explore:

- Real-world API integration (TMDB)
- Search debouncing & performance optimization
- Intersection Observer (infinite scroll)
- Tailwind-based UI design
- Component-based structure
- Motion animations and loading UX

---


---

## 🖼️ Screenshots

| Hero Banner + Search | Movie Grid + Genres | SideBar | Mobile View |

|----------------------|---------------------|----------------|
| ![Hero](screenshots/MOVIE_3.jpg) | ![Grid](screenshots/MOVIE_1.jpg) | ![SideBar](screenshots/MOVIE_3.jpg) |![Mobile](screenshots/MOVIE_2.jpg)

---

## 🛠 Tech Stack

- **React.js**
- **Tailwind CSS**
- **Framer Motion**
- **TMDB API**
- **React Intersection Observer**
- **Zustand (optional for state if used)**

---

##   Features

-  Real-time movie search 
-  Watch trailers in a modal
-  Genre-based filtering
-  Infinite scroll with auto-pagination
-  Motion animations on movie cards
-  Responsive design for mobile/tablet/desktop

---

## ⚡ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/tonymphomilanzi/movie-app.git

# 2. Navigate into the directory
cd movie-app

# 3. Install dependencies
npm install

# 4. Add your TMDB API key in .env
VITE_TMDB_API_KEY=your_tmdb_key_here

# 5. Run the development server
npm run dev
