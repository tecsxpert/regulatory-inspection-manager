import { useState } from "react";
import InspectionList from "./pages/InspectionList";
import AddInspection from "./pages/AddInspection";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth } from "./auth/AuthContext";

function App() {
  const { user, logout } = useAuth();

  const [page, setPage] = useState("list");
  const [selectedInspection, setSelectedInspection] = useState(null);

  const handleEdit = (item) => {
    setSelectedInspection(item);
    setPage("add");
  };

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl font-bold">Inspection Manager</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setPage("list")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            View
          </button>

          <button
            onClick={() => setPage("add")}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">
        <ProtectedRoute>
          {page === "list" && <InspectionList onEdit={handleEdit} />}
          {page === "add" && (
            <AddInspection
              selectedInspection={selectedInspection}
              setPage={setPage}
            />
          )}
        </ProtectedRoute>
      </div>
    </div>
  );
}

export default App;