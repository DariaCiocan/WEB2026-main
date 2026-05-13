// src/components/Toast.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Componenta de notificare temporara (toast notification).
//
// Apare in coltul din dreapta-jos al ecranului cu un mesaj scurt si dispare
// automat dupa 2.5 secunde (timer-ul este gestionat in TasksPage, nu aici).
//
// Props:
//   message {string} - textul de afisat; daca e gol (""), componenta nu
//                      randeaza nimic (early return null)
//   type    {string} - "success" | "error" — determina culorile CSS
//
// Accesibilitate: atributul role="alert" anunta cititoarele de ecran
// ca a aparut un mesaj important fara a muta focusul utilizatorului.
// ─────────────────────────────────────────────────────────────────────────────

export default function Toast({ message, type }) {
  // Nu randam nimic daca nu exista mesaj activ
  if (!message) return null;

  return (
    // role="alert" => ARIA live region: cititoarele de ecran citesc automat
    <div className={`toast toast-${type}`} role="alert">
      {message}
    </div>
  );
}
