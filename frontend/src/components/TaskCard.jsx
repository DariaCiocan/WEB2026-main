// src/components/TaskCard.jsx
export default function TaskCard({ task, onComplete, onDelete }) {

  // Formatare data creare
  const createdDate = new Date(task.createdAt).toLocaleDateString('ro-RO', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  });

  // Formatare deadline (daca exista)
  let deadlineStr = null;
  if (task.deadline) {
    const d = new Date(task.deadline + 'T00:00:00');
    deadlineStr = d.toLocaleDateString('ro-RO', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
    if (task.deadlineTime) {
      deadlineStr += ` · ${task.deadlineTime}`;
    }
  }

  // Verificam daca deadline-ul a trecut (pentru avertizare vizuala)
  const isOverdue = !task.completed && task.deadline &&
    new Date(task.deadline + 'T' + (task.deadlineTime || '23:59')) < new Date();

  // Clasa CSS pentru badge-ul de prioritate
  const priorityClass = {
    'Ridicat': 'priority-high',
    'Mediu':   'priority-medium',
    'Scazut':  'priority-low',
  }[task.priority] || 'priority-medium';

  return (
    <li className={`task-card ${task.completed ? 'task-done' : ''} ${isOverdue ? 'task-overdue' : ''}`}>

      {/* Buton bifare */}
      <button
        className="check-btn"
        onClick={() => !task.completed && onComplete(task.id)}
        disabled={task.completed}
        title={task.completed ? 'Deja finalizat' : 'Marcheaza ca finalizat'}
      >
        {task.completed ? '✓' : ''}
      </button>

      {/* Continut principal */}
      <div className="task-body">
        <span className="task-text">{task.text}</span>

        {/* Informatii secundare: data creare + deadline */}
        <div className="task-meta-row">
          <span className="task-meta">Adaugat: {createdDate}</span>
          {deadlineStr && (
            <span className={`task-deadline ${isOverdue ? 'deadline-overdue' : ''}`}>
              ⏰ Termen: {deadlineStr}
            </span>
          )}
        </div>
      </div>

      {/* Badge prioritate */}
      <span className={`priority-badge ${priorityClass}`}>
        {task.priority}
      </span>

      {/* Badge status */}
      <span className={`task-badge ${task.completed ? 'badge-done' : 'badge-active'}`}>
        {task.completed ? 'Finalizat' : 'Activ'}
      </span>

      {/* Buton stergere */}
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id, task.text)}
        title="Sterge sarcina"
      >
        ✕
      </button>

    </li>
  );
}