# 🛠️ MetaTask – Back end

_Express • Prisma • SQLite_

> API REST sécurisée par JWT, testée et migrable.

## ⚡ Mise en route

```bash
git clone <repo-backend>.git
cd todo-backend
cp .env.example .env     # adapter JWT_SECRET si besoin
npm install
npm run prisma:generate
npm run dev              # http://localhost:4000
```

## 📋 Scripts disponibles

| Script           | Action                                      |
| ---------------- | ------------------------------------------- |
| `dev`            | ts-node-dev + reload                        |
| `build && start` | Compilation TS → JS & exécution prod        |
| `migrate`        | Prisma migrate (SQLite)                     |
| `seed`           | Crée user + statuts + catégories par défaut |
| `test`           | Jest + supertest (92% cov.)                 |
| `lint`           | ESLint + Prettier                           |
