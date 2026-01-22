# KUA Kejayan Digital Platform 🇮🇩

![Project Status](https://img.shields.io/badge/status-active-success)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Official digital platform for Kantor Urusan Agama (KUA) Kejayan.**
Designed to simplify public access to marriage services, religious information, and institutional transparency.

🌐 **Live Demo:** [kuakejayan.com](https://kuakejayan.com)  
👨‍💻 **Developed by:** [FynWorks](https://fynworks.my.id)

---

## 📖 About The Project

**KUA Kejayan Digital** is a modern web application built to bridge the gap between government religious services and the community in Kejayan, Pasuruan. Unlike traditional static government sites, this platform is built as a Single Page Application (SPA) for speed, responsiveness, and a seamless user experience.

### Key Objectives:
* **Digital Transformation:** Moving manual information requests to a digital format.
* **Accessibility:** Easy access to marriage requirements (SIMKAH) and reconciliation (Rujuk) procedures.
* **Transparency:** Public access to mosque data, waqf information, and schedule updates.

---

## 🛠️ Tech Stack

This project works with the latest modern web technologies:

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | UI Library (v18+) |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E) | Next Generation Frontend Tooling |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | Static Type Checking |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Utility-first CSS Framework |
| **Routing** | React Router DOM | Client-side routing |
| **SEO** | React Helmet Async | Dynamic head management for SEO |
| **Icons** | Lucide / React Icons | Modern SVG Icons |

---

## ✨ Key Features

* **⚡ Blazing Fast Performance:** Powered by Vite for instant loading.
* **📱 Fully Responsive:** Optimized for mobile, tablet, and desktop views.
* **🔍 SEO Optimized:** Implements `react-helmet-async` for dynamic meta tags and structured data (Schema.org).
* **📋 Interactive Service Grid:** User-friendly navigation for various KUA services.
* **📰 News & Updates:** Integrated section for latest announcements.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/riyard666/kua-kejayan.git](https://github.com/riyard666/kua-kejayan.git)
    cd kua-kejayan
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

├── utils/          # Helper functions
├── App.tsx         # Main entry component
└── main.tsx        # DOM renderer
