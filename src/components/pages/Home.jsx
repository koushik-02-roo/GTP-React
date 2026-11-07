
import { Link } from "react-router-dom";

function Home() {
  const defaultTournaments = [
    {
      id: 1,
      name: "🔥 Free Fire",
      prize: "₹10,000",
      entry: "₹50",
      date: "10 October 2026"
    },
    {
      id: 2,
      name: "🎯 BGMI",
      prize: "₹25,000",
      entry: "₹100",
      date: "15 October 2026"
    },
    {
      id: 3,
      name: "⚡ Valorant",
      prize: "₹20,000",
      entry: "₹100",
      date: "20 October 2026"
    }
  ];

  const savedTournaments = JSON.parse(
    localStorage.getItem("tournaments") || "null"
  );

  const tournaments =
    savedTournaments === null
      ? defaultTournaments
      : savedTournaments;

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            GAMING
            <br />
            <span>TOURNAMENT</span>
            <br />
            PORTAL
          </h1>

          <p>
            Join exciting gaming tournaments,
            compete with players and become a champion.
          </p>

          <Link to="/register" className="main-btn">
            Join Tournament
          </Link>
        </div>
      </section>

      <section id="tournaments" className="tournaments">
        <h2>Upcoming Tournaments</h2>

        <div className="cards">
          {tournaments.map((t) => (
            <div className="card" key={t.id}>
              <h3>{t.name}</h3>

              <p>Prize Pool: {t.prize}</p>
              <p>Entry Fee: {t.entry || "To be announced"}</p>
              <p>Date: {t.date || "To be announced"}</p>

              <Link to="/register">
                <button>Register</button>
              </Link>
            </div>
          ))}

          {tournaments.length === 0 && (
            <p>No tournaments available currently.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;


