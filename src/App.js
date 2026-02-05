import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./services/api";

/* -------- Protected Route -------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

/* -------- Login -------- */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

/* -------- Home -------- */
function Home() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    api("/api/schemes").then(setSchemes);
  }, []);

  return (
    <div>
      <h2>Government Schemes</h2>
      {schemes.map((s) => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  );
}

/* -------- Scheme List -------- */
function SchemeList() {
  const { category } = useParams();
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    api(`/api/schemes?category=${category}`).then(setSchemes);
  }, [category]);

  return (
    <div>
      <h2>Schemes</h2>
      {schemes.map((s) => (
        <div key={s.id}>{s.name}</div>
      ))}
    </div>
  );
}

/* -------- APP (DEFAULT EXPORT — THIS IS THE KEY) -------- */
function App() {
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
      <Route
        path="/schemes/:category"
        element={
          <ProtectedRoute>
            <SchemeList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
