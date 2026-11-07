
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    game: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function registerValidation(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!form.username.trim()) {
      setError("Please enter a username.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.game) {
      setError("Please select your favorite game.");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const exists = users.some(
      (u) =>
        u.email.toLowerCase() === form.email.trim().toLowerCase() ||
        u.username.toLowerCase() === form.username.trim().toLowerCase()
    );

    if (exists) {
      setError("Email or username already exists.");
      return;
    }

    const newUser = {
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      game: form.game,
      role: "user",
      joinedTournaments: []
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    navigate("/login");
  }

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-box">

          <h1>🎮 GTP</h1>

          <h2>Create Account</h2>

          <p className="subtitle">
            Register to join gaming tournaments
          </p>

          <form onSubmit={registerValidation}>

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Create a username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <label>Select Game</label>
            <select
              name="game"
              value={form.game}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Game --</option>
              <option value="Free Fire">Free Fire</option>
              <option value="BGMI">BGMI</option>
              <option value="Valorant">Valorant</option>
              <option value="Call of Duty">Call of Duty</option>
            </select>

            <p className="error">{error}</p>

            <button type="submit" className="auth-btn">
              REGISTER
            </button>

          </form>

          <p className="bottom-text">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

          <Link to="/" className="back-home">
            ← Back to Home
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Signup;

