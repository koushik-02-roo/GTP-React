
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

    function logout() {
        localStorage.removeItem("currentUser");
        navigate("/");
    }

    return (
        <header>
            <div className="logo">🎮 GTP</div>

            <nav>
                <Link to="/">Home</Link>
                <a href="/#tournaments">Tournaments</a>

                {user ? (
                    <>
                        <Link to={user.role === "admin" ? "/admin" : "/user"}>
                            Dashboard
                        </Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="register-btn">
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Navbar;

