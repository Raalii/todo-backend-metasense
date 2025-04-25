# 📋 Notes techniques – Back-end

---

## 🧰 1. Stack

| Élément              | Tech              | Motif                              |
| -------------------- | ----------------- | ---------------------------------- |
| **Express 4**        | micro-framework   | middleware flexible                |
| **Prisma 6**         | ORM typé          | migrations, SQLite file            |
| **Zod**              | validation schéma | → 400 auto                         |
| **JWT**              | HS256             | stateless, facile à partager front |
| **Jest + supertest** | tests             | sur routes & services              |
| **ts-node-dev**      | reload dev        | + TS                               |

---

## 📂 2. Architecture

```
src/
├─ routes/
│  ├─ auth.routes.ts
│  ├─ tasks.routes.ts
│  └─ …
├─ controllers/          # mapping req → service
├─ services/             # logique métier (Prisma)
├─ middlewares/          # auth, validate(Zod), error
├─ validators/           # schémas Zod
└─ prisma.ts             # instance Prisma client
```

### ⚠️ Middleware error

| Code | Généré par   | Exemple message     |
| ---- | ------------ | ------------------- |
| 400  | Zod parse    | Validation error    |
| 401  | login        | Invalid credentials |
| 404  | Prisma P2025 | Resource not found  |
| 409  | FK en cours  | CATEGORY_IN_USE     |

---

## 💾 3. Modèle Prisma

```prisma
User 1─∞ Task
Task ∞─∞ Category (through TaskCategory)
Task 1─1 Status
Task 0─1 Project
```

- Seed par défaut :
  - statuts : Todo / In-progress / Done
  - catégories : Dev / Design / Docs

---

## 🔌 4. Endpoints clefs

| Méthode  | URL                 | Auth | Succès    | Erreurs |
| -------- | ------------------- | ---- | --------- | ------- |
| `POST`   | `/api/auth/login`   | –    | 200 token | 401     |
| `POST`   | `/api/tasks`        | ✓    | 201 id    | 400     |
| `PUT`    | `/api/tasks/:id`    | ✓    | 200       | 404     |
| `DELETE` | `/api/statuses/:id` | ✓    | 204       | 409     |

---

## 🧪 5. Tests

```bash
npm run test -- --watch
```

- BD SQLite in-memory réinitialisée avant chaque test (`prisma.$executeRaw('PRAGMA foreign_keys = OFF'); …`)
- Suites : auth, security, tasks, projects, categories, statuses
- Couverture : **92%** lignes / 38% branches ✅

---

## 🔮 6. Roadmap

| Priorité | Item                                        |
| -------- | ------------------------------------------- |
| ⭐⭐⭐   | Reset password (mailer)                     |
| ⭐⭐     | Multi-tenant (organisationId sur tables)    |
| ⭐       | CI GitHub Actions (lint, test, docker push) |

_Dev : **3h** (dont tests 30mn) • Docs : 20 min_
