# 🧠 Quiz App

Welcome to **Quiz App** — a fun and intuitive platform for solving quizzes, competing with others, and managing content as an admin! This is a monorepo project built with **Turborepo**, **NestJS (backend)**, and **React + TypeScript (frontend)**.

---

## 🚀 Features

- ✅ Solve quizzes with multiple question types
- ✅ See your personal high score and ranking per quiz
- ✅ Filter quizzes by category or search by name
- ✅ Admin dashboard to create quizzes and see users
- ✅ Role-based access control (User / Admin)
- ✅ UI with MUI (Material UI)
- ✅ Toast notifications and form validation

---

## ⚙️ Tech Stack

### Backend

- NestJS (TypeScript)
- Prisma ORM + PostgreSQL
- JWT authentication (login, register, guards)
- RESTful API
- Docker-ready

### Frontend

- React + TypeScript + Vite
- React Query + Axios
- React Hook Form
- Material UI
- React Hot Toast

---

## 📦 Setup Instructions

> ℹ️ This project uses **Yarn** and is powered by **Turborepo**.

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/NinaBucic/Internship-Quiz.git
cd Internship-Quiz
yarn install
```

### 2. Set up your environment variables

Create a `.env` file inside the `backend` folder. Example:

```env
DATABASE_URL="postgresql://user:password@localhost:3001/quizdb?schema=public"
JWT_SECRET=super_secure_secret_key
JWT_EXPIRES_IN=3600s
```

Make sure PostgreSQL is running locally or use Docker.

### 3. Setup the database and Prisma client

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

This will run the initial migration and generate the Prisma client.

### 4. Start the app

From the root of the project:

```bash
yarn dev
```

This will start both frontend and backend via Turborepo (frontend: `localhost:5173`, backend: `localhost:3000/api`).

---

## 👤 Default Roles

- **User**: solve quizzes and view score
- **Admin**: access `/admin/*` routes to manage quizzes and users

---

> Made with ❤️ during DUMP Internship
