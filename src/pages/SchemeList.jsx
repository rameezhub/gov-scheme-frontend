import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function SchemeList() {
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
