
import { useState } from "react";

function AdminDashboard() {
  const [tournaments, setTournaments] = useState(() =>
    JSON.parse(localStorage.getItem("tournaments") || "[]")
  );

  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [prize, setPrize] = useState("");

  function addTournament(e) {
    e.preventDefault();

    const newTournament = {
      id: Date.now(),
      name,
      game,
      prize
    };

    const updated = [...tournaments, newTournament];

    setTournaments(updated);
    localStorage.setItem(
      "tournaments",
      JSON.stringify(updated)
    );

    setName("");
    setGame("");
    setPrize("");
  }

  function deleteTournament(id) {
    const updated = tournaments.filter(
      (t) => t.id !== id
    );

    setTournaments(updated);
    localStorage.setItem(
      "tournaments",
      JSON.stringify(updated)
    );
  }

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <p>Manage Gaming Tournaments</p>

      <form className="admin-form" onSubmit={addTournament}>
        <input
          placeholder="Tournament Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Game Name"
          value={game}
          onChange={(e) => setGame(e.target.value)}
          required
        />

        <input
          placeholder="Prize Amount"
          value={prize}
          onChange={(e) => setPrize(e.target.value)}
          required
        />

        <button type="submit">Add Tournament</button>
      </form>

      <h2>Manage Tournaments</h2>

      <div className="tournament-grid">
        {tournaments.map((t) => (
          <div className="card" key={t.id}>
            <h3>{t.name}</h3>
            <p>Game: {t.game}</p>
            <p>Prize: {t.prize}</p>
            <button onClick={() => deleteTournament(t.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <p>Total Tournaments: {tournaments.length}</p>
    </div>
  );
}

export default AdminDashboard;
