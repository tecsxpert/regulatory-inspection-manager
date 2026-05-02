import { useState } from "react";
import InspectionList from "./pages/InspectionList";
import AddInspection from "./pages/AddInspection";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import AIPanel from "./pages/AIPanel";
import FileUpload from "./pages/FileUpload";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth } from "./auth/AuthContext";

function App() {
  const { user, logout } = useAuth();

  const [page, setPage] = useState("dashboard");
  const [selectedInspection, setSelectedInspection] = useState(null);

  const handleEdit = (item) => {
    setSelectedInspection(item);
    setPage("add");
  };

  // 👉 If not logged in
  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <h1 className="text-xl font-bold">Inspection Manager</h1>

        <div className="flex flex-wrap gap-2">
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
            onClick={() => setPage("analytics")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
          >
            Analytics
          </button>

          <button
            onClick={() => setPage("ai")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
          >
            AI
          </button>

          <button
            onClick={() => setPage("upload")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
          >
            Upload
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

          {page === "analytics" && <Analytics />}

          {page === "ai" && <AIPanel />}

          {page === "upload" && <FileUpload />}
        </ProtectedRoute>
      </div>
    </div>
  );
}

export default App;