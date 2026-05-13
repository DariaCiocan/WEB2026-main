// src/taskRepository.js
// ─────────────────────────────────────────────────────────────────────────────
// Stratul de persistenta: citeste si scrie tasklist-ul in fisierul tasks.json
// ─────────────────────────────────────────────────────────────────────────────

const fs   = require('fs');
const path = require('path');

// Fisierul de stocare se afla in radacina backend-ului
const DATA_FILE = path.join(__dirname, '..', 'tasks.json');

/**
 * Incarca toate taskurile din fisier.
 * Daca fisierul nu exista inca, returneaza lista goala.
 * @returns {Array} lista de taskuri
 */
function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    // Fisier corupt sau gol → pornim cu lista curata
    return [];
  }
}

/**
 * Salveaza lista de taskuri in fisier (suprascrie complet).
 * @param {Array} tasks - lista de taskuri de persistat
 */
function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}

module.exports = { loadTasks, saveTasks };
