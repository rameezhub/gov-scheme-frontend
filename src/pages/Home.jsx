import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api("/api/categories").then(setCategories);
  }, []);

  return (
    <div className="grid">
      {categories.map((c) => (
        <div
          key={c.id}
          className="card"
          onClick={() => navigate(`/schemes/${c.slug}`)}
        >
          <div className="icon">{c.icon}</div>
          <p>{c.name}</p>
        </div>
      ))}
    </div>
  );
}
