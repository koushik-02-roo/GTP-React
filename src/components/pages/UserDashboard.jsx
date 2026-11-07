
import { useState } from "react";

function UserDashboard() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [tournaments, setTournaments] = useState(() =>
    JSON.parse(localStorage.getItem("tournaments") || "[]")
  );

  const [joined, setJoined] = useState(
    currentUser?.joinedTournaments || []
  );

  function joinTournament(id) {
    if (joined.includes(id)) {
      alert("You already joined this tournament!");
      return;
    }

    const updatedJoined = [...joined, id];

    setJoined(updatedJoined);

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const updatedUsers = users.map((u) =>
      u.email === currentUser.email
        ? { ...u, joinedTournaments: updatedJoined }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedCurrentUser = {
      ...currentUser,
      joinedTournaments: updatedJoined
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedCurrentUser)
    );

    alert("Successfully joined tournament!");
  }

  return (
    <div className="container">
      <h1>User Dashboard</h1>
      <p>Welcome, {currentUser?.name}!</p>

      <h2>Available Tournaments</h2>

      <div className="tournament-grid">
        {tournaments.length === 0 ? (
          <p>No tournaments available yet.</p>
        ) : (
          tournaments.map((t) => (
            <div className="card" key={t.id}>
              <h3>{t.name}</h3>
              <p>Game: {t.game}</p>
              <p>Prize: {t.prize}</p>

              <button
                onClick={() => joinTournament(t.id)}
                disabled={joined.includes(t.id)}
              >
                {joined.includes(t.id) ? "Joined" : "Join"}
              </button>
            </div>
          ))
        )}
      </div>

      <h2>My Joined Tournaments</h2>
      <p>You have joined {joined.length} tournament(s).</p>
    </div>
  );
}

export default UserDashboard;
