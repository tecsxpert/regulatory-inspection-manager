import { useState } from "react";
import InspectionList from "./pages/InspectionList";
import AddInspection from "./pages/AddInspection";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth } from "./auth/AuthContext";

function App() {
  const { user, logout } = useAuth();

  // 👉 Default page = dashboard after login
  const [page, setPage] = useState("dashboard");
  const [selectedInspection, setSelectedInspection] = useState(null);

  const handleEdit = (item) => {
    setSelectedInspection(item);
    setPage("add");
  };

  // 👉 If not logged in → show login page
  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Inspection Manager</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setPage("dashboard")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
          >
            Dashboard
          </button>

          <button
            onClick={() => {
              setPage("list");
              setSelectedInspection(null);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            View
          </button>

          <button
            onClick={() => {
              setPage("add");
              setSelectedInspection(null);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <ProtectedRoute>
          {page === "dashboard" && <Dashboard />}

          {page === "list" && (
            <InspectionList onEdit={handleEdit} />
          )}

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