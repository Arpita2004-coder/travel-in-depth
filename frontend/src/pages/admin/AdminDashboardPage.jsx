import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import * as adminApi from "../../api/adminApi";

function AdminDashboardPage() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getAllDestinations()
      .then((data) => setCount(data.length))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <AdminLayout>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#8B1A1A", marginBottom: 24 }}>Admin Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ background: "#fff", padding: 24, borderRadius: 12, width: 220 }}>
        <p style={{ fontSize: 13, color: "#8B1A1A99", marginBottom: 8 }}>Total Destinations</p>
        <p style={{ fontSize: 32, fontWeight: 700, color: "#8B1A1A" }}>{count ?? "..."}</p>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;