
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import AdminDashboard from "./components/pages/AdminDashboard";
import UserDashboard from "./components/pages/userdashboard";

import "./style.css";

function ProtectedRoute({ role, children }) {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppLayout() {
  const location = useLocation();

  const authPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!authPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!authPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

