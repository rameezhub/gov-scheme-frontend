import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = "https://gov-scheme-backend-1.onrender.com";

function SchemeDetails() {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/schemes/${id}`)
      .then((res) => res.json())
      .then(setScheme);
  }, [id]);

  if (!scheme) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>{scheme.name}</h2>
      <p>{scheme.description}</p>

      <h4>Benefits</h4>
      <p>{scheme.benefits}</p>

      <h4>Documents Required</h4>
      <p>{scheme.documentsRequired}</p>
    </div>
  );
}

export default SchemeDetails;
