import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ---------------- Static Categories ---------------- */
  useEffect(() => {
    setCategories([
      { name: "Farmer Welfare", slug: "farmer", icon: "🚜" },
      { name: "Education", slug: "education", icon: "🎓" },
      { name: "RTO Services", slug: "rto", icon: "🚗" },
      { name: "Health Schemes", slug: "health", icon: "❤️" },
      { name: "Women & Child", slug: "women", icon: "👩‍👧" },
      { name: "Skill Development", slug: "skill", icon: "⚙️" },
      { name: "Pension Schemes", slug: "pension", icon: "👴👵" },
      { name: "Elderly Schemes", slug: "elderly", icon: "🧓" },
    ]);
  }, []);

  /* ---------------- Search (backend-safe) ---------------- */
  const search = async (text) => {
    setQuery(text);

    if (!text.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://gov-scheme-backend-1.onrender.com/api/schemes?search=${encodeURIComponent(
          text
        )}`
      );

      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Voice Search ---------------- */
  const startVoice = () => {
    const Speech =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Speech) {
      alert("Voice search not supported in this browser");
      return;
    }

    const rec = new Speech();
    rec.lang = "en-IN";
    rec.start();

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      search(text);
    };
  };

  return (
    <div className="home">
      {/* Header */}
      <header>
        <h3>Hello, Ruturaj</h3>
        <select>
          <option>English</option>
        </select>
      </header>

      {/* Search */}
      <input
        className="search"
        placeholder="Search schemes, loans, licenses..."
        value={query}
        onChange={(e) => search(e.target.value)}
      />

      {/* Loading */}
      {loading && <p className="loading">Searching...</p>}

      {/* Grid */}
      <div className="grid">
        {(results.length > 0 ? results : categories).map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() =>
              item.slug ? navigate(`/category/${item.slug}`) : null
            }
          >
            <div className="icon">{item.icon || "📄"}</div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {query && !loading && results.length === 0 && (
        <p className="empty">No schemes found</p>
      )}

      {/* Voice Button */}
      <button className="mic" onClick={startVoice}>
        🎤
      </button>

      {/* Footer */}
      <footer>
        <span className="active">🏠 Home</span>
        <span>📄 My Docs</span>
        <span>📍 Map</span>
        <span>❓ Help</span>
      </footer>
    </div>
  );
}
