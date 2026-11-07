
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function loginValidation(e) {
    e.preventDefault();
    setError("");

    const user = loginUser.trim();

    if (!user) {
      setError("Please enter your email or username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (
      user.toLowerCase() === "admin@gmail.com" &&
      password === "admin123"
    ) {
      const admin = {
        name: "Administrator",
        email: "admin@gmail.com",
        role: "admin"
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(admin)
      );

      alert("Admin login successful!");
      navigate("/admin");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const foundUser = users.find(
      (u) =>
        (u.email.toLowerCase() === user.toLowerCase() ||
          u.username.toLowerCase() === user.toLowerCase()) &&
        u.password === password
    );

    if (!foundUser) {
      setError("Invalid email/username or password.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    alert("Login successful!");
    navigate("/user");
  }

  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="auth-box">

          <h1>🎮 GTP</h1>

          <h2>Welcome Back!</h2>

          <p className="subtitle">
            Login to continue to the Gaming Tournament Portal
          </p>

          <form onSubmit={loginValidation}>

            <label>Email or Username</label>
            <input
              type="text"
              placeholder="Enter email or username"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <p className="error">{error}</p>

            <button type="submit" className="auth-btn">
              LOGIN
            </button>

          </form>

          <p className="bottom-text">
            Don't have an account?{" "}
            <Link to="/register">Register Now</Link>
          </p>

          <Link to="/" className="back-home">
            ← Back to Home
          </Link>

          <div className="admin-info">
            <p>Admin Demo Login</p>
            <p>Email: admin@gmail.com</p>
            <p>Password: admin123</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;

