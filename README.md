# Travel In Depth

A full-stack travel discovery platform for exploring destinations across India — built with React (frontend) and Node/Express + MongoDB (backend).

> **Project status:** In active development. Core platform (auth, destinations, admin panel) is complete and functional. AI trip planning, recommendations, and weather integration are in progress — see [Roadmap](#roadmap) below.

## Features

### ✅ Completed

- **User authentication** — signup, login, and logout with hashed passwords (bcrypt) and JWT-based sessions.
- **Destinations catalog** — 12+ Indian destinations stored in MongoDB, served via a REST API, with region, budget, best season, rating, and eco-friendly transport options per city.
- **Personalized user dashboard** — profile, settings, and trip data scoped to the logged-in user.
- **Admin panel** — protected by role-based access control (`role: "admin"`):
  - View all destinations in a table
  - Add new destinations
  - Edit existing destinations
  - Delete destinations
- **Route protection** — both regular user routes and admin-only routes are gated by real JWT verification, not client-side flags.

### 🚧 In progress

- **Day-by-day AI trip planner** — structured, editable itineraries generated per day (not a single block of text), backed by a secure server-side AI proxy.
- **Recommendation system** — destination suggestions based on user interests, budget, season, and browsing behavior.
- **Weather integration** — live conditions and forecasts per destination, and weather-aware trip planning.

See [Roadmap](#roadmap) for the full build-out plan and target timeline.

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router
- Tailwind CSS
- Framer Motion, Recharts, Lucide Icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication, bcrypt password hashing

## Project Structure

```
Travel-In-Depth2026/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/      # Route handler logic
│   ├── middleware/       # Auth/admin guards
│   ├── models/           # Mongoose schemas (User, Destination)
│   ├── routes/            # Express route definitions
│   ├── seed/              # DB seed scripts (destinations, admin promotion)
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/            # Backend API wrapper functions
    │   ├── components/      # Reusable and page-specific components
    │   ├── context/          # React context (destinations)
    │   ├── features/auth/    # Auth context, hook, logic
    │   ├── pages/             # Route-level pages (incl. /pages/admin)
    │   └── routes/             # Router + ProtectedRoute
    └── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier)

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/travel-in-depth.git
cd travel-in-depth
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Fill in `backend/.env`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=a_long_random_secret_string
```
Seed the database with starter destinations:
```bash
npm run seed
```
Start the backend:
```bash
npm run dev
```
Server runs at `http://localhost:5000`.

### 3. Frontend setup
Open a new terminal:
```bash
cd frontend
npm install
```
Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```
Start the frontend:
```bash
npm run dev
```
App runs at `http://localhost:5173`.

### 4. Create an admin account
1. Sign up for a normal account through the app's UI.
2. Promote it to admin from the backend:
```bash
cd backend
node seed/makeAdmin.js youremail@example.com
```
3. Log in at `/admin/login` with that account.

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | — | Health check |
| GET | `/api/destinations` | — | List all destinations |
| GET | `/api/destinations/:slug` | — | Get one destination |
| POST | `/api/destinations` | Admin | Create a destination |
| PUT | `/api/destinations/:slug` | Admin | Update a destination |
| DELETE | `/api/destinations/:slug` | Admin | Delete a destination |
| POST | `/api/auth/signup` | — | Create a user account |
| POST | `/api/auth/login` | — | Log in, receive JWT |
| GET | `/api/auth/me` | User | Get current logged-in user |

## Roadmap

| Milestone | Status |
|---|---|
| Backend + database + destinations API | ✅ Done |
| User authentication (JWT) | ✅ Done |
| Admin CRUD panel | ✅ Done |
| Day-by-day AI trip planner | 🚧 In progress |
| Recommendation system | ⏳ Planned |
| Weather integration | ⏳ Planned |
| Shared component library refactor | ⏳ Planned |
| Performance, security, and SEO pass | ⏳ Planned |
| Launch | ⏳ Planned |

## License

Not yet decided — add a license before making this repository public if you intend for others to reuse the code.
