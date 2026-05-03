import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const [period, setPeriod] = useState("monthly");

  // ✅ Mock data
  const data = {
    monthly: [
      { name: "Jan", value: 5 },
      { name: "Feb", value: 8 },
      { name: "Mar", value: 6 },
    ],
    yearly: [
      { name: "2023", value: 40 },
      { name: "2024", value: 55 },
      { name: "2025", value: 70 },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>

      {/* Period Selector */}
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className="border p-2 mb-4 rounded"
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* Chart */}
      <div className="bg-white p-4 shadow rounded">
        <LineChart width={500} height={300} data={data[period]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}

export default Analytics;