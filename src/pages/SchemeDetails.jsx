import { useParams, useNavigate } from "react-router-dom";
import "./SchemeDetail.css";

const SCHEME_DATA = {
  farmer: [
    {
      id: 1,
      name: "PM Kisan Samman Nidhi",
      description: "₹6000 yearly income support for farmers",
      benefits: "₹2000 paid every 4 months",
      eligibility: "Small & marginal farmers",
    },
    {
      id: 2,
      name: "Crop Insurance Scheme",
      description: "Insurance against crop loss",
      benefits: "Low premium insurance",
      eligibility: "All registered farmers",
    },
  ],
};

export default function SchemeDetail() {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const scheme = SCHEME_DATA[category]?.find(
    (s) => s.id === Number(id)
  );

  if (!scheme) {
    return <p>Scheme not found</p>;
  }

  return (
    <div className="detail">
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{scheme.name}</h2>
      <p><strong>Description:</strong> {scheme.description}</p>
      <p><strong>Benefits:</strong> {scheme.benefits}</p>
      <p><strong>Eligibility:</strong> {scheme.eligibility}</p>

      <button className="apply">Apply Now</button>
    </div>
  );
}
