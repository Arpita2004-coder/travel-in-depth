import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import PlaceForm from "../../components/admin/PlaceForm";
import * as adminApi from "../../api/adminApi";

function AdminPlaceFormPage() {
  const { id: slug } = useParams(); // route param is named "id" but we treat it as the slug
  const isEditMode = Boolean(slug);
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;
    adminApi
      .getDestinationBySlug(slug)
      .then(setInitialData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug, isEditMode]);

  const handleSubmit = async (formData) => {
    if (isEditMode) {
      await adminApi.updateDestination(slug, formData);
    } else {
      await adminApi.createDestination(formData);
    }
    navigate("/admin/places");
  };

  return (
    <AdminLayout>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#8B1A1A", marginBottom: 24 }}>
        {isEditMode ? "Edit Place" : "Add New Place"}
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && (!isEditMode || initialData) && (
        <PlaceForm initialData={initialData} onSubmit={handleSubmit} submitLabel={isEditMode ? "Update Place" : "Create Place"} />
      )}
    </AdminLayout>
  );
}

export default AdminPlaceFormPage;