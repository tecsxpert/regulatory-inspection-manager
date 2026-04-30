import React, { useState } from "react";
import api from "../services/api";

function AddInspection() {
  const [form, setForm] = useState({
    inspection_name: "",
    regulatory_body: "",
    inspection_date: "",
    status: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 👉 TEMP (until backend ready)
      console.log("Form Data:", form);

      // 👉 Later use:
      // await api.post("/inspections", form);

      alert("Inspection added (mock)");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Inspection</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="inspection_name"
          placeholder="Inspection Name"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="regulatory_body"
          placeholder="Regulatory Body"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="date"
          name="inspection_date"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddInspection;