// src/hooks/useTaskForm.js
import { useState } from 'react';

export function useTaskForm(onSubmit) {
  const [text,         setText]         = useState('');
  const [priority,     setPriority]     = useState('Mediu');  // default: Mediu
  const [deadline,     setDeadline]     = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [error,        setError]        = useState('');
  const [shake,        setShake]        = useState(false);

  async function handleSubmit(e) {
    e?.preventDefault();

    // Validare camp gol
    if (!text.trim()) {
      setError('Sarcina nu poate fi goala!');
      triggerShake();
      return;
    }

    // Validare: daca s-a pus ora, trebuie sa existe si data
    if (deadlineTime && !deadline) {
      setError('Trebuie sa selectezi si o data limita daca adaugi ora!');
      triggerShake();
      return;
    }

    setError('');
    try {
      await onSubmit(text.trim(), priority, deadline || null, deadlineTime || null);
      // Reset dupa succes
      setText('');
      setPriority('Mediu');
      setDeadline('');
      setDeadlineTime('');
    } catch (err) {
      setError(err.message);
      triggerShake();
    }
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }

  function handleChange(e) {
    setText(e.target.value);
    if (error) setError('');
  }

  return {
    text, priority, deadline, deadlineTime, error, shake,
    handleChange,
    setPriority,
    setDeadline,
    setDeadlineTime,
    handleSubmit,
  };
}