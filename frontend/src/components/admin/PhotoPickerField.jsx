import { useState, useEffect } from "react";
import * as photoApi from "../../api/photoApi";

/**
 * Reusable Photo Picker Field with inline thumbnail, query-based search modal, and attribution.
 *
 * @param {Object} props
 * @param {string} props.currentImage - The current image URL (if any)
 * @param {string} props.suggestedQuery - Default search term (e.g. "Amber Fort Jaipur")
 * @param {Function} props.onSelect - Callback with { url, photographer, photographerUrl }
 * @param {string} props.label - Optional label displayed above or next to the field
 * @param {string} props.placeholder - Input placeholder if manual URL input is used
 * @param {boolean} props.allowManualInput - Whether to show the manual URL text input
 * @param {string} props.photographerCredit - Optional existing credit text
 */
export default function PhotoPickerField({
  currentImage = "",
  suggestedQuery = "",
  onSelect,
  label = "Photo",
  placeholder = "https://images.unsplash.com/...",
  allowManualInput = true,
  photographerCredit = "",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState(suggestedQuery);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Sync suggestedQuery when prop changes
  useEffect(() => {
    if (suggestedQuery) {
      setQuery(suggestedQuery);
    }
  }, [suggestedQuery]);

  const openPicker = () => {
    const activeQuery = (query || suggestedQuery || "").trim();
    setQuery(activeQuery);
    setIsModalOpen(true);
    if (activeQuery) {
      executeSearch(activeQuery);
    }
  };

  const executeSearch = async (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return;
    setLoading(true);
    setError("");
    setHasSearched(true);
    try {
      const results = await photoApi.searchPhotos(searchTerm.trim());
      setPhotos(results || []);
    } catch (err) {
      setError(err.message || "Failed to search photos. Verify backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    executeSearch(query);
  };

  const handlePhotoChoose = (photo) => {
    if (onSelect) {
      onSelect({
        url: photo.url,
        photographer: photo.photographer,
        photographerUrl: photo.photographerUrl,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#5C1A00" }}>{label}</span>
          <button
            type="button"
            onClick={openPicker}
            style={{
              background: "#FAF2E8",
              border: "1px solid #E8DCC4",
              borderRadius: 6,
              padding: "4px 10px",
              fontSize: 12,
              fontWeight: 700,
              color: "#8B1A1A",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            📷 {currentImage ? "Change Photo" : "Find Photo"}
          </button>
        </div>
      )}

      {/* Inline Preview and Input */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {/* Thumbnail Preview */}
        <div
          onClick={openPicker}
          title="Click to search / change photo"
          style={{
            width: 54,
            height: 54,
            borderRadius: 8,
            border: "1.5px solid #E8DCC4",
            background: currentImage ? "#fff" : "#FAF2E8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
            cursor: "pointer",
            position: "relative",
          }}
        >
          {currentImage ? (
            <img
              src={currentImage}
              alt="Thumbnail"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <span style={{ fontSize: 20, opacity: 0.6 }}>📷</span>
          )}
        </div>

        {/* URL Input or Quick Action */}
        {allowManualInput ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
            <input
              type="text"
              value={currentImage}
              onChange={(e) =>
                onSelect &&
                onSelect({
                  url: e.target.value,
                  photographer: "",
                  photographerUrl: "",
                })
              }
              placeholder={placeholder}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 6,
                border: "1px solid #E8DCC4",
                fontSize: 12.5,
                color: "#443322",
                outline: "none",
              }}
            />
            {photographerCredit && (
              <span style={{ fontSize: 11, color: "#888", fontStyle: "italic" }}>
                {photographerCredit}
              </span>
            )}
          </div>
        ) : (
          <div style={{ flex: 1 }}>
            <button
              type="button"
              onClick={openPicker}
              style={{
                padding: "8px 14px",
                background: "#FAF2E8",
                border: "1px solid #E8DCC4",
                borderRadius: 6,
                fontSize: 12.5,
                fontWeight: 600,
                color: "#8B1A1A",
                cursor: "pointer",
              }}
            >
              {currentImage ? "Change Image" : "+ Select Photo"}
            </button>
          </div>
        )}
      </div>

      {/* Unsplash Search Modal Popup */}
      {isModalOpen && (
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: "#FFF8F0",
              borderRadius: 16,
              width: "100%",
              maxWidth: 800,
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              border: "1px solid #E8DCC4",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #E8DCC4",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#FAF2E8",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#8B1A1A" }}>
                  📷 Choose Photo for "{suggestedQuery || "Item"}"
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: 12.5, color: "#665" }}>
                  Authentic, high-resolution photography via Unsplash.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#8B1A1A",
                  padding: "4px 8px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Search Bar */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #E8DCC4", background: "#fff" }}>
              <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: 10 }}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search item, monument, dish, activity..."
                  autoFocus
                  style={{
                    flex: 1,
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: "1.5px solid #E8DCC4",
                    fontSize: 13.5,
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 8,
                    background: "#8B1A1A",
                    color: "#fff",
                    border: "none",
                    fontWeight: 600,
                    fontSize: 13.5,
                    cursor: loading || !query.trim() ? "not-allowed" : "pointer",
                    opacity: loading || !query.trim() ? 0.7 : 1,
                  }}
                >
                  {loading ? "Searching..." : "🔍 Search"}
                </button>
              </form>
            </div>

            {/* Results Grid */}
            <div style={{ padding: "16px 20px", overflowY: "auto", flex: 1, minHeight: 280 }}>
              {error && (
                <div
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FECACA",
                    borderRadius: 8,
                    color: "#991B1B",
                    fontSize: 13,
                    marginBottom: 14,
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              {loading ? (
                <div style={{ textAlign: "center", padding: "50px 0", color: "#8B1A1A" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Searching photos...</p>
                </div>
              ) : photos.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 14,
                  }}
                >
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      style={{
                        background: "#fff",
                        borderRadius: 10,
                        border: "1px solid #E8DCC4",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div style={{ height: 130, overflow: "hidden" }}>
                        <img
                          src={photo.thumbUrl}
                          alt={photo.alt || "Photo"}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div
                        style={{
                          padding: "8px 10px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          flex: 1,
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontSize: 11, color: "#666" }}>
                          By {photo.photographer}
                        </span>
                        <button
                          type="button"
                          onClick={() => handlePhotoChoose(photo)}
                          style={{
                            padding: "6px 10px",
                            borderRadius: 6,
                            backgroundColor: "#16A34A",
                            color: "#fff",
                            border: "none",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          ✓ Select Photo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : hasSearched ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>🏜️</div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>No photos found for "{query}".</p>
                  <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#888" }}>
                    Try a broader query (e.g. "{suggestedQuery.split(" ")[0] || "India"}")
                  </p>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#777" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>
                    Enter a keyword to search Unsplash photos.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "10px 20px",
                borderTop: "1px solid #E8DCC4",
                background: "#FAF2E8",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 11.5,
                color: "#666",
              }}
            >
              <span>Photos via Unsplash API</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  background: "#E8DCC4",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
