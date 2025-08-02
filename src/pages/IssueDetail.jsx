import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const dummyIssues = [
  {
    id: "1",
    title: "Pothole on Main Road",
    description: "Large pothole causing traffic issues.",
    image: "/pothole.jpg",
    status: "Open",
    location: "Sector 12, Main Street",
    date: "2025-08-01",
  },
  {
    id: "2",
    title: "Streetlight not working",
    description: "No streetlight working in the park area.",
    image: "/streetlight.jpg",
    status: "In Progress",
    location: "Park Lane, Sector 7",
    date: "2025-07-28",
  },
];

function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    // Here you'd usually fetch from API. Using dummy data for now:
    const found = dummyIssues.find((i) => i.id === id);
    setIssue(found);
  }, [id]);

  if (!issue) {
    return <div className="p-6">Loading issue...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <img
        src={issue.image || "/placeholder.jpg"}
        alt={issue.title}
        className="w-full h-60 object-cover rounded mb-4"
      />

      <h2 className="text-2xl font-bold mb-2">{issue.title}</h2>
      <p className="text-gray-600 mb-4">{issue.description}</p>

      <div className="mb-4">
        <p><strong>Status:</strong> <span className="text-blue-600">{issue.status}</span></p>
        <p><strong>Location:</strong> {issue.location}</p>
        <p><strong>Reported On:</strong> {issue.date}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <div className="text-sm text-gray-500">Comment system coming soon...</div>
      </div>
    </div>
  );
}

export default IssueDetail;
