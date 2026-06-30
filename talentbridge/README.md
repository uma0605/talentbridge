# TalentBridge — MERN Stack Application

A full-stack job portal with Student, Company, and Admin authentication powered by MongoDB Atlas, Express.js, React, and Node.js.

---

## 📁 Folder Structure

```
talentbridge/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── studentAuthController.js
│   │   ├── companyAuthController.js
│   │   └── adminAuthController.js
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT verification + role guard
│   ├── models/
│   │   ├── Student.js              # bcrypt pre-save hook
│   │   ├── Company.js
│   │   └── Admin.js                # + seedAdmin() helper
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── companyRoutes.js
│   │   └── adminRoutes.js
│   ├── .env                        # ⚠️ Fill in your MongoDB URI
│   ├── server.js                   # Express entry point
│   └── package.json
│
├── frontend/                       # Original Vite + React + TS app
│   ├── src/
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx     # Now calls real API endpoints
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── company/
│   │   │   │   ├── CompanyLoginPage.tsx
│   │   │   │   └── CompanyRegisterPage.tsx
│   │   │   └── admin/
│   │   │       └── AdminLoginPage.tsx
│   │   └── ...rest of original UI unchanged
│   ├── vite.config.ts              # Added /api proxy to port 5000
│   └── package.json
│
└── package.json                    # Root: concurrently runs both
```

---

## 🚀 Setup Instructions

### Step 1 — MongoDB Atlas

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free cluster.
2. Create a database user with a username and password.
3. Whitelist your IP (or use `0.0.0.0/0` for development).
4. Click **Connect → Drivers** and copy the connection string.

### Step 2 — Configure `.env`

Edit `backend/.env` and replace the placeholder:

```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/talentbridge?retryWrites=true&w=majority
JWT_SECRET=talentbridge_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 3 — Install Dependencies

```bash
# From the project root:
npm install              # installs concurrently
npm run install-all      # installs backend + frontend deps
```

Or manually:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Step 4 — Run the App

```bash
# From project root — starts both servers:
npm run dev
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

---

## 🔐 API Endpoints

### Students
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/students/register` | Public | Register new student |
| POST | `/api/students/login` | Public | Student login |
| GET | `/api/students/profile` | Private (JWT) | Get student profile |

### Companies
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/companies/register` | Public | Register company |
| POST | `/api/companies/login` | Public | Company login |
| GET | `/api/companies/profile` | Private (JWT) | Get company profile |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/admin/login` | Public | Admin login |
| GET | `/api/admin/profile` | Private (JWT, admin only) | Get admin profile |

---

## 🔑 Default Admin Credentials

On first startup, the server seeds a default admin in MongoDB:

```
Email:    admin@talentbridge.com
Password: admin123
```

> ⚠️ Change these after your first login in production.

---

## 🛡️ Security Features

- **bcrypt** (salt rounds: 10) — passwords are hashed before storage; plain text is never saved
- **JWT** — stateless tokens with 7-day expiry, verified on every protected route
- **Duplicate email prevention** — MongoDB unique index + controller-level check
- **Password/Confirm match** — validated on the frontend before the API call
- **Role-based access** — `authorize('student' | 'company' | 'admin')` middleware guards dashboards
- **`select: false`** on password fields — never returned in query results by default

---

## 🔄 What Changed from the Original

| Area | Before | After |
|------|--------|-------|
| Auth storage | localStorage (plain text) | MongoDB Atlas (bcrypt hashed) |
| Login check | String comparison | bcrypt.compare() |
| Session | localStorage JSON | JWT token |
| Admin credentials | Hardcoded in source | Seeded in MongoDB, bcrypt hashed |
| Duplicate email | Only checked 1 user in localStorage | MongoDB unique index |
| API | None (frontend-only) | Express REST API on port 5000 |
