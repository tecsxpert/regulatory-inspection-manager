import { useState, useEffect } from "react";

function AddInspection({ selectedInspection, setPage }) {
  const [form, setForm] = useState({
    name: "",
    body: "",
    date: "",
    status: "",
  });

  // ✅ Prefill for edit
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

    // 👉 No backend, just navigate back
    setPage("list");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {selectedInspection ? "Edit Inspection" : "Add Inspection"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/3">
        <input
          type="text"
          name="name"
          placeholder="Inspection Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          type="text"
          name="body"
          placeholder="Regulatory Body"
          value={form.body}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
          className="border p-2"
          required
        />

        <button className="bg-green-500 text-white p-2 rounded">
          {selectedInspection ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddInspection;