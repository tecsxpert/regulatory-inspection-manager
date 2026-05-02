import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (success) {
      setMessage("Login successful");
    } else {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow rounded flex flex-col gap-4 w-80"
      >
        <h2 className="text-xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>

        <p className="text-sm text-gray-600">{message}</p>
      </form>
    </div>
  );
}

export default Login;