import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password);
      if (user.role !== "admin") {
        setError("This account does not have admin access.");
        return;
      }
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FDF6EC" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 12, width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#8B1A1A" }}>Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
        />
        {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}
        <button
          type="submit"
          style={{ padding: "10px 20px", borderRadius: 8, background: "#8B1A1A", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;