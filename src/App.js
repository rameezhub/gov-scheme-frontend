function Home() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();

  // Load categories / initial schemes
  useEffect(() => {
    async function load() {
      try {
        const data = await api("/api/schemes"); // temp: schemes as categories
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    load();
  }, []);

  // Text search → backend
  useEffect(() => {
    if (!query) {
      setSchemes([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const results = await api(
          `/api/schemes?search=${encodeURIComponent(query)}`
        );
        setSchemes(results);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // 🎤 Voice search → backend
  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = async (e) => {
      const spokenText = e.results[0][0].transcript;
      setQuery(spokenText);
    };
  };

  const list = schemes.length ? schemes : categories;

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
        {list.map((item) => (
          <div
            key={item.id}
            className="card orange"
            onClick={() =>
              navigate(`/schemes/${encodeURIComponent(item.name)}`)
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
