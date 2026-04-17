# 🎓 College Lab Attendance & Equipment Management System

A complete full-stack web application built to streamline lab management for educational institutions. The system features role-based access control (RBAC), real-time attendance logging, and a comprehensive equipment tracking mechanism.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-Next.js%2014-black?logo=next.js)
![NodeJS](https://img.shields.io/badge/Node.js-Express-green?logo=nodedotjs)
![Database](https://img.shields.io/badge/Database-SQLite%20%2B%20Sequelize-blue?logo=sqlite)

## 🚀 Features by Role

The system intelligently routes users to specialized dashboards based on their roles:

- **👨‍🎓 Student Portal**: View personal attendance logs, mark real-time attendance using session codes, and browse lab equipment.
- **👨‍🏫 Faculty Dashboard**: Monitor all student attendance, oversee active laboratory sessions, and generate data insights.
- **🔧 Lab Assistant Panel**: Perform full CRUD operations on the equipment inventory and seamlessly update device availability statuses.
- **🛡️ Admin Console**: Access system-wide analytical charts and manage user roles visually.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS v4, Recharts, Lucide Icons, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** SQLite (managed via Sequelize ORM).
- **Security:** JWT (JSON Web Tokens), bcrypt hashing.

---

## ⚙️ Quick Start Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- NPM or regular Node package manager

### 1. Backend Setup & Seeding

Navigate to the `backend` directory, install dependencies, and run the automated database seeder:

```bash
cd backend
npm install
node seed.js  # Wipes local DB, creates SQLite file, and seeds dummy users/equipment
npm run dev
```
*(The backend server will run continuously on `http://localhost:5000`)*

### 2. Frontend Setup

In a new terminal, navigate to the `frontend` application:

```bash
cd frontend
npm install
npm run dev
```
*(The web application will run continuously on `http://localhost:3000`)*

---

## 🔑 Test Accounts
After running `seed.js`, use these credentials to explore the different dashboards (the password is `password123` for all):

| Role | Email |
| :--- | :--- |
| **Admin** | `admin@college.edu` |
| **Faculty** | `faculty@college.edu` |
| **Lab Assistant** | `assistant@college.edu` |
| **Student** | `student@college.edu` |

## 🌟 Architecture Approach
- **Modular Monorepo-style setup:** Frontend and Backend act as separate micro-services within the parent folder.
- **Strict Hydration & JWT Routing:** Pages are statically protected ensuring routes cannot be bypassed without valid role tokens.
