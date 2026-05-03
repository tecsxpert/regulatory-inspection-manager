import { useEffect, useState } from "react";

function InspectionList({ onEdit }) {
  const [inspections, setInspections] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const data = [
      { id: 1, name: "Food Check", body: "FDA", date: "2025-01-01", status: "Pending" },
      { id: 2, name: "Quality Audit", body: "ISO", date: "2025-02-10", status: "Completed" },
      { id: 3, name: "Safety Check", body: "WHO", date: "2025-03-05", status: "Failed" },
    ];

    setInspections(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    let result = inspections;

    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      result = result.filter((item) => item.status === statusFilter);
    }

    setFiltered(result);
  }, [search, statusFilter, inspections]);

  const handleDelete = (id) => {
    const updated = inspections.filter((item) => item.id !== id);
    setInspections(updated);
    setFiltered(updated);
  };

  const handleExport = () => {
    const csv = [
      ["Name", "Body", "Date", "Status"],
      ...filtered.map((i) => [i.name, i.body, i.date, i.status]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "inspections.csv";
    a.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Inspection List</h2>

      {/* Export */}
      <button
        onClick={handleExport}
        className="bg-gray-700 text-white px-3 py-1 rounded mb-4"
      >
        Export CSV
      </button>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-64"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-48"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Body</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.body}</td>
                <td className="p-2">{item.date}</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-400 px-2 py-1 rounded mr-2"
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

      {filtered.length === 0 && (
        <p className="mt-4 text-gray-500">No results found</p>
      )}
    </div>
  );
}

export default InspectionList;