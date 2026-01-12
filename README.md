<p align="center">
  <h1 align="center">JobNexus</h1>
</p>

<p align="center">
  A modern job portal with glassmorphism UI, gradient animations, and a premium user experience.
</p>

<p align="center">
  <a href="https://job-nexus-two.vercel.app">🌐 Live Demo</a> •
  <a href="#screenshots">📸 Screenshots</a> •
  <a href="#features">✨ Features</a> •
  <a href="#tech-stack">🛠 Tech Stack</a>
</p>

<p align="center">
  <img src="./images/hero.png" alt="JobNexus Homepage" width="100%" />
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Premium UI** | Glassmorphism cards, gradient backgrounds, smooth animations |
| 📱 **Fully Responsive** | Mobile-first design with hamburger menu and touch-friendly |
| 🔐 **Split-Screen Auth** | Modern login/signup with illustrations and password strength meter |
| 🔍 **Advanced Search** | Filter jobs by company, industry, salary with collapsible sidebar |
| 💼 **Job Management** | Browse, view details, and apply to jobs with one click |
| 👤 **User Profiles** | Gradient banner, skill badges, resume upload |
| 🏢 **Company Profiles** | Recruiters can create companies and post jobs |
| 📊 **Admin Dashboard** | Analytics, user management, data visualization |

---

## 🛠 Tech Stack

### Core
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)

### UI & Animation
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white)

### Data & Backend Integration
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

---

## 📸 Screenshots

### Homepage
Animated gradient blobs, glassmorphism stat cards, and a prominent search bar.

<img src="./images/hero.png" alt="Homepage" width="100%" />

### Jobs Listing
Browse all jobs with a collapsible filter sidebar. Each card shows company, salary, location, and job type.

<img src="./images/jobs.png" alt="Jobs Page" width="100%" />

### Authentication
Split-screen design with gradient illustration. Includes role selection and password strength indicator.

<p>
  <img src="./images/login.png" alt="Login" width="49%" />
  <img src="./images/signup.png" alt="Signup" width="49%" />
</p>

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abhisheksuwalka/JobNexus.git
cd JobNexus

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/          # Login, Signup
│   │   ├── common/        # Navbar, Footer
│   │   ├── layout/        # Page sections
│   │   ├── pages/         # Route pages
│   │   └── ui/            # shadcn components
│   ├── hooks/             # Custom React hooks
│   ├── redux/             # Store & slices
│   └── utils/             # Constants, helpers
├── index.html
└── tailwind.config.js
```

---

## 🔌 API Integration

This frontend connects to a REST API backend. To integrate your own backend, update the base URL:

```javascript
// src/utils/constant.js
export const USER_API_END_POINT = "https://your-api.com/api/v1/users";
export const JOB_API_END_POINT = "https://your-api.com/api/v1/job";
export const APPLICATION_API_END_POINT = "https://your-api.com/api/v1/application";
export const COMPANY_API_END_POINT = "https://your-api.com/api/v1/company";
```

### Required Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/register` | Create new user |
| `POST` | `/users/login` | Authenticate user |
| `GET` | `/users/logout` | Logout |
| `GET` | `/job/get` | List all jobs |
| `GET` | `/job/get/:id` | Get job details |
| `GET` | `/application/apply/:id` | Apply to job |
| `POST` | `/company/register` | Create company |

---

## 🎨 Design System

The project uses a custom design system built on Tailwind CSS:

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#8B5CF6` | Buttons, links, accents |
| Accent | `#4F46E5` | Gradients, hover states |
| Background | `#FFFFFF` | Cards, modals |
| Foreground | `#1F2937` | Text, icons |

Custom utilities available:
- `.gradient-bg` - Purple to indigo gradient
- `.gradient-text` - Gradient text effect
- `.glass` - Glassmorphism effect
- `.card-hover` - Hover lift animation

---

## 👨‍💻 Author

<p>
  <a href="https://linkedin.com/in/abhisheksuwalka">
    <img src="https://img.shields.io/badge/LinkedIn-Abhishek_Suwalka-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://github.com/Abhisheksuwalka">
    <img src="https://img.shields.io/badge/GitHub-Abhisheksuwalka-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

---

<p align="center">
  Built with 💜 using React & Tailwind CSS
</p>
