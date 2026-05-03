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

    if (!form.name || !form.body || !form.date || !form.status) {
      alert("All fields are required!");
      return;
    }

    console.log("Submitted:", form);
    setPage("list");
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded flex flex-col gap-4 w-full max-w-md"
      >
        <h2 className="text-xl font-bold">
          {selectedInspection ? "Edit Inspection" : "Add Inspection"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Inspection Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="body"
          placeholder="Regulatory Body"
          value={form.body}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button className="bg-green-500 text-white p-2 rounded">
          {selectedInspection ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddInspection;