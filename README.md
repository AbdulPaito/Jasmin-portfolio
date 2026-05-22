# Jasmin Paito — Accounting Portfolio Website

A premium, full-stack accounting portfolio website built for **Jasmin Paito**, an Accounting Assistant specializing in tax preparation, bookkeeping, and administrative support.

## 🚀 Tech Stack

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS v4**
- **React Router DOM v6**
- **Framer Motion** — animations
- **Axios** — HTTP client
- **React Icons** — icon library
- **React Hot Toast** — notifications
- **React Helmet Async** — SEO

### Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas** + **Mongoose**
- **JWT** — authentication
- **Cloudinary** — image/file uploads
- **Multer** — file upload middleware
- **bcryptjs** — password hashing

## 📁 Project Structure

```
accounting-portfolio/
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Public + Dashboard pages
│   │   ├── services/      # API service layer
│   │   ├── context/       # React contexts (Auth)
│   │   ├── hooks/         # Custom hooks
│   │   ├── animations/    # Framer Motion variants
│   │   └── utils/         # Helper utilities
│   └── ...
│
├── backend/           # Node.js + Express API
│   ├── src/
│   │   ├── config/        # DB & Cloudinary config
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/     # Auth, Upload, Error
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   └── utils/         # Token gen, Seed script
│   └── ...
│
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### 1. Backend Setup
```bash
cd backend
npm install --legacy-peer-deps
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

Seed the database:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

## 🔐 Admin Dashboard

Access: `http://localhost:5173/login`

Default credentials (after seeding):
- **Email:** jasminpaito11@gmail.com
- **Password:** Admin@123

### Dashboard Features
- Manage About info (biography, education, experience)
- Manage Services (CRUD)
- Manage Skills (CRUD with percentage)
- Manage Blog posts (CRUD with rich content)
- Manage Testimonials (CRUD with ratings)
- Site Settings (hero, social links, contact info, SEO)
- Image uploads via Cloudinary

## 🌐 Deployment

### Frontend → Vercel
1. Connect your GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add env variable: `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy!

### Backend → Render
1. Create a new Web Service on Render
2. Set root directory to `backend`
3. Build command: `npm install --legacy-peer-deps`
4. Start command: `npm start`
5. Add all environment variables from `.env`
6. Deploy!

### Database → MongoDB Atlas
- Ensure Network Access allows `0.0.0.0/0` for Render/Vercel

## 📄 API Routes

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/auth/login` | POST | — | Login |
| `/api/auth/me` | GET | ✅ | Current user |
| `/api/about` | GET/PUT | PUT ✅ | About info |
| `/api/services` | GET/POST | POST ✅ | Services |
| `/api/skills` | GET/POST | POST ✅ | Skills |
| `/api/blogs` | GET/POST | POST ✅ | Blogs |
| `/api/testimonials` | GET/POST | POST ✅ | Testimonials |
| `/api/settings` | GET/PUT | PUT ✅ | Site settings |
| `/api/upload` | POST/DEL | ✅ | File uploads |

---

**Built with ❤️ for Jasmin Paito**
