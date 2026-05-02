import { useState } from "react";
import InspectionList from "./pages/InspectionList";
import AddInspection from "./pages/AddInspection";

function App() {
  const [page, setPage] = useState("list");
  const [selectedInspection, setSelectedInspection] = useState(null);

  const handleEdit = (item) => {
    setSelectedInspection(item);
    setPage("add");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Inspection Manager</h1>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setPage("list");
              setSelectedInspection(null);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
          >
            View
          </button>

          <button
            onClick={() => {
              setPage("add");
              setSelectedInspection(null);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {page === "list" && (
          <InspectionList onEdit={handleEdit} />
        )}

        {page === "add" && (
          <AddInspection
            selectedInspection={selectedInspection}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;