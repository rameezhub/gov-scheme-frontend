import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "./services/api";

/* ---------------- Protected Route ---------------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

/* ---------------- Login Page ---------------- */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  return (
    <form className="login" onSubmit={login}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

/* ---------------- Home Page ---------------- */
function Home() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api("/api/categories").then(setCategories);
  }, []);

  /* 🎤 Voice Search */
  const startVoiceSearch = () => {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice search not supported on this browser");
    return;
  }

  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = async (e) => {
    const spokenText = e.results[0][0].transcript;
    setQuery(spokenText);

    // 🔗 CALL BACKEND with voice text
    const results = await api(`/api/schemes?search=${spokenText}`);
    setSchemes(results);
  };
};

  return (
    <div className="app">
      <div className="header">
        <h3>Hello, Ruturaj</h3>
        <select>
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>

      <input
        className="search"
        placeholder="Search schemes, loans, licenses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid">
        {categories
          .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
          .map((c) => (
            <div
              key={c.id}
              className={`card ${c.color}`}
              onClick={() => navigate(`/schemes/${c.slug}`)}
            >
              <div className="icon">{c.icon}</div>
              <p>{c.name}</p>
            </div>
          ))}
      </div>

      <button className="mic" onClick={startVoiceSearch}>🎤</button>

      <div className="bottom-nav">
        <span>🏠 Home</span>
        <span>📄 My Docs</span>
        <span>📍 Map</span>
        <span>❓ Help</span>
      </div>
    </div>
  );
}

/* ---------------- Scheme List ---------------- */
function SchemeList({ category }) {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    api(`/api/schemes?category=${category}`).then(setSchemes);
  }, [category]);

  return (
    <div>
      <h2>Schemes</h2>
      {schemes.map((s) => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- App Router ---------------- */
export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
