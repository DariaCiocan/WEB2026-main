// src/components/TaskInput.jsx
import { useTaskForm } from '../hooks/useTaskForm';

export default function TaskInput({ onAdd }) {
  const {
    text, priority, deadline, deadlineTime, error, shake,
    handleChange, setPriority, setDeadline, setDeadlineTime, handleSubmit,
  } = useTaskForm(onAdd);

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>

      {/* Randul 1: Input text + buton adauga */}
      <div className={`input-row ${shake ? 'shake' : ''}`}>
        <input
          type="text"
          className={`task-input ${error ? 'input-error' : ''}`}
          placeholder="Adauga o sarcina noua..."
          value={text}
          onChange={handleChange}
          maxLength={200}
          autoFocus
        />
        <button type="submit" className="add-btn">
          <span>+</span> Adauga
        </button>
      </div>

      {/* Randul 2: Prioritate + Data limita + Ora limita */}
      <div className="form-extra-row">

        {/* Select prioritate */}
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Ridicat">🔴 Ridicat</option>
          <option value="Mediu">🟡 Mediu</option>
          <option value="Scazut">🟢 Scazut</option>
        </select>

        {/* Input data limita */}
        <input
          type="date"
          className="date-input"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          title="Data limita (optional)"
        />

        {/* Input ora limita */}
        <input
          type="time"
          className="time-input"
          value={deadlineTime}
          onChange={(e) => setDeadlineTime(e.target.value)}
          title="Ora limita (optional)"
          disabled={!deadline} // ora e disponibila doar daca exista data
        />

      </div>

      {/* Mesaj eroare */}
      {error && <p className="error-msg">⚠ {error}</p>}

    </form>
  );
}