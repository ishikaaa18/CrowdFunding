# EmpowerFund - Crowdfunding Platform (Frontend)

EmpowerFund is a crowdfunding platform built using the **MERN** stack. This repository contains the frontend of the project, developed with **React.js** and **Vite**.

## 🚀 Features

- Secure user authentication (Login/Signup)
- Create and manage fundraising campaigns
- Donate to projects seamlessly
- Responsive design for all devices
- User-friendly dashboard to track projects & donations

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite) + React Router + Bootstrap
- **State Management:** Context API / Redux (if used)
- **Styling:** CSS / Bootstrap
- **Icons:** Bootstrap Icons

---

## 📂 Folder Structure

---
crowdfunding-frontend/
│── public/                  # Static assets (favicons, images, etc.)
│── src/
│   ├── assets/               # Images, icons, and static resources
│   ├── components/           # Reusable UI components
│   ├── context/              # AuthContext and global state management
│   │   ├── AuthContext.jsx
│   ├── pages/                # Page components (Home, About, etc.)
│   ├── routes/               # Route configuration
│   ├── services/             # API service handlers (Axios calls)
│   ├── styles/               # CSS files and global styles
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Entry point of the app
│   ├── index.css             # Global styles
│── .gitignore                # Git ignored files
│── eslint.config.js          # ESLint configuration
│── index.html                # HTML template
│── package.json              # Project dependencies
│── vite.config.js            # Vite configuration
│── README.md                 # Project documentation


---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/yourusername/empowerfund-frontend.git
cd empowerfund-frontend
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Start the development server

```sh
npm run dev
```

The project will run locally at `http://localhost:5173/` (default Vite port).

---

## 🔄 Available Scripts

| Script          | Description                           |
|----------------|---------------------------------------|
| `npm run dev`  | Start the development server        |
| `npm run build` | Build the project for production   |
| `npm run preview` | Preview the production build    |

---

## 🔗 API Configuration

Make sure to configure the backend API URL in `src/config.js` or wherever the API requests are handled.

Example:

```js
export const API_URL = "http://localhost:5000/api";
```

---

## 📜 License

This project is open-source and available under the **MIT License**.




