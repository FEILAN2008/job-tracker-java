# Job Application Tracker

## TL;DR
- A full-stack Java + React Progressive Web App built independently
- Demonstrates REST API design, persistence, and modern frontend architecture
- Implements PWA app shell, service worker auto-update, and responsive UI
- Designed as a realistic, production-style CRUD application

---

A **Progressive Web App (PWA)** for tracking and managing job applications, built to demonstrate end-to-end full-stack development using Java and modern frontend tooling.

**Technologies:** Spring Boot (Java 17), React, TypeScript, Vite, Bootstrap 5, H2 (dev), PostgreSQL (prod), `vite-plugin-pwa`.

---

## 🎬 Live Demo

<p align="center">
  <img src="job application tracker demo.gif" alt="App Demo" width="700px" />
</p>

*The demo showcases creating job applications, updating statuses, pagination, and PWA installation behavior.*

---

## 🔥 Features

- Create, read, update, and delete job applications (full CRUD)
- Color-coded application statuses:
  - **Applied** (blue)
  - **Interview** (orange)
  - **Offer** (green)
  - **Rejected** (gray)
- Search by company name or position title
- Pagination for large datasets
- PWA **App Shell** architecture:
  - Static assets (HTML / JS / CSS / icons) are cached
  - Dynamic data requires an online backend API
- Service Worker auto-update
- Responsive UI built with Bootstrap 5

---

## 🧠 Architecture Overview

- **Backend:** Spring Boot REST API handling business logic and persistence
- **Frontend:** React + TypeScript SPA communicating via JSON APIs
- **PWA Layer:** App shell caching using Workbox via `vite-plugin-pwa`
- **Persistence:** H2 (file mode) for local development, PostgreSQL for production

---

## 🛠️ Tech Stack

| Layer    | Technology                                                   |
| -------- | ------------------------------------------------------------ |
| Backend  | Java 17, Spring Boot 3.2.4, JPA, H2 (dev), PostgreSQL (prod) |
| Frontend | React 18, TypeScript, Vite, Bootstrap 5                      |
| PWA      | `vite-plugin-pwa`, Workbox caching                           |
| Database | H2 (file mode for development), PostgreSQL (production)     |

---

## ⚙️ Prerequisites

- Java 17 SDK
- Maven
- Node.js (v16+) & npm
- Git

---

## 🚀 Installation

### Backend Setup

```bash
cd backend
mvn clean install
```

- Ensure `application.properties` uses H2 file mode for development:
  ```properties
  spring.datasource.url=jdbc:h2:file:./data/jobtrackerdb
  ```

### Frontend Setup

```bash
cd frontend
npm install
```

---

## ▶️ Running Locally

1. **Start backend**

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   Backend runs on `http://localhost:8080`.

2. **Start frontend (dev server)**

   ```bash
   cd frontend
   npm run dev
   ```

   Frontend runs on `http://localhost:5173`. Use the shown Network IP to test on mobile.

---

## 📱 PWA Installation

**Note:** Install prompt only appears in secure contexts (HTTPS or localhost). For local development over HTTP, the prompt may not appear when using LAN IP.

1. Open the app URL in a secure context (e.g. `https://your-domain.com` or `http://localhost:5173`).
2. When prompted, choose **Add to Home screen** or click the **Install** icon.
3. The app shell will launch in standalone mode, but dynamic data requires the backend service; offline mode shows the cached shell without application data.

---

## 🏷️ Version & Roadmap

**v1.0.0** (2025-05-01)

- PWA WebApp: React+Vite frontend, Spring Boot backend
- App Shell for static resources, Add to Home screen, SW auto-update
- Dev persistence with H2 file mode

**Roadmap**

- **v1.1.0**

  - Deploy backend to Heroku with Postgres
  - Add user authentication (JWT)
  - Enhance offline caching with Workbox Runtime Caching & Background Sync

- **v2.0.0**

  - Generate native APK/IPA via PWABuilder or Capacitor
  - Implement push notifications
  - Document backend APIs with Swagger/OpenAPI

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: description"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

