import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { api } from "./services/api";

/* ---------------- Protected Route ---------------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

/* ---------------- Login ---------------- */
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
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}

/* ---------------- Home (FIXED) ---------------- */
function Home() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [schemes, setSchemes] = useState([]); // ✅ THIS WAS MISSING
  const navigate = useNavigate();

  useEffect(() => {
    api("/api/categories").then(setCategories);
  }, []);

  /* 🎤 Voice Search → Backend */
  const startVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = async (e) => {
      const spokenText = e.results[0][0].transcript;
      setQuery(spokenText);

      const results = await api(
        `/api/schemes?search=${encodeURIComponent(spokenText)}`
      );
      setSchemes(results); // ✅ NOW DEFINED
    };
  };

  return (
    <div className="app">
      <div className="header">
        <h3>Hello, Ruturaj</h3>
      </div>

      <input
        className="search"
        placeholder="Search schemes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid">
        {(schemes.length ? schemes : categories).map((item) => (
          <div
            key={item.id}
            className="card orange"
            onClick={() =>
              item.slug && navigate(`/schemes/${item.slug}`)
            }
          >
            <div className="icon">{item.icon || "📄"}</div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <button className="mic" onClick={startVoiceSearch}>
        🎤
      </button>
    </div>
  );
}

/* ---------------- Scheme List ---------------- */
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
