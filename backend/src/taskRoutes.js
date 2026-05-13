// src/taskRoutes.js
// ─────────────────────────────────────────────────────────────────────────────
// Router Express: defineste toate endpoint-urile REST pentru taskuri
//
//  GET    /api/tasks          → listeaza toate taskurile
//  POST   /api/tasks          → creeaza un task nou
//  PATCH  /api/tasks/:id      → marcheaza task ca finalizat
//  DELETE /api/tasks/:id      → sterge un task
// ─────────────────────────────────────────────────────────────────────────────

const express     = require('express');
const router      = express.Router();
const taskService = require('./taskService');

// ── GET /api/tasks ────────────────────────────────────────────────────────────
// Returneaza lista completa de taskuri
router.get('/', (req, res) => {
  try {
    const tasks = taskService.getAll();
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST /api/tasks ───────────────────────────────────────────────────────────
// Creeaza un task nou; body: { text: "..." }
router.post('/', (req, res) => {
  try {
    // Extragem si campurile noi din body
    const { text, priority, deadline, deadlineTime } = req.body;
    const task = taskService.create(text, priority, deadline, deadlineTime);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── PATCH /api/tasks/:id ──────────────────────────────────────────────────────
// Marcheaza un task ca finalizat
router.patch('/:id', (req, res) => {
  try {
    const task = taskService.complete(req.params.id);
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// ── DELETE /api/tasks/:id ─────────────────────────────────────────────────────
// Sterge un task dupa ID
router.delete('/:id', (req, res) => {
  try {
    const task = taskService.remove(req.params.id);
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

module.exports = router;
