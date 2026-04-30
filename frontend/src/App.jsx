import React, { useState } from "react";
import InspectionList from "./pages/InspectionList";
import AddInspection from "./pages/AddInspection";

function App() {
  const [page, setPage] = useState("list");

  return (
    <div>
      <div className="p-4 bg-gray-200 flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => setPage("list")}
        >
          View Inspections
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={() => setPage("add")}
        >
          Add Inspection
        </button>
      </div>

      {page === "list" && <InspectionList />}
      {page === "add" && <AddInspection />}
    </div>
  );
}

export default App;