// File: src/pages/Home.jsx

import IssueCard from "../components/IssueCard";

const dummyIssues = [
  {
    id: 1,
    title: "Open Garbage Dump",
    description: "Overflowing garbage at Sector 21. Needs urgent cleaning.",
    category: "Cleanliness",
    image: "https://via.placeholder.com/150",
    status: "Reported",
  },
  {
    id: 2,
    title: "Street Light Not Working",
    description: "Dark street at night in Block A, Sector 45.",
    category: "Electricity",
    image: "https://via.placeholder.com/150",
    status: "In Progress",
  },
];

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Reported Issues</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {dummyIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}

export default Home;
