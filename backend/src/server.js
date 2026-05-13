// src/server.js
// ─────────────────────────────────────────────────────────────────────────────
// Punctul de intrare al serverului Express
// Pornire: npm run dev  (cu nodemon)  sau  npm start
// ─────────────────────────────────────────────────────────────────────────────

const express    = require('express');
const cors       = require('cors');
const taskRoutes = require('./taskRoutes');

const app  = express();
// Render seteaza process.env.PORT automat
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
// Permite cereri din domeniul Vercel si din localhost (dezvoltare)
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'https://web-2026-blush.vercel.app/',
    'http://localhost:5173'
  ]
}));
// Parseaza corpul cererilor JSON
app.use(express.json());

// ── Rute ──────────────────────────────────────────────────────────────────────
app.use('/api/tasks', taskRoutes);

// Ruta de health-check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ── Handler global de erori ───────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ success: false, message: 'Eroare interna server' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  Backend pornit pe http://localhost:${PORT}`);
  console.log(`📁  Taskuri stocate in: backend/tasks.json\n`);
});
