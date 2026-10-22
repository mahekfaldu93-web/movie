# 🎬 CineVault — Modern Movie Library Web Application

<p align="center">
  <strong>A premium, responsive movie catalog, discovery, and custom library platform built with React 18, Vite, Redux Toolkit, React Router v7, Bootstrap 5, and The Movie Database (TMDB) API.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6.4.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-2.2.0-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/React%20Router-7.1.0-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap 5" />
  <img src="https://img.shields.io/badge/TMDB%20API-v3-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB" />
  <img src="https://img.shields.io/badge/Theme-Electric%20Blue-0070F3?style=for-the-badge" alt="Theme" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
   - [Movie Addition Engine (+ Add Movie)](#-movie-addition-engine--add-movie)
   - [Movie Discovery & Browsing](#-movie-discovery--browsing)
   - [Debounced Instant Search](#-debounced-instant-search)
   - [In-Depth Movie Details](#-in-depth-movie-details-movieid)
   - [Personal Library Management](#-personal-library-management)
   - [Client-Side Authentication](#-client-side-authentication-demo)
3. [Technology Stack](#-technology-stack)
4. [Complete Folder Structure](#-complete-folder-structure)
5. [Architecture & State Management](#-architecture--state-management)
6. [TMDB API & Smart Fallback Engine](#-tmdb-api--smart-fallback-engine)
7. [Getting Started & Installation](#-getting-started--installation)
8. [Environment Variables](#-environment-variables)
9. [Application Routes](#-application-routes)
10. [Authentication & Demo Credentials](#-authentication--demo-credentials)
11. [UI/UX Design System](#-uiux-design-system)
12. [Attribution & Disclaimer](#-attribution--disclaimer)

---

## 🌟 Project Overview

**CineVault** is an enterprise-grade, single-page movie streaming and discovery platform with custom movie publishing capabilities. It empowers movie lovers to explore trending theatrical releases, contribute their own custom films, search across thousands of movies, inspect deep metadata (financials, directors, cast headshots, and embedded YouTube trailers), and maintain a personalized library of **Favorites** and **Watchlist** queues with seamless state persistence.

The application adheres to clean architecture principles:
- **Separation of Concerns**: Decoupled API services, normalized Redux slices, custom hooks, reusable atomic UI components, and dedicated page views.
- **Flawless User Experience**: Fully responsive 12-column layouts, skeleton loading placeholders, high-contrast readable typography on a deep sapphire blue palette, and cyan hover micro-animations.
- **Production Resilience**: Features an authentic TMDB CDN fallback engine, ensuring that all poster art, backdrops, and movie details load instantly out-of-the-box even without an API key or during network downtime.
- **Custom Content Publishing**: Users can add, edit, preview, and delete custom movies with local image uploads and YouTube trailers.

---

## ⚡ Key Features

### 🎬 Movie Addition Engine (+ Add Movie)
- **Direct Navbar Access**: Instant `+ Add Movie` button accessible from any page with live custom movie counter.
- **Comprehensive Creation Form**:
  - **Metadata**: Movie title, tagline, release date, runtime (in minutes), and director.
  - **Interactive Rating Slider**: Intuitive score selection from 1.0 to 10.0 with live score badge.
  - **Multi-Genre Selector**: Toggleable interactive genre pills (Action, Adventure, Sci-Fi, Drama, Thriller, etc.).
  - **Cast Management**: Comma-separated actor inputs parsed into dedicated cast profiles.
  - **Storyline**: Rich multi-line synopsis input with validation.
  - **Poster & Backdrop Artwork**: Support for pasting web URLs or **uploading local image files directly** (encoded via `FileReader` data URLs).
  - **YouTube Trailer Embedding**: Paste video URL or ID to watch trailers directly in the app.
- **1-Click Inspiration Presets**: Pre-configured sample movie templates (*Cyberpunk 2099*, *Shadows of Varanasi*, *Chronicles of Solaria*) to populate the form with a single click.
- **Live Real-Time Card Preview**: Side-by-side interactive card preview reflecting changes as you type.
- **Full Library Integration**: Custom movies appear seamlessly in the home feed, catalog, search index, favorites, and watchlist, marked with a distinctive **`★ Custom`** badge.
- **Deletion Support**: One-click removal of custom movies directly from the card or movie details page.

### 🌐 Movie Discovery & Browsing
- **Dynamic Hero Banner**: Features trending movies with high-resolution backdrops, rating, release year, tagline, and direct CTA buttons.
- **Trending & Popular Feeds**: Paginated lists fetching real-time global box-office hits and weekly trending titles.
- **Genre Pill Filter**: Instant filtering across all standard TMDB genres.
- **Smart Poster Fallback**: Integrated official TMDB image CDN with placeholder fallbacks so cards never show broken images.

### 🔍 Debounced Instant Search
- **Live Search**: Debounced search query bar avoids redundant API requests.
- **Query Suggestions**: Popular search query chips (e.g. *Avatar*, *Batman*, *Oppenheimer*, *Inception*).
- **Instant Reset**: One-click clear search button and Enter key form submission.
- **Custom Movies Matching**: Searches across official titles as well as user-added movies.

### 📄 In-Depth Movie Details (`/movie/:id`)
- **Full-Resolution Artwork**: Cinematic backdrop header with dark gradient blending and crisp 2:3 poster card.
- **Comprehensive Metadata**: Taglines, status, runtime in hours & minutes, release dates, spoken languages, and vote counts.
- **Box Office Financials**: Accurate currency formatting for movie Budget and Revenue figures.
- **Director & Cast Credits**: Horizontal scrollable cast cards featuring high-res actor headshots and character names.
- **YouTube Trailer Modal**: Watch official promotional trailers inline via responsive video modal.
- **Related Recommendations**: "You Might Also Like" section for discovering similar titles.

### 💖 Personal Library Management
- **Favorites Collection (`/favorites`)**: Add or remove movies with instant Redux state updates, badge counters in the navbar, and `localStorage` persistence.
- **Watchlist Queue (`/watchlist`)**: Save films for future viewing with dedicated queue management.
- **Quick Action Badges**: Clickable heart (Favorite) and bookmark (Watchlist) buttons directly on every movie card with event propagation protection.

### 🔐 Client-Side Authentication (Demo)
- **User Sign Up & Sign In**: Form validation, clean feedback alerts, and session storage.
- **Show/Hide Password**: Convenient visibility toggle button.
- **"Fill Demo Login"**: One-click autofill with preset demo credentials for instant evaluation.
- **Protected Routes**: Restricts access to `/favorites` and `/watchlist` for unauthenticated visitors and automatically redirects back after login.
- **Interactive User Menu**: Header dropdown displaying active user name, email, quick library counts, and clean logout handler.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework & Core** | React 18.3 | Modern functional components with hooks (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`) |
| **Build Tool** | Vite 6.4 | Extremely fast HMR development server and Rollup production bundler |
| **State Management** | Redux Toolkit (RTK) | Centralized Redux store, normalized slices, and `createAsyncThunk` for asynchronous API calls |
| **Routing** | React Router v7 | Declarative client-side routing, protected route wrappers, and dynamic parameter parsing |
| **API Client** | Axios | Configured HTTP instance with request interceptors, timeout handling, and TMDB base URLs |
| **Styling & Grid** | Bootstrap 5.3 + Custom CSS | Modern Glassmorphic Cinema Theme in Electric Sapphire Blue & Cyan |
| **Icons** | Lucide React | High-performance, lightweight SVG icons |
| **Data Provider** | The Movie Database (TMDB) | Official REST API v3 for movies, credits, genres, videos, and image assets |

---

## 📁 Complete Folder Structure

```text
movie-library-app/
├── public/
│   ├── movie-icon.svg             # Application browser favicon
│   └── vite.svg                   # Vite asset
├── src/
│   ├── assets/
│   │   └── logo.svg               # CineVault vector brand logo
│   ├── components/                # Reusable UI building blocks
│   │   ├── ErrorMessage.jsx       # Alert banner with API configuration guides & retry actions
│   │   ├── Footer.jsx             # Accessible footer with navigation, library links & credits
│   │   ├── LoadingSpinner.jsx     # Shimmer skeleton loaders and spinner states
│   │   ├── MovieCard.jsx          # Reusable 2:3 movie card with poster, rating & action buttons
│   │   ├── MovieGrid.jsx          # Responsive auto-fill CSS grid container for movie cards
│   │   ├── Navbar.jsx             # Top navigation with active links, counts & user profile menu
│   │   ├── Pagination.jsx         # Dynamic page buttons with ellipsis for large catalogs
│   │   ├── ProtectedRoute.jsx     # Authentication route guard with redirect memory
│   │   └── SearchBar.jsx          # Debounced input with search icon and clear action
│   ├── hooks/                     # Custom React Hooks
│   │   ├── useAppDispatch.js      # Typed wrapper for useDispatch
│   │   └── useAppSelector.js      # Typed wrapper for useSelector
│   ├── pages/                     # Full-page route views
│   │   ├── AddMovie.jsx           # Custom movie addition page with live preview & presets
│   │   ├── Favorites.jsx          # Saved user favorite movies with remove actions
│   │   ├── Home.jsx               # Hero section, trending carousel, popular grid & genres
│   │   ├── Login.jsx              # Sign-in form with demo autofill and validations
│   │   ├── MovieDetails.jsx       # Deep metadata, director, financials, cast & trailer modal
│   │   ├── Movies.jsx             # Comprehensive paginated movie catalog & My Added Movies tab
│   │   ├── NotFound.jsx           # Custom 404 page with return to home action
│   │   ├── Register.jsx           # Registration form with full client validation
│   │   ├── Search.jsx             # Search results page with suggestions & query stats
│   │   └── Watchlist.jsx          # Personal watchlist queue with remove actions
│   ├── redux/                     # Redux Toolkit State Management
│   │   ├── slices/
│   │   │   ├── authSlice.js       # User session, login, register, logout & persistence
│   │   │   ├── favoritesSlice.js  # Add/remove favorites & localStorage sync
│   │   │   ├── moviesSlice.js     # Thunks for movies + custom movie CRUD actions
│   │   │   └── watchlistSlice.js  # Add/remove watchlist & localStorage sync
│   │   └── store.js               # Central store configuration combining all slice reducers
│   ├── services/                  # External API integration layer
│   │   ├── api.js                 # Axios instance with TMDB base URL & interceptors
│   │   ├── movieService.js        # API endpoints with automatic TMDB CDN & custom movie merge
│   │   └── tmdbFallbackData.js    # Curated TMDB CDN dataset (posters, backdrops, cast, trailers)
│   ├── utils/                     # Helper utilities and constants
│   │   ├── constants.js           # TMDB image URLs, image sizes, and local storage keys
│   │   └── storage.js             # Safe localStorage getters, setters, and removers
│   ├── App.css                    # Component-specific styles, glassmorphism, hero gradients & modals
│   ├── App.jsx                    # Root application component with route definitions
│   ├── index.css                  # Global design tokens, Electric Blue palette & typography
│   └── main.jsx                   # React DOM entry point wrapped with Redux Provider & BrowserRouter
├── .env.example                   # Template for environment variables
├── .gitignore                     # Git ignore rules for node_modules, dist, and .env
├── index.html                     # HTML5 shell with Google Inter & Outfit fonts
├── package.json                   # Project dependencies, scripts, and package metadata
├── README.md                      # Comprehensive project documentation
└── vite.config.js                 # Vite bundler configuration
```

---

## 🧠 Architecture & State Management

CineVault uses **Redux Toolkit (RTK)** for centralized, predictable state management.

```
                      ┌──────────────────────┐
                      │    Redux Store       │
                      │  (src/redux/store.js) │
                      └──────────┬───────────┘
                                 │
         ┌───────────────────────┼───────────────────────┬───────────────────────┐
         ▼                       ▼                       ▼                       ▼
 ┌───────────────┐       ┌───────────────┐       ┌───────────────┐       ┌───────────────┐
 │  authSlice    │       │  moviesSlice  │       │favoritesSlice │       │watchlistSlice │
 ├───────────────┤       ├───────────────┤       ├───────────────┤       ├───────────────┤
 │• user         │       │• customMovies │       │• items: []    │       │• items: []    │
 │• isAuthenticated      │• popular      │       │• localStorage │       │• localStorage │
 │• login/logout │       │• trending     │       │  sync         │       │  sync         │
 │• localStorage │       │• movieDetails │       └───────────────┘       └───────────────┘
 └───────────────┘       │• searchResults│
                         │• genres       │
                         │• add/delete   │
                         └───────────────┘
```

---

## 🌐 TMDB API & Smart Fallback Engine

The application integrates **The Movie Database (TMDB) API v3** via `src/services/api.js` and `src/services/movieService.js`.

### Official Endpoints Used:
- `GET /movie/popular` — Global popular titles
- `GET /trending/movie/week` — Trending titles across the week
- `GET /movie/{id}` — Deep movie details, runtime, release date, and financials
- `GET /movie/{id}/credits` — Cast members and directors
- `GET /movie/{id}/videos` — Official YouTube video keys
- `GET /movie/{id}/similar` — Recommended similar movies
- `GET /search/movie` — Search movies by title
- `GET /genre/movie/list` — Genre identifiers

### 🛡️ Smart Fallback Engine (`tmdbFallbackData.js`):
To prevent blank screens or broken experiences when an API key is missing or when developing offline, CineVault includes an integrated **TMDB CDN Fallback Engine**:
- Uses **real TMDB CDN image paths** (`https://image.tmdb.org/t/p/...`) which are publicly accessible without authentication.
- Contains authentic high-resolution backdrops, posters, cast headshots, and YouTube trailer keys for popular titles (*Dune: Part Two*, *Oppenheimer*, *Deadpool & Wolverine*, *Interstellar*, *Barbie*, *Spider-Man*, *Inception*, etc.).
- Seamlessly falls back to local data on HTTP 401/404 or network error, ensuring a 100% reliable evaluation experience.

---

## 🚀 Getting Started & Installation

### 1. Prerequisites
- **Node.js**: `v18.0.0` or later (`v20+` recommended)
- **npm**: `v9.0.0` or later

### 2. Clone or Navigate to the Project Root
```bash
cd movie_library_app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to:
**`http://localhost:3000/`** (or the port indicated in your terminal)

### 5. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.

### 6. Preview Production Build
```bash
npm run preview
```

---

## 🔑 Environment Variables

To connect CineVault to your live TMDB account:

1. Copy the `.env.example` file to create `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your 32-character TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_actual_tmdb_api_key_here
   ```
3. Restart the development server.

> [!NOTE]
> Even if you do not set an API key, CineVault will function seamlessly using its built-in TMDB CDN dataset.

---

## 🗺️ Application Routes

| Path | Component | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Home.jsx` | Public | Hero banner, trending movies, popular feed, and genre chips |
| `/movies` | `Movies.jsx` | Public | Full paginated movie catalog & "My Added Movies" tab |
| `/trending` | `Movies.jsx` | Public | Weekly trending movie showcase |
| `/search` | `Search.jsx` | Public | Debounced search with live results and suggestion chips |
| `/add-movie` | `AddMovie.jsx` | Public | Custom movie creator with file upload, trailer, and live preview |
| `/movie/:id` | `MovieDetails.jsx` | Public | In-depth metadata, cast headshots, financials, and trailer modal |
| `/favorites` | `Favorites.jsx` | **Protected (Auth)** | Saved personal favorite movies |
| `/watchlist` | `Watchlist.jsx` | **Protected (Auth)** | Personal movie watchlist queue |
| `/login` | `Login.jsx` | Public | User sign-in with 1-click demo credential autofill |
| `/register` | `Register.jsx` | Public | New account registration with input validations |
| `*` | `NotFound.jsx` | Public | 404 page with return-to-home button |

---

## 🔐 Authentication & Demo Credentials

> [!IMPORTANT]
> The authentication system in `src/redux/slices/authSlice.js` is designed **strictly for client-side demonstration**. User sessions and registered accounts are safely stored in browser `localStorage`.
> For production deployment, replace this demo layer with a backend service providing secure HTTP-only cookies or JWT tokens.

### Quick Demo Access:
You can log in instantly using the pre-configured credentials:
- **Email**: `demo@cinevault.com`
- **Password**: `Demo1234!`

*(Or simply click the **"Fill Demo Login"** button on the `/login` page to auto-populate the form!)*

---

## 🎨 UI/UX Design System (Electric Blue & Deep Sapphire)

CineVault is styled with a modern glassmorphic cinema aesthetic:

| Element | Specification | Rationale |
| :--- | :--- | :--- |
| **Primary Background** | `#050C1B` (Cosmic Midnight Navy) | Deep cinematic space backdrop minimizing eye strain |
| **Surface Cards** | `rgba(12, 25, 54, 0.78)` with `backdrop-filter: blur(16px)` | Frosted glass depth elevation with sapphire tint |
| **Typography (Headings)**| Crisp Pearl White (`#F8FAFC`) | Maximum readability and high contrast across all displays |
| **Typography (Body)** | Soft Slate (`#CBD5E1`) | Comfortable reading experience without harsh glare |
| **Brand Primary Accent**| `#2563EB` (Electric Royal Blue) & `#3B82F6` | Premium cinematic technology identity |
| **Cyan Secondary Accent**| `#06B6D4` (Neon Ocean Cyan) | High-energy visual highlights for active tabs and glows |
| **Gold Rating Stars** | `#F59E0B` (Amber Gold) | Familiar, high-visibility score indicators |
| **Button Normal State** | Gradient `linear-gradient(135deg, #2563EB, #0284C7)` | Tactile, modern gradient action buttons |
| **Button Hover State** | Elevation `translateY(-2px)` + Glow Shadow | Responsive interactive feedback across the entire application |
| **Border Radius** | `8px` to `18px` | Modern, sleek curved geometry |
| **Aspect Ratio** | Standard `2:3` for movie posters | Preserves authentic theatrical poster proportions |

---

## 📄 Attribution & Disclaimer

- Movie data and imagery are supplied by **[The Movie Database (TMDB)](https://www.themoviedb.org/)**.
- This application uses the TMDB API but is not certified or endorsed by TMDB.
- All movie posters, backdrops, and character names are copyright of their respective production studios.

---

<p align="center">
  <strong>© 2026 CineVault. Crafted with precision for movie lovers everywhere.</strong>
</p>
