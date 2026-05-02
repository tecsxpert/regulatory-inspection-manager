import { useState } from "react";

function AIPanel() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleGenerate = () => {
    if (!query) return;

    setLoading(true);
    setResponse("");

    // 👉 Mock AI delay
    setTimeout(() => {
      setResponse(`AI Insight: "${query}" looks good. No major risks found.`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">AI Assistant</h2>

      <div className="bg-white p-4 shadow rounded flex flex-col gap-4 w-96">
        <input
          type="text"
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleGenerate}
          className="bg-purple-500 text-white p-2 rounded"
        >
          Generate
        </button>

        {loading && <p className="text-blue-500">Loading...</p>}

        {response && (
          <div className="bg-gray-100 p-3 rounded">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIPanel;