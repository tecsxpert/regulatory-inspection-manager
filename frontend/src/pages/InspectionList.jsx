import { useEffect, useState } from "react";

function InspectionList({ onEdit }) {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    try {
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

  const handleDelete = (id) => {
    const updated = inspections.filter((item) => item.id !== id);
    setInspections(updated);
  };

  if (loading)
    return <p className="p-4 text-gray-600">Loading...</p>;

  if (inspections.length === 0)
    return <p className="p-4 text-gray-600">No inspections found</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Inspection List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Body</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inspections.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.body}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.status}</td>
                <td className="p-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InspectionList;