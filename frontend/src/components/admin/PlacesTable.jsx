import { useState } from "react";
import { Link } from "react-router-dom";

const isDestinationEnriched = (place) => {
  if (place.isEnriched === true) return true;
  const hasAbout = Boolean(place.about && place.about.trim().length > 30);
  const hasAttractions = Array.isArray(place.attractions) && place.attractions.length > 0;
  const hasFood = Array.isArray(place.foodRecommendations) && place.foodRecommendations.length > 0;
  const hasActivities = Array.isArray(place.activities) && place.activities.length > 0;
  return hasAbout && (hasAttractions || hasFood || hasActivities);
};

const PlacesTable = ({ places, onDelete }) => {
  const [filter, setFilter] = useState("all"); // 'all' | 'needs-enrichment' | 'enriched'
  const [sortByUnenriched, setSortByUnenriched] = useState(true);

  if (places.length === 0) {
    return <p>No destinations yet. Click "Add New Place" to create one.</p>;
  }

  // Determine enriched status for each place
  const enrichedMap = places.map((p) => ({
    ...p,
    computedEnriched: isDestinationEnriched(p),
  }));

  const filteredPlaces = enrichedMap.filter((p) => {
    if (filter === "needs-enrichment") return !p.computedEnriched;
    if (filter === "enriched") return p.computedEnriched;
    return true;
  });

  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortByUnenriched) {
      if (!a.computedEnriched && b.computedEnriched) return -1;
      if (a.computedEnriched && !b.computedEnriched) return 1;
    }
    return a.name.localeCompare(b.name);
  });

  const unenrichedCount = enrichedMap.filter((p) => !p.computedEnriched).length;
  const enrichedCount = enrichedMap.filter((p) => p.computedEnriched).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Filter & Summary Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setFilter("all")}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              border: "1px solid #E8DCC4",
              background: filter === "all" ? "#8B1A1A" : "#fff",
              color: filter === "all" ? "#fff" : "#5C1A00",
              cursor: "pointer",
            }}
          >
            All ({places.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("needs-enrichment")}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              border: "1px solid #F59E0B",
              background: filter === "needs-enrichment" ? "#D97706" : "#FEF3C7",
              color: filter === "needs-enrichment" ? "#fff" : "#92400E",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ⚡ Needs Detail Content ({unenrichedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("enriched")}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              border: "1px solid #10B981",
              background: filter === "enriched" ? "#059669" : "#D1FAE5",
              color: filter === "enriched" ? "#fff" : "#065F46",
              cursor: "pointer",
            }}
          >
            ✓ Enriched ({enrichedCount})
          </button>
        </div>

        <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#5C1A00", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={sortByUnenriched}
            onChange={(e) => setSortByUnenriched(e.target.checked)}
            style={{ accentColor: "#8B1A1A", cursor: "pointer" }}
          />
          Show un-enriched destinations first
        </label>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8DCC4", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", background: "#FAF2E8", borderBottom: "2px solid #E8DCC4" }}>
              <th style={{ padding: "14px 16px", color: "#5C1A00", fontSize: 13, fontWeight: 700 }}>Name</th>
              <th style={{ padding: "14px 16px", color: "#5C1A00", fontSize: 13, fontWeight: 700 }}>State</th>
              <th style={{ padding: "14px 16px", color: "#5C1A00", fontSize: 13, fontWeight: 700 }}>Region</th>
              <th style={{ padding: "14px 16px", color: "#5C1A00", fontSize: 13, fontWeight: 700 }}>Rating</th>
              <th style={{ padding: "14px 16px", color: "#5C1A00", fontSize: 13, fontWeight: 700 }}>Enriched Status</th>
              <th style={{ padding: "14px 16px", color: "#5C1A00", fontSize: 13, fontWeight: 700 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlaces.map((place) => {
              const isEnriched = place.computedEnriched;
              return (
                <tr
                  key={place.slug}
                  style={{
                    borderBottom: "1px solid #E8DCC4",
                    background: isEnriched ? "transparent" : "#FFFDF5",
                    transition: "background 0.2s",
                  }}
                >
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: "#331100" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span>{place.name}</span>
                      {!isEnriched && (
                        <span style={{ fontSize: 11, background: "#FEF3C7", color: "#B45309", border: "1px solid #FCD34D", borderRadius: 4, padding: "2px 6px", fontWeight: 700 }}>
                          Action Needed
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#664433" }}>{place.state}</td>
                  <td style={{ padding: "14px 16px", color: "#664433" }}>{place.region}</td>
                  <td style={{ padding: "14px 16px", color: "#664433", fontWeight: 600 }}>⭐ {place.rating}</td>
                  <td style={{ padding: "14px 16px" }}>
                    {isEnriched ? (
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        background: "#ECFDF5",
                        color: "#047857",
                        border: "1px solid #A7F3D0",
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontSize: 12.5,
                        fontWeight: 700,
                      }}>
                        ✓ Yes (Enriched)
                      </span>
                    ) : (
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        background: "#FEF2F2",
                        color: "#B91C1C",
                        border: "1px solid #FECACA",
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontSize: 12.5,
                        fontWeight: 700,
                      }}>
                        ✕ No (Needs Content)
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Link
                        to={`/admin/places/${place.slug}/edit`}
                        style={{
                          background: isEnriched ? "#FAF2E8" : "#8B1A1A",
                          color: isEnriched ? "#8B1A1A" : "#fff",
                          border: isEnriched ? "1px solid #E8DCC4" : "none",
                          padding: "6px 14px",
                          borderRadius: 6,
                          fontSize: 12.5,
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {isEnriched ? "Edit" : "✨ Enrich Now"}
                      </Link>
                      <button
                        onClick={() => onDelete(place.slug)}
                        style={{ color: "#B91C1C", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12.5, padding: 0 }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacesTable;