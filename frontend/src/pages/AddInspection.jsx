import { useState, useEffect } from "react";

function AddInspection({ selectedInspection, setPage }) {
  const [form, setForm] = useState({
    name: "",
    body: "",
    date: "",
    status: "",
  });

  useEffect(() => {
    if (selectedInspection) {
      setForm(selectedInspection);
    }
  }, [selectedInspection]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Data:", form);

    setPage("list");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {selectedInspection ? "Edit Inspection" : "Add Inspection"}
      </h2>

      <form className="bg-white p-6 shadow rounded flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Inspection Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          name="body"
          placeholder="Regulatory Body"
          value={form.body}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
          {selectedInspection ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddInspection;