import { useState } from "react";

const emptyForm = {
  name: "",
  slug: "",
  state: "",
  region: "",
  tagline: "",
  bestSeason: "",
  rating: "",
  budget: "",
  image: "",
  ecoOptions: "",
  lat: "",
  lng: "",
};

const PlaceForm = ({ initialData, onSubmit, submitLabel = "Save" }) => {
  const [form, setForm] = useState(
    initialData
      ? { ...initialData, ecoOptions: (initialData.ecoOptions || []).join(", ") }
      : emptyForm
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        rating: Number(form.rating),
        lat: Number(form.lat),
        lng: Number(form.lng),
        ecoOptions: form.ecoOptions
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    ["name", "Name"],
    ["slug", "Slug (url-friendly, e.g. manali)"],
    ["state", "State"],
    ["region", "Region (North/South/East/West)"],
    ["tagline", "Tagline"],
    ["bestSeason", "Best Season"],
    ["rating", "Rating (0-5)"],
    ["budget", "Budget (e.g. ₹5k – ₹18k)"],
    ["image", "Image URL"],
    ["ecoOptions", "Eco Options (comma-separated)"],
    ["lat", "Latitude"],
    ["lng", "Longitude"],
  ];

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
      {fields.map(([name, label]) => (
        <label key={name} style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
          {label}
          <input
            name={name}
            value={form[name]}
            onChange={handleChange}
            required
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
          />
        </label>
      ))}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        type="submit"
        disabled={saving}
        style={{ padding: "10px 20px", borderRadius: 8, background: "#8B1A1A", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}
      >
        {saving ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default PlaceForm;