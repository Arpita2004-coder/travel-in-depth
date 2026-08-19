import { Link } from "react-router-dom";

const PlacesTable = ({ places, onDelete }) => {
  if (places.length === 0) {
    return <p>No destinations yet. Click "Add New Place" to create one.</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ textAlign: "left", borderBottom: "2px solid #E8DCC4" }}>
          <th style={{ padding: "12px 8px" }}>Name</th>
          <th style={{ padding: "12px 8px" }}>State</th>
          <th style={{ padding: "12px 8px" }}>Region</th>
          <th style={{ padding: "12px 8px" }}>Rating</th>
          <th style={{ padding: "12px 8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {places.map((place) => (
          <tr key={place.slug} style={{ borderBottom: "1px solid #E8DCC4" }}>
            <td style={{ padding: "12px 8px", fontWeight: 600 }}>{place.name}</td>
            <td style={{ padding: "12px 8px" }}>{place.state}</td>
            <td style={{ padding: "12px 8px" }}>{place.region}</td>
            <td style={{ padding: "12px 8px" }}>{place.rating}</td>
            <td style={{ padding: "12px 8px", display: "flex", gap: 12 }}>
              <Link to={`/admin/places/${place.slug}/edit`} style={{ color: "#8B1A1A", fontWeight: 600 }}>
                Edit
              </Link>
              <button
                onClick={() => onDelete(place.slug)}
                style={{ color: "#B91C1C", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlacesTable;