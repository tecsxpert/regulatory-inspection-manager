import { useEffect, useState } from "react";

function InspectionList({ onEdit }) {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    try {
      // ✅ MOCK DATA (no backend needed)
      const data = [
        {
          id: 1,
          name: "Food Safety Check",
          body: "FDA",
          date: "2025-01-01",
          status: "Pending",
        },
        {
          id: 2,
          name: "Quality Audit",
          body: "ISO",
          date: "2025-02-15",
          status: "Completed",
        },
      ];

      setInspections(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Mock delete
  const handleDelete = (id) => {
    const updated = inspections.filter((item) => item.id !== id);
    setInspections(updated);
  };

  if (loading) return <p className="p-4">Loading...</p>;

  if (inspections.length === 0)
    return <p className="p-4">No inspections found</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Inspection List</h2>

      <table className="table-auto border w-full">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-2">Name</th>
            <th className="border px-2">Body</th>
            <th className="border px-2">Date</th>
            <th className="border px-2">Status</th>
            <th className="border px-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {inspections.map((item) => (
            <tr key={item.id}>
              <td className="border px-2">{item.name}</td>
              <td className="border px-2">{item.body}</td>
              <td className="border px-2">{item.date}</td>
              <td className="border px-2">{item.status}</td>
              <td className="border px-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InspectionList;