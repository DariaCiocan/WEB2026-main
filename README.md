# ✅ Todo List App — React + Node.js/Express

Aplicatie completa de tip **To-Do List** cu:
- **Frontend**: React 18 + Vite + CSS custom (design responsive)
- **Backend**: Node.js + Express (API REST)
- **Persistenta**: fisier `tasks.json` pe server (date pastrate dupa restart)

---

## 📁 Structura proiectului

```
web_proiect/
├── uml-diagrams.html          ← Diagrame UML (Use Case, Activity, Sequence, Component, Deployment)
├── render.yaml                ← Configurare deployment Render.com
├── backend/
│   ├── src/
│   │   ├── server.js          ← Punctul de intrare Express
│   │   ├── taskRoutes.js      ← Rutele API REST
│   │   ├── taskService.js     ← Logica de business (CRUD + validare)
│   │   └── taskRepository.js  ← Persistenta (citire/scriere tasks.json)
│   ├── tasks.json
│   ├── vercel.json            ← Configurare deployment Vercel (backend)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/tasksApi.js
    │   ├── components/        ← TaskInput, TaskCard, Toast
    │   ├── hooks/useTaskForm.js
    │   ├── pages/TasksPage.jsx
    │   ├── App.jsx / App.css / index.css / main.jsx
    ├── index.html
    ├── vite.config.js
    ├── vercel.json            ← Configurare deployment Vercel (frontend)
    └── package.json
```

---

## 🚀 Rulare locala

### Backend (port 5000):
```bash
cd backend
npm install
npm run dev
```

### Frontend (port 5173):
```bash
cd frontend
npm install
npm run dev
```

Deschide **http://localhost:5173** in browser.

---

## ☁️ Deployment: Vercel + Render

### Render (backend) — via render.yaml

1. Urca codul pe GitHub
2. Render Dashboard → **New → Blueprint** → selecteaza repo-ul
3. Render detecteaza automat `render.yaml` si creeaza serviciul backend
4. Copiaza URL-ul generat (ex: `https://todo-backend.onrender.com`)

### Vercel (frontend)

1. Vercel Dashboard → **New Project** → importa repo-ul
2. **Root Directory**: `frontend` | **Build Command**: `npm run build` | **Output**: `dist`
3. Variabila de mediu: `VITE_API_BASE_URL = https://todo-backend.onrender.com`

---

## 🔌 API REST

| Metoda   | URL               | Descriere                   |
|----------|-------------------|-----------------------------|
| GET      | /api/tasks        | Listeaza toate taskurile    |
| POST     | /api/tasks        | Creeaza task nou            |
| PATCH    | /api/tasks/:id    | Marcheaza ca finalizat      |
| DELETE   | /api/tasks/:id    | Sterge task                 |
| GET      | /api/health       | Health check                |

---

## 📐 Diagrame UML

Deschide **`uml-diagrams.html`** in browser pentru:
1. Use Case Diagram
2. Activity Diagram (flux adaugare task)
3. Sequence Diagram (interactiunea componentelor)
4. Component Diagram (modulele si dependentele)
5. Deployment Diagram (infrastructura Vercel + Render)

---

## ✅ Functionalitati

- Adaugare cu validare (camp gol, duplicate, prioritate obligatorie)
- Prioritati: Ridicat / Mediu / Scazut
- Termen limita (data + ora) cu avertizare vizuala la expirare
- Statistici: total / active / finalizate
- Marcare ca finalizat, stergere cu confirmare
- Filtrare: Toate / Active / Finalizate
- Persistenta completa dupa restart
- Toast notifications, animatii CSS
- Design responsiv (breakpoint 500px)
