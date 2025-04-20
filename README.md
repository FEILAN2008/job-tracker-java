# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-04-20
### Added
- Initial PWA WebApp: React+Vite front-end, Spring Boot back-end
- App Shell for caching static resources (HTML/JS/CSS/icons)
- Service Worker auto-update (`registerSW` in `main.tsx`)
- H2 file-mode persistence for development
- Responsive UI with Bootstrap 5 and color-coded statuses
- TypeScript declaration for `virtual:pwa-register`
- Dev server network access (`host: true`) for mobile testing

## [Unreleased]
### Planned
- v1.1.0: Deploy backend to Heroku with PostgreSQL, add JWT auth, enhance offline caching with Workbox Runtime Caching & Background Sync
- v2.0.0: Generate native APK/IPA with PWABuilder or Capacitor, implement push notifications, document APIs with Swagger/OpenAPI

