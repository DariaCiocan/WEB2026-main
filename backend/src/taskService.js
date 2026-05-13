// src/taskService.js
// ─────────────────────────────────────────────────────────────────────────────
// Logica de business: validare, CRUD, generare ID-uri unice
// ─────────────────────────────────────────────────────────────────────────────

const { loadTasks, saveTasks } = require('./taskRepository');

/**
 * Returneaza toate taskurile din fisier.
 * @returns {Array}
 */
function getAll() {
  return loadTasks();
}

/**
 * Creeaza un task nou dupa validare.
 * Arunca eroare daca textul e gol sau duplicat.
 * @param {string} text
 * @returns {Object} taskul creat
 */
function create(text, priority, deadline, deadlineTime) {
  // ── Validare text ─────────────────────────────────────────────────────────
  if (!text || typeof text !== 'string' || text.trim() === '') {
    throw new Error('Sarcina nu poate fi goala!');
  }

  // ── Validare prioritate ───────────────────────────────────────────────────
  const prioritatiValide = ['Ridicat', 'Mediu', 'Scazut'];
  if (!priority || !prioritatiValide.includes(priority)) {
    throw new Error('Prioritatea trebuie sa fie: Ridicat, Mediu sau Scazut!');
  }

  const trimmed = text.trim();
  const tasks   = loadTasks();

  // Nu permitem duplicate (case-insensitive)
  const duplicate = tasks.find(
    (t) => t.text.toLowerCase() === trimmed.toLowerCase()
  );
  if (duplicate) {
    throw new Error('Aceasta sarcina exista deja in lista!');
  }

  // ── Creare si salvare ─────────────────────────────────────────────────────
  const newTask = {
    id:           Date.now(),
    text:         trimmed,
    priority:     priority,           // 'Ridicat' | 'Mediu' | 'Scazut'
    deadline:     deadline || null,   // ex: '2025-12-31' sau null
    deadlineTime: deadlineTime || null, // ex: '14:30' sau null
    completed:    false,
    createdAt:    new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

/**
 * Marcheaza un task ca finalizat dupa ID.
 * @param {number} id
 * @returns {Object} taskul actualizat
 */
function complete(id) {
  const tasks = loadTasks();
  const task  = tasks.find((t) => t.id === Number(id));

  if (!task) throw new Error(`Nu exista sarcina cu ID-ul ${id}`);
  if (task.completed) throw new Error('Sarcina este deja finalizata!');

  task.completed   = true;
  task.completedAt = new Date().toISOString();
  saveTasks(tasks);
  return task;
}

/**
 * Sterge un task dupa ID.
 * @param {number} id
 * @returns {Object} taskul sters
 */
function remove(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === Number(id));

  if (index === -1) throw new Error(`Nu exista sarcina cu ID-ul ${id}`);

  const [deleted] = tasks.splice(index, 1);
  saveTasks(tasks);
  return deleted;
}

module.exports = { getAll, create, complete, remove };
