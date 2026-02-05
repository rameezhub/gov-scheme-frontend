import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = "https://gov-scheme-backend-1.onrender.com";

function SchemeList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/schemes?category=${category}`)
      .then((res) => res.json())
      .then(setSchemes);
  }, [category]);

  return (
    <div className="page">
      <h2>{category}</h2>

      {schemes.map((s) => (
        <div
          key={s.id}
          className="scheme-card"
          onClick={() => navigate(`/scheme/${s.id}`)}
        >
          <h4>{s.name}</h4>
          <p>{s.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SchemeList;
