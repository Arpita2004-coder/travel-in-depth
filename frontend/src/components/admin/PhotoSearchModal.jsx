import { useState } from "react";
import * as photoApi from "../../api/photoApi";

/**
 * Unsplash Photo Search & Selector Modal
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {Function} props.onSelect - Callback with { url, photographer, photographerUrl }
 * @param {string} props.initialQuery - Default search term
 */
export default function PhotoSearchModal({ isOpen, onClose, onSelect, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const results = await photoApi.searchPhotos(query.trim());
      setPhotos(results || []);
    } catch (err) {
      setError(err.message || "Failed to search photos. Check if UNSPLASH_ACCESS_KEY is set in your backend .env.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#FFF8F0",
          borderRadius: 16,
          width: "100%",
          maxWidth: 820,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          border: "1px solid #E8DCC4",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #E8DCC4",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#FAF2E8",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#8B1A1A" }}>
              📷 Search High-Quality Photos (Unsplash)
            </h2>
            <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#665" }}>
              Find authentic, copyright-free photography for destinations and attractions.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: "#8B1A1A",
              padding: "4px 8px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Search Input Bar */}
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #E8DCC4", background: "#fff" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 10 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destination, fort, beach, temple... (e.g. Hampi ruins, Munnar tea hills)"
              autoFocus
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1.5px solid #E8DCC4",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              style={{
                padding: "10px 22px",
                borderRadius: 8,
                background: "#8B1A1A",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 14,
                cursor: loading || !query.trim() ? "not-allowed" : "pointer",
                opacity: loading || !query.trim() ? 0.7 : 1,
              }}
            >
              {loading ? "Searching..." : "🔍 Search"}
            </button>
          </form>
        </div>

        {/* Content Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1, minHeight: 300 }}>
          {error && (
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: 10,
                color: "#991B1B",
                fontSize: 14,
                marginBottom: 16,
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#8B1A1A" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
              <p style={{ margin: 0, fontWeight: 600 }}>Searching Unsplash photo library...</p>
            </div>
          ) : photos.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid #E8DCC4",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                >
                  <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
                    <img
                      src={photo.thumbUrl}
                      alt={photo.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      padding: "10px 12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flex: 1,
                      gap: 8,
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#666" }}>
                      Photo by{" "}
                      <a
                        href={photo.photographerUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#8B1A1A", fontWeight: 600, textDecoration: "underline" }}
                      >
                        {photo.photographer}
                      </a>{" "}
                      on{" "}
                      <a
                        href="https://unsplash.com/?utm_source=travel_in_depth&utm_medium=referral"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#666", textDecoration: "underline" }}
                      >
                        Unsplash
                      </a>
                    </div>

                    <button
                      onClick={() => {
                        onSelect({
                          url: photo.url,
                          photographer: photo.photographer,
                          photographerUrl: photo.photographerUrl,
                        });
                        onClose();
                      }}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        backgroundColor: "#16A34A",
                        color: "#fff",
                        border: "none",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                      }}
                    >
                      ✓ Select Photo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#666" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏜️</div>
              <p style={{ margin: 0, fontWeight: 600 }}>No photos found for "{query}".</p>
              <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "#888" }}>
                Try searching with broader terms like "Rajasthan palace", "Varanasi", "Kerala backwaters".
              </p>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#777" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>
                Type a destination or attraction keyword above and hit Search.
              </p>
              <p style={{ margin: "6px 0 0 0", fontSize: 13, color: "#999" }}>
                Select any photo to automatically fill in the image URL with proper photographer attribution.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: "12px 24px",
            borderTop: "1px solid #E8DCC4",
            background: "#FAF2E8",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            color: "#666",
          }}
        >
          <span>Photos provided by Unsplash Free API</span>
          <button
            onClick={onClose}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              background: "#E8DCC4",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              color: "#333",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
