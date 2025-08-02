import React from "react";

function Blog() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">CivicTracker Blog</h2>
      <p className="mb-2">
        Welcome to our blog! Here you’ll find the latest updates, features, and
        community stories about how CivicTracker is helping improve civic life.
      </p>
      <ul className="list-disc pl-6">
        <li>🚧 Tips to report civic issues effectively</li>
        <li>📈 How CivicTracker data is used by authorities</li>
        <li>🌟 Success stories from engaged citizens</li>
      </ul>
    </div>
  );
}

export default Blog;
