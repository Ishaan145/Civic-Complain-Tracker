import { Link } from "react-router-dom";

function IssueCard({ issue }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-72 border border-gray-200">
      <img
        src={issue.image || "/placeholder.jpg"}
        alt={issue.title}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {issue.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {issue.description}
        </p>
        <p className="text-xs text-gray-500 mb-3">
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white ${
              issue.status === "Open"
                ? "bg-green-500"
                : issue.status === "In Progress"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {issue.status}
          </span>
        </p>

        <Link
          to={`/issue/${issue.id}`}
          className="inline-block text-sm text-blue-600 hover:underline font-semibold"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default IssueCard;
