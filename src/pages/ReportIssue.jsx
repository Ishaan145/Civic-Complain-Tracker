import React, { useState } from "react";

function ReportIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Optionally reset form after submit
    // setForm({ title: "", description: "", category: "", image: null });
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Report a New Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="road">Road</option>
          <option value="water">Water</option>
          <option value="clean">Cleanliness</option>
        </select>

        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReportIssue;
