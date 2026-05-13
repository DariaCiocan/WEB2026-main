// src/api/tasksApi.js
// ─────────────────────────────────────────────────────────────────────────────
// API: toate cererile HTTP catre backend
// Orice componenta importa de aici, nu face fetch direct
// ─────────────────────────────────────────────────────────────────────────────

// In dezvoltare: http://localhost:5000 (via proxy Vite, BASE_URL = '')
// In productie:  https://numele-vostru.onrender.com (din variabila de mediu)
const BASE_URL = `${import.meta.env.VITE_API_URL || ''}/api/tasks`;

/**
 * Helper intern: face fetch si parseaza raspunsul JSON.
 * Arunca eroare cu mesajul primit de la server daca success=false.
 */
async function request(url, options = {}) {
  const res  = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Eroare necunoscuta');
  return json.data;
}

// ── Metode publice ────────────────────────────────────────────────────────────

/**
 * Incarca toate taskurile de la server.
 * @returns {Promise<Task[]>}
 */
export async function fetchTasks() {
  return request(BASE_URL);
}

/**
 * Creeaza un task nou.
 * @param {string} text
 * @returns {Promise<Task>}
 */
export async function createTask(text, priority, deadline, deadlineTime) {
  return request(BASE_URL, {
    method: 'POST',
    body:   JSON.stringify({ text, priority, deadline, deadlineTime }),
  });
}

/**
 * Marcheaza un task ca finalizat.
 * @param {number} id
 * @returns {Promise<Task>}
 */
export async function completeTask(id) {
  return request(`${BASE_URL}/${id}`, { method: 'PATCH' });
}

/**
 * Sterge un task dupa ID.
 * @param {number} id
 * @returns {Promise<Task>}
 */
export async function deleteTask(id) {
  return request(`${BASE_URL}/${id}`, { method: 'DELETE' });
}
