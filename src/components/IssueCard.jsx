import { Link } from "react-router-dom";

function IssueCard({ issue }) {
  const placeholderImage = "/placeholder.png"; // Provide a default image in case `issue.image` is missing

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      width: "260px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}>
      <img
        src={issue.image || placeholderImage}
        alt={issue.title}
        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px" }}
      />
      <h3 style={{ marginTop: "12px", fontSize: "1.1rem", color: "#333" }}>
        {issue.title}
      </h3>
      <p style={{ fontSize: "0.9rem", color: "#555", margin: "6px 0" }}>
        {issue.description.length > 100
          ? issue.description.slice(0, 100) + "..."
          : issue.description}
      </p>
      <p style={{ fontSize: "0.85rem", fontWeight: "bold", color: issue.status === "Resolved" ? "green" : "orange" }}>
        Status: {issue.status}
      </p>
      <Link
        to={`/issue/${issue.id}`}
        style={{
          display: "inline-block",
          marginTop: "10px",
          textDecoration: "none",
          color: "#007bff",
          fontWeight: "bold"
        }}
      >
        View Details →
      </Link>
    </div>
  );
}

export default IssueCard;
