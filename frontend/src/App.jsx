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
    <div>
      {/* Navbar */}
      <div className="p-4 bg-gray-200 flex gap-4">
        <button
          onClick={() => {
            setPage("list");
            setSelectedInspection(null);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          View Inspections
        </button>

        <button
          onClick={() => {
            setPage("add");
            setSelectedInspection(null);
          }}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add Inspection
        </button>
      </div>

      {/* Pages */}
      {page === "list" && <InspectionList onEdit={handleEdit} />}

      {page === "add" && (
        <AddInspection
          selectedInspection={selectedInspection}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default App;