import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    // ✅ Type validation
    if (!selected.type.includes("csv")) {
      setMessage("Only CSV files allowed");
      return;
    }

    // ✅ Size validation (2MB)
    if (selected.size > 2 * 1024 * 1024) {
      setMessage("File too large (max 2MB)");
      return;
    }

    setFile(selected);
    setMessage("File ready to upload");
  };

  const handleUpload = () => {
    if (!file) return;

    // 👉 Mock upload
    setMessage("File uploaded successfully");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload CSV</h2>

      <div className="bg-white p-4 shadow rounded w-96 flex flex-col gap-4">
        <input type="file" onChange={handleChange} />

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Upload
        </button>

        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default FileUpload;