import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import PlacesTable from "../../components/admin/PlacesTable";
import * as adminApi from "../../api/adminApi";

function AdminPlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPlaces = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getAllDestinations();
      setPlaces(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  const handleDelete = async (slug) => {
    if (!window.confirm(`Delete this destination? This cannot be undone.`)) return;
    try {
      await adminApi.deleteDestination(slug);
      setPlaces((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#8B1A1A" }}>Places</h1>
        <Link
          to="/admin/places/new"
          style={{ padding: "10px 20px", borderRadius: 8, background: "#8B1A1A", color: "#fff", fontWeight: 600, textDecoration: "none" }}
        >
          + Add New Place
        </Link>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <PlacesTable places={places} onDelete={handleDelete} />}
    </AdminLayout>
  );
}

export default AdminPlacesPage;