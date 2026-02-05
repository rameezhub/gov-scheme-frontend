function Home() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api("/api/schemes").then(setCategories);
  }, []);

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

      const results = await api(
        `/api/schemes?search=${encodeURIComponent(spokenText)}`
      );
      setSchemes(results);
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
            key={item.id || item.name}
            className="card orange"
            onClick={() => navigate(`/schemes/${item.name}`)}
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
