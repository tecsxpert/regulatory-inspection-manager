import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  // ✅ Mock data
  const stats = {
    total: 20,
    pending: 8,
    completed: 10,
    failed: 2,
  };

  const chartData = [
    { name: "Pending", value: 8 },
    { name: "Completed", value: 10 },
    { name: "Failed", value: 2 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <p>Total</p>
          <h3 className="text-xl">{stats.total}</h3>
        </div>

        <div className="bg-yellow-100 p-4 shadow rounded">
          <p>Pending</p>
          <h3 className="text-xl">{stats.pending}</h3>
        </div>

        <div className="bg-green-100 p-4 shadow rounded">
          <p>Completed</p>
          <h3 className="text-xl">{stats.completed}</h3>
        </div>

        <div className="bg-red-100 p-4 shadow rounded">
          <p>Failed</p>
          <h3 className="text-xl">{stats.failed}</h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 shadow rounded">
        <BarChart width={400} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default Dashboard;