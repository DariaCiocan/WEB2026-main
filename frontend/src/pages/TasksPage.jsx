// src/pages/TasksPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Pagina principala: orchestreaza starea, apeleaza API-ul, randeaza lista
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, completeTask, deleteTask } from '../api/tasksApi';
import TaskInput from '../components/TaskInput';
import TaskCard  from '../components/TaskCard';
import Toast     from '../components/Toast';

// Filtre disponibile pentru lista
const FILTERS = ['Toate', 'Active', 'Finalizate'];

export default function TasksPage() {
  const [tasks,  setTasks]  = useState([]);
  const [filter, setFilter] = useState('Toate');
  const [loading, setLoading] = useState(true);
  const [toast,  setToast]  = useState({ message: '', type: 'success' });

  // ── Incarca taskurile la montare ──────────────────────────────────────────
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      showToast('Eroare la incarcarea sarcinilor: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  // ── Handler: adauga task ──────────────────────────────────────────────────
  // useCallback previne recrearea functiei la fiecare render
  const handleAdd = useCallback(async (text, priority, deadline, deadlineTime) => {
    const task = await createTask(text, priority, deadline, deadlineTime);
    setTasks((prev) => [...prev, task]);
    showToast('✓ Sarcina adaugata!', 'success');
  }, []);

  // ── Handler: marcheaza ca finalizat ──────────────────────────────────────
  async function handleComplete(id) {
    try {
      const updated = await completeTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      showToast('✓ Sarcina finalizata!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  // ── Handler: sterge task ──────────────────────────────────────────────────
  async function handleDelete(id, text) {
    if (!window.confirm(`Stergi sarcina?\n"${text}"`)) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      showToast('Sarcina stearsa!', 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  // ── Filtreaza lista afisata ───────────────────────────────────────────────
  const visibleTasks = tasks.filter((t) => {
    if (filter === 'Active')     return !t.completed;
    if (filter === 'Finalizate') return  t.completed;
    return true;
  });

  // ── Statistici ────────────────────────────────────────────────────────────
  const totalCount  = tasks.length;
  const activeCount = tasks.filter((t) => !t.completed).length;
  const doneCount   = tasks.filter((t) =>  t.completed).length;

  // ── Utilitara toast ───────────────────────────────────────────────────────
  function showToast(message, type = 'success') {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 2500);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="page-header">
        <h1 className="page-title">
          To Do<br /><span className="accent">List</span>
        </h1>

        {/* Statistici */}
        <div className="stats-row">
          <div className="stat-item">
            <strong>{totalCount}</strong>
            <span>total</span>
          </div>
          <div className="stat-item">
            <strong>{activeCount}</strong>
            <span>active</span>
          </div>
          <div className="stat-item">
            <strong>{doneCount}</strong>
            <span>finalizate</span>
          </div>
        </div>
      </header>

      {/* Formular adaugare */}
      <TaskInput onAdd={handleAdd} />

      {/* Filtre */}
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista taskuri */}
      {loading ? (
        <div className="loading-state">Se incarca sarcinile...</div>
      ) : visibleTasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">
            {filter === 'Finalizate' ? '🎉' : '📋'}
          </span>
          <p>
            {filter === 'Toate'
              ? 'Nicio sarcina salvata.\nAdauga prima ta sarcina mai sus!'
              : filter === 'Active'
              ? 'Nu exista sarcini active.'
              : 'Nu exista sarcini finalizate.'}
          </p>
        </div>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      {/* Toast notifications */}
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}
