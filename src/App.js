import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./services/api";

/* ---------- Protected Route ---------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

/* ---------- Login ---------- */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

/* ---------- Home ---------- */
function Home() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    api("/api/schemes").then(setSchemes).catch(console.error);
  }, []);

  return (
    <div className="app">
      <h2>Government Schemes</h2>

      {schemes.map((s) => (
        <div key={s.id} className="card">
          <h3>{s.name}</h3>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
