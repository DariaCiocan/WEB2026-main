// src/App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Radacina aplicatiei React.
// Aceasta componenta este simpla intentionat: rolul ei este doar sa monteze
// pagina principala (TasksPage). Logica de state si efectele se afla in
// TasksPage si in hook-urile custom dedicate.
//
// Daca aplicatia va creste (ex: pagini multiple), aici se va adauga un Router
// (React Router) si layout-urile comune (navbar, sidebar etc.).
// ─────────────────────────────────────────────────────────────────────────────

import TasksPage from './pages/TasksPage';
import './App.css'; // Importam stilurile globale ale aplicatiei

/**
 * Componenta radacina.
 * Montata in <div id="root"> din index.html prin main.jsx.
 */
export default function App() {
  return <TasksPage />;
}
