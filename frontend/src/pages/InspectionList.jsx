import React, { useEffect, useState } from "react";
import api from "../services/api";

function InspectionList() {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    try {
      // 👉 Temporary mock data
      const data = [
        {
          id: 1,
          inspection_name: "Food Safety Check",
          regulatory_body: "FDA",
          inspection_date: "2025-01-01",
          status: "Pending"
        },
        {
          id: 2,
          inspection_name: "Quality Audit",
          regulatory_body: "ISO",
          inspection_date: "2025-02-15",
          status: "Completed"
        }
      ];

      setInspections(data);

      // 👉 Later replace with:
      // const response = await api.get("/inspections");
      // setInspections(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete function
  const handleDelete = async (id) => {
    try {
      // 👉 Mock delete (remove from UI)
      const updated = inspections.filter(item => item.id !== id);
      setInspections(updated);

      // 👉 Later use real API:
      // await api.delete(`/inspections/${id}`);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Inspections List
      </h1>

      {/* ✅ Loading */}
      {loading && <p>Loading...</p>}

      {/* ✅ Empty State */}
      {!loading && inspections.length === 0 && (
        <p>No inspections available</p>
      )}

      {/* ✅ Table */}
      {!loading && inspections.length > 0 && (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Regulatory Body</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inspections.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.inspection_name}</td>
                <td className="p-2 border">{item.regulatory_body}</td>
                <td className="p-2 border">{item.inspection_date}</td>
                <td className="p-2 border">{item.status}</td>

                <td className="p-2 border">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InspectionList;