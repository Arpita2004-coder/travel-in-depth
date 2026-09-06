import { useState } from "react";
import PhotoPickerField from "./PhotoPickerField";
import * as adminApi from "../../api/adminApi";
import * as photoApi from "../../api/photoApi";

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
  photographerCredit: "",
  ecoOptions: "",
  lat: "",
  lng: "",
  about: "",
  gallery: [],
  attractions: [],
  foodRecommendations: [],
  activities: [],
};

const PlaceForm = ({ initialData, onSubmit, submitLabel = "Save" }) => {
  const [form, setForm] = useState(
    initialData
      ? {
          ...emptyForm,
          ...initialData,
          about: initialData.about || "",
          gallery: Array.isArray(initialData.gallery) ? initialData.gallery : [],
          attractions: Array.isArray(initialData.attractions) ? initialData.attractions : [],
          foodRecommendations: Array.isArray(initialData.foodRecommendations) ? initialData.foodRecommendations : [],
          activities: Array.isArray(initialData.activities) ? initialData.activities : [],
          photographerCredit: initialData.photographerCredit || "",
          ecoOptions: (initialData.ecoOptions || []).join(", "),
        }
      : emptyForm
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // AI draft state
  const [generatingDraft, setGeneratingDraft] = useState(false);
  const [draftGenerated, setDraftGenerated] = useState(false);
  const [aiError, setAiError] = useState("");

  // Bulk Photo Auto-Suggest state
  const [bulkSearching, setBulkSearching] = useState(false);
  const [bulkError, setBulkError] = useState("");
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  // bulkItems: Array<{ id, type: 'attraction'|'food'|'activity', index, name, query, results: Array<Photo> }>
  const [bulkItems, setBulkItems] = useState([]);
  // selectedChoices: { [itemId]: { url, photographer, photographerUrl } | null }
  const [selectedChoices, setSelectedChoices] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMainPhotoSelect = ({ url, photographer }) => {
    const credit = photographer ? `Photo by ${photographer} on Unsplash` : "";
    setForm((prev) => ({
      ...prev,
      image: url,
      photographerCredit: credit,
    }));
  };

  // Helper updater for array of objects (attractions, foodRecommendations, activities)
  const handleArrayItemChange = (field, index, prop, value) => {
    setForm((prev) => {
      const list = [...(prev[field] || [])];
      list[index] = { ...list[index], [prop]: value };
      return { ...prev, [field]: list };
    });
  };

  const handleAddArrayItem = (field, defaultItem) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultItem],
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }));
  };

  // Gallery string array handlers
  const handleAddGalleryItem = (url = "") => {
    setForm((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), url],
    }));
  };

  const handleUpdateGalleryItem = (index, url) => {
    setForm((prev) => {
      const newGallery = [...(prev.gallery || [])];
      newGallery[index] = url;
      return { ...prev, gallery: newGallery };
    });
  };

  const handleRemoveGalleryItem = (index) => {
    setForm((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index),
    }));
  };

  const handleGenerateDraft = async () => {
    const targetSlug = form.slug || form.name?.toLowerCase().trim().replace(/[\s\W-]+/g, "-");
    if (!targetSlug && !form.name) {
      setAiError("Please enter a destination name or slug first before generating draft content.");
      return;
    }
    setAiError("");
    setGeneratingDraft(true);
    try {
      const draftData = await adminApi.generateDestinationContent(targetSlug || "destination", {
        name: form.name,
        state: form.state,
        region: form.region,
        tagline: form.tagline,
      });

      if (draftData) {
        setForm((prev) => ({
          ...prev,
          about: draftData.about || prev.about,
          attractions: Array.isArray(draftData.attractions) && draftData.attractions.length > 0
            ? draftData.attractions
            : prev.attractions,
          foodRecommendations: Array.isArray(draftData.foodRecommendations) && draftData.foodRecommendations.length > 0
            ? draftData.foodRecommendations
            : prev.foodRecommendations,
          activities: Array.isArray(draftData.activities) && draftData.activities.length > 0
            ? draftData.activities
            : prev.activities,
        }));
        setDraftGenerated(true);
      }
    } catch (err) {
      console.error("Failed to generate draft:", err);
      setAiError(err.message || "Failed to generate draft content.");
    } finally {
      setGeneratingDraft(false);
    }
  };

  // Check if there are any un-photographed items
  const unphotographedCount =
    (form.attractions || []).filter((a) => a.name?.trim() && !a.image?.trim()).length +
    (form.foodRecommendations || []).filter((f) => f.name?.trim() && !f.image?.trim()).length +
    (form.activities || []).filter((a) => a.name?.trim() && !a.image?.trim()).length;

  const hasRichContentItems =
    (form.attractions && form.attractions.length > 0) ||
    (form.foodRecommendations && form.foodRecommendations.length > 0) ||
    (form.activities && form.activities.length > 0);

  // Bulk Auto-Suggest Flow
  const handleStartBulkPhotoSuggest = async () => {
    setBulkError("");
    const itemsToSearch = [];
    const destName = form.name || "";

    // 1. Attractions without images
    (form.attractions || []).forEach((item, index) => {
      if (item.name?.trim() && !item.image?.trim()) {
        const query = `${item.name.trim()} ${destName}`.trim();
        itemsToSearch.push({
          id: `attr-${index}`,
          type: "attractions",
          index,
          name: item.name.trim(),
          query,
        });
      }
    });

    // 2. Food without images
    (form.foodRecommendations || []).forEach((item, index) => {
      if (item.name?.trim() && !item.image?.trim()) {
        const query = `${item.name.trim()} ${destName || form.state || ""}`.trim();
        itemsToSearch.push({
          id: `food-${index}`,
          type: "foodRecommendations",
          index,
          name: item.name.trim(),
          query,
        });
      }
    });

    // 3. Activities without images
    (form.activities || []).forEach((item, index) => {
      if (item.name?.trim() && !item.image?.trim()) {
        const query = `${item.name.trim()} ${destName}`.trim();
        itemsToSearch.push({
          id: `act-${index}`,
          type: "activities",
          index,
          name: item.name.trim(),
          query,
        });
      }
    });

    if (itemsToSearch.length === 0) {
      setBulkError("All current attractions, food, and activities already have photos assigned!");
      return;
    }

    // Limit to max 15 items per batch to comply with Unsplash rate limit cap
    const batch = itemsToSearch.slice(0, 15);
    const queries = batch.map((b) => b.query);

    setBulkSearching(true);
    try {
      const response = await photoApi.bulkSearchPhotos(queries);
      // response is Array<{ query, results }>
      const queryResultsMap = {};
      (response || []).forEach((r) => {
        queryResultsMap[r.query] = r.results || [];
      });

      const processedItems = batch.map((item) => ({
        ...item,
        results: queryResultsMap[item.query] || [],
      }));

      setBulkItems(processedItems);
      setSelectedChoices({});
      setBulkModalOpen(true);
    } catch (err) {
      console.error("Bulk search photos failed:", err);
      setBulkError(err.message || "Failed to search photos in bulk. Rate limit may be exceeded.");
    } finally {
      setBulkSearching(false);
    }
  };

  const handleSelectChoice = (itemId, photoObj) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [itemId]: photoObj, // null or { url, photographer, photographerUrl }
    }));
  };

  const handleApplyBulkChoices = () => {
    setForm((prev) => {
      const newAttractions = [...(prev.attractions || [])];
      const newFood = [...(prev.foodRecommendations || [])];
      const newActivities = [...(prev.activities || [])];

      bulkItems.forEach((item) => {
        const choice = selectedChoices[item.id];
        if (choice && choice.url) {
          if (item.type === "attractions" && newAttractions[item.index]) {
            newAttractions[item.index] = { ...newAttractions[item.index], image: choice.url };
          } else if (item.type === "foodRecommendations" && newFood[item.index]) {
            newFood[item.index] = { ...newFood[item.index], image: choice.url };
          } else if (item.type === "activities" && newActivities[item.index]) {
            newActivities[item.index] = { ...newActivities[item.index], image: choice.url };
          }
        }
      });

      return {
        ...prev,
        attractions: newAttractions,
        foodRecommendations: newFood,
        activities: newActivities,
      };
    });

    setBulkModalOpen(false);
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
        gallery: (form.gallery || []).filter((url) => typeof url === "string" && url.trim()),
        attractions: (form.attractions || []).filter((a) => a.name?.trim()),
        foodRecommendations: (form.foodRecommendations || []).filter((f) => f.name?.trim()),
        activities: (form.activities || []).filter((a) => a.name?.trim()),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const destContext = form.name ? `${form.name} ${form.state || ""}`.trim() : "";

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 680 }}>
      {/* Basic Information Section */}
      <div style={{ background: "#fff", border: "1px solid #E8DCC4", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#8B1A1A", margin: 0 }}>Basic Information</h3>

        {/* Name & Slug */}
        <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Hampi"
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
          Slug (url-friendly)
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            placeholder="e.g. hampi"
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
          />
        </label>

        {/* State & Region */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
            State
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              placeholder="e.g. Karnataka"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
            Region
            <input
              name="region"
              value={form.region}
              onChange={handleChange}
              required
              placeholder="e.g. South"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
            />
          </label>
        </div>

        {/* Tagline */}
        <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
          Tagline
          <input
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
            required
            placeholder="e.g. The City of Ruins & Boulders"
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
          />
        </label>

        {/* Best Season, Rating, Budget */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
            Best Season
            <input
              name="bestSeason"
              value={form.bestSeason}
              onChange={handleChange}
              required
              placeholder="e.g. Oct – Mar"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
            Rating (0-5)
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              required
              placeholder="4.8"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
            Budget
            <input
              name="budget"
              value={form.budget}
              onChange={handleChange}
              required
              placeholder="₹5k – ₹15k"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
            />
          </label>
        </div>

        {/* Main Image with Inline PhotoPickerField */}
        <PhotoPickerField
          label="Main Destination Cover Image"
          currentImage={form.image}
          photographerCredit={form.photographerCredit}
          suggestedQuery={destContext || "India destination"}
          onSelect={handleMainPhotoSelect}
        />

        {/* Gallery Array with Inline PhotoPickerField */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#5C1A00" }}>
              Photo Gallery ({form.gallery?.length || 0})
            </span>
            <button
              type="button"
              onClick={() => handleAddGalleryItem("")}
              style={{ background: "#FAF2E8", border: "1px solid #E8DCC4", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: "#8B1A1A", cursor: "pointer" }}
            >
              + Add Gallery Photo
            </button>
          </div>

          {form.gallery?.map((gUrl, gIdx) => (
            <div key={gIdx} style={{ background: "#FAF2E8", border: "1px solid #E8DCC4", borderRadius: 8, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#8B1A1A" }}>Gallery Photo #{gIdx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryItem(gIdx)}
                  style={{ color: "#D32F2F", border: "none", background: "transparent", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
                >
                  Remove
                </button>
              </div>
              <PhotoPickerField
                label=""
                currentImage={gUrl}
                suggestedQuery={`${form.name || ""} landscape travel`.trim()}
                onSelect={({ url }) => handleUpdateGalleryItem(gIdx, url)}
              />
            </div>
          ))}
        </div>

        {/* Eco Options */}
        <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
          Eco Options (comma-separated)
          <input
            name="ecoOptions"
            value={form.ecoOptions}
            onChange={handleChange}
            placeholder="🚲 Cycle Tour, 🚶 Heritage Walk, 🛺 E-Rickshaw"
            style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
          />
        </label>

        {/* Latitude & Longitude */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
            Latitude
            <input
              type="number"
              step="any"
              name="lat"
              value={form.lat}
              onChange={handleChange}
              required
              placeholder="e.g. 15.3350"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600 }}>
            Longitude
            <input
              type="number"
              step="any"
              name="lng"
              value={form.lng}
              onChange={handleChange}
              required
              placeholder="e.g. 76.4600"
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #E8DCC4" }}
            />
          </label>
        </div>
      </div>

      {/* AI Rich Text Draft Generator & Bulk Photo Tools Panel */}
      <div style={{
        background: "#FFFBF2",
        border: "1.5px solid #F0C987",
        borderRadius: 12,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#8B1A1A", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
              ✨ Rich Content & Guide Sections
            </h3>
            <p style={{ fontSize: 13, color: "#775533", margin: "4px 0 0" }}>
              Generate factual drafts for About overview, Attractions, Food, and Activities using Gemini AI.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleGenerateDraft}
              disabled={generatingDraft}
              style={{
                background: generatingDraft ? "#ccc" : "linear-gradient(135deg, #FF6B1A, #8B1A1A)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 18px",
                fontSize: 13.5,
                fontWeight: 700,
                cursor: generatingDraft ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 2px 8px rgba(139,26,26,0.2)",
              }}
            >
              {generatingDraft ? "⏳ Generating Draft…" : "✨ Generate Draft with AI"}
            </button>

            {hasRichContentItems && (
              <button
                type="button"
                onClick={handleStartBulkPhotoSuggest}
                disabled={bulkSearching}
                style={{
                  background: bulkSearching ? "#ccc" : "#2E7D32",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 16px",
                  fontSize: 13.5,
                  fontWeight: 700,
                  cursor: bulkSearching ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 2px 8px rgba(46,125,50,0.25)",
                }}
                title={unphotographedCount > 0 ? `Auto-suggest photos for ${unphotographedCount} un-photographed items` : "All items currently have photos"}
              >
                {bulkSearching ? "⏳ Searching Unsplash..." : "🖼️ Auto-Suggest All Photos"}
              </button>
            )}
          </div>
        </div>

        {/* AI Accuracy Warning & Review State */}
        <div style={{
          background: "#FFF3E0",
          borderLeft: "4px solid #FF9800",
          padding: "10px 14px",
          borderRadius: 6,
          fontSize: 12.5,
          color: "#854d0e",
          lineHeight: 1.5,
        }}>
          ⚠️ <b>Note:</b> AI-generated content may contain inaccuracies — please verify facts before publishing. Generating content or auto-suggesting photos only fills the form fields below for review and does not save anything to the database until you click <b>{submitLabel}</b>.
        </div>

        {draftGenerated && (
          <div style={{
            background: "#E8F5E9",
            border: "1px solid #A5D6A7",
            padding: "10px 14px",
            borderRadius: 6,
            fontSize: 13,
            color: "#1B5E20",
            fontWeight: 600,
          }}>
            ✓ AI Draft generated successfully! You can now use <b>🖼️ Auto-Suggest All Photos</b> or pick photos for each item individually below.
          </div>
        )}

        {aiError && (
          <div style={{ color: "#D32F2F", fontSize: 13, background: "#FFEBEE", padding: "8px 12px", borderRadius: 6 }}>
            ⚠️ {aiError}
          </div>
        )}

        {bulkError && (
          <div style={{ color: "#D32F2F", fontSize: 13, background: "#FFEBEE", padding: "8px 12px", borderRadius: 6 }}>
            ⚠️ {bulkError}
          </div>
        )}

        {/* About Field */}
        <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 14, fontWeight: 600, marginTop: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>About Destination (2–3 Paragraph Overview)</span>
            {draftGenerated && <span style={{ fontSize: 11, color: "#D97706", fontWeight: 700 }}>AI Draft — editable</span>}
          </div>
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            rows={5}
            placeholder="Rich descriptive overview covering history, culture, and travel vibe..."
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #E8DCC4",
              fontFamily: "inherit",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          />
        </label>

        {/* Attractions Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#5C1A00" }}>
              Attractions ({form.attractions?.length || 0})
            </span>
            <button
              type="button"
              onClick={() => handleAddArrayItem("attractions", { name: "", description: "", image: "" })}
              style={{ background: "#FAF2E8", border: "1px solid #E8DCC4", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: "#8B1A1A", cursor: "pointer" }}
            >
              + Add Attraction
            </button>
          </div>

          {form.attractions?.map((attr, idx) => {
            const attrQuery = attr.name
              ? `${attr.name} ${form.name || ""}`.trim()
              : destContext;

            return (
              <div key={idx} style={{ background: "#fff", border: "1px solid #E8DCC4", borderRadius: 8, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "#8B1A1A" }}>Attraction #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem("attractions", idx)}
                    style={{ color: "#D32F2F", border: "none", background: "transparent", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
                  >
                    Remove
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Attraction Name (e.g. Amber Fort)"
                  value={attr.name || ""}
                  onChange={(e) => handleArrayItemChange("attractions", idx, "name", e.target.value)}
                  style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #E8DCC4", fontSize: 13, fontWeight: 600 }}
                />

                <textarea
                  rows={2}
                  placeholder="Attraction Description"
                  value={attr.desc || attr.description || ""}
                  onChange={(e) => {
                    handleArrayItemChange("attractions", idx, "desc", e.target.value);
                    handleArrayItemChange("attractions", idx, "description", e.target.value);
                  }}
                  style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #E8DCC4", fontSize: 13, fontFamily: "inherit" }}
                />

                {/* Inline PhotoPickerField for this Attraction */}
                <PhotoPickerField
                  label="Attraction Photo"
                  currentImage={attr.image || ""}
                  suggestedQuery={attrQuery}
                  onSelect={({ url }) => handleArrayItemChange("attractions", idx, "image", url)}
                />
              </div>
            );
          })}
        </div>

        {/* Food Recommendations Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#5C1A00" }}>
              Food Recommendations ({form.foodRecommendations?.length || 0})
            </span>
            <button
              type="button"
              onClick={() => handleAddArrayItem("foodRecommendations", { name: "", description: "", image: "" })}
              style={{ background: "#FAF2E8", border: "1px solid #E8DCC4", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: "#8B1A1A", cursor: "pointer" }}
            >
              + Add Food
            </button>
          </div>

          {form.foodRecommendations?.map((food, idx) => {
            const foodQuery = food.name
              ? `${food.name} ${form.name || form.state || ""}`.trim()
              : `${destContext} food dish`.trim();

            return (
              <div key={idx} style={{ background: "#fff", border: "1px solid #E8DCC4", borderRadius: 8, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "#8B1A1A" }}>Food Item #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem("foodRecommendations", idx)}
                    style={{ color: "#D32F2F", border: "none", background: "transparent", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
                  >
                    Remove
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Dish or Specialty Name (e.g. Dal Baati Churma)"
                  value={food.name || ""}
                  onChange={(e) => handleArrayItemChange("foodRecommendations", idx, "name", e.target.value)}
                  style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #E8DCC4", fontSize: 13, fontWeight: 600 }}
                />

                <textarea
                  rows={2}
                  placeholder="Description & Culinary Significance"
                  value={food.desc || food.description || ""}
                  onChange={(e) => {
                    handleArrayItemChange("foodRecommendations", idx, "desc", e.target.value);
                    handleArrayItemChange("foodRecommendations", idx, "description", e.target.value);
                  }}
                  style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #E8DCC4", fontSize: 13, fontFamily: "inherit" }}
                />

                {/* Inline PhotoPickerField for this Food Item */}
                <PhotoPickerField
                  label="Food Item Photo"
                  currentImage={food.image || ""}
                  suggestedQuery={foodQuery}
                  onSelect={({ url }) => handleArrayItemChange("foodRecommendations", idx, "image", url)}
                />
              </div>
            );
          })}
        </div>

        {/* Activities Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#5C1A00" }}>
              Activities & Experiences ({form.activities?.length || 0})
            </span>
            <button
              type="button"
              onClick={() => handleAddArrayItem("activities", { name: "", description: "", image: "" })}
              style={{ background: "#FAF2E8", border: "1px solid #E8DCC4", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, color: "#8B1A1A", cursor: "pointer" }}
            >
              + Add Activity
            </button>
          </div>

          {form.activities?.map((act, idx) => {
            const actQuery = act.name
              ? `${act.name} ${form.name || ""}`.trim()
              : `${destContext} experience activity`.trim();

            return (
              <div key={idx} style={{ background: "#fff", border: "1px solid #E8DCC4", borderRadius: 8, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "#8B1A1A" }}>Activity #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem("activities", idx)}
                    style={{ color: "#D32F2F", border: "none", background: "transparent", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
                  >
                    Remove
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Activity / Experience Name (e.g. Desert Safari)"
                  value={act.name || ""}
                  onChange={(e) => handleArrayItemChange("activities", idx, "name", e.target.value)}
                  style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #E8DCC4", fontSize: 13, fontWeight: 600 }}
                />

                <textarea
                  rows={2}
                  placeholder="Activity Description"
                  value={act.desc || act.description || ""}
                  onChange={(e) => {
                    handleArrayItemChange("activities", idx, "desc", e.target.value);
                    handleArrayItemChange("activities", idx, "description", e.target.value);
                  }}
                  style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #E8DCC4", fontSize: 13, fontFamily: "inherit" }}
                />

                {/* Inline PhotoPickerField for this Activity */}
                <PhotoPickerField
                  label="Activity Photo"
                  currentImage={act.image || ""}
                  suggestedQuery={actQuery}
                  onSelect={({ url }) => handleArrayItemChange("activities", idx, "image", url)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

      <button
        type="submit"
        disabled={saving}
        style={{
          padding: "12px 20px",
          borderRadius: 8,
          background: "#8B1A1A",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: 15,
          cursor: saving ? "not-allowed" : "pointer",
          marginTop: 8,
        }}
      >
        {saving ? "Saving..." : submitLabel}
      </button>

      {/* Bulk Photo Review Modal */}
      {bulkModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            style={{
              background: "#FFFBF2",
              borderRadius: 16,
              border: "1.5px solid #E8DCC4",
              width: "100%",
              maxWidth: 780,
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid #E8DCC4",
                background: "#FAF2E8",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#8B1A1A" }}>
                  🖼️ Auto-Suggested Photos Review
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#666" }}>
                  Click your preferred photo for each item, or skip. Nothing is applied until you confirm below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBulkModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 22,
                  color: "#888",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body - Items List */}
            <div style={{ padding: "20px 24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
              {bulkItems.length === 0 ? (
                <p style={{ color: "#777", textAlign: "center", margin: "30px 0" }}>No unphotographed items found.</p>
              ) : (
                bulkItems.map((item) => {
                  const currentSelection = selectedChoices[item.id];
                  const typeLabel =
                    item.type === "attractions" ? "Attraction" :
                    item.type === "foodRecommendations" ? "Food" : "Activity";

                  return (
                    <div
                      key={item.id}
                      style={{
                        background: "#fff",
                        border: currentSelection ? "2px solid #2E7D32" : "1px solid #E8DCC4",
                        borderRadius: 12,
                        padding: 14,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#8B1A1A", background: "#FAF2E8", padding: "2px 8px", borderRadius: 4, textTransform: "uppercase", marginRight: 8 }}>
                            {typeLabel}
                          </span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "#2D3748" }}>{item.name}</span>
                          <span style={{ fontSize: 12, color: "#888", marginLeft: 8 }}>({item.query})</span>
                        </div>
                        {currentSelection && (
                          <button
                            type="button"
                            onClick={() => handleSelectChoice(item.id, null)}
                            style={{
                              background: "#FFEBEE",
                              color: "#D32F2F",
                              border: "none",
                              borderRadius: 4,
                              padding: "2px 8px",
                              fontSize: 11,
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Skip / Clear
                          </button>
                        )}
                      </div>

                      {/* Photo choices */}
                      {item.results && item.results.length > 0 ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                          {item.results.map((photo) => {
                            const isSelected = currentSelection?.url === photo.url;
                            return (
                              <div
                                key={photo.id}
                                onClick={() => handleSelectChoice(item.id, photo)}
                                style={{
                                  position: "relative",
                                  border: isSelected ? "3px solid #2E7D32" : "2px solid transparent",
                                  borderRadius: 8,
                                  overflow: "hidden",
                                  cursor: "pointer",
                                  background: "#f0f0f0",
                                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                                  boxShadow: isSelected ? "0 4px 12px rgba(46,125,50,0.3)" : "none",
                                }}
                              >
                                <img
                                  src={photo.thumbUrl || photo.url}
                                  alt={photo.alt}
                                  style={{
                                    width: "100%",
                                    height: 100,
                                    objectFit: "cover",
                                    display: "block",
                                  }}
                                />
                                <div
                                  style={{
                                    padding: "4px 6px",
                                    fontSize: 10.5,
                                    color: "#555",
                                    background: "#fff",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  📷 {photo.photographer}
                                </div>
                                {isSelected && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: 6,
                                      right: 6,
                                      background: "#2E7D32",
                                      color: "#fff",
                                      borderRadius: "50%",
                                      width: 22,
                                      height: 22,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: 13,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    ✓
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p style={{ margin: 0, fontSize: 12.5, color: "#999", fontStyle: "italic" }}>
                          No landscape photos found on Unsplash for "{item.query}". Use the individual picker to try alternative search terms.
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #E8DCC4",
                background: "#FAF2E8",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: "#666" }}>
                <b>{Object.values(selectedChoices).filter(Boolean).length}</b> photo(s) selected
              </span>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setBulkModalOpen(false)}
                  style={{
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyBulkChoices}
                  disabled={Object.values(selectedChoices).filter(Boolean).length === 0}
                  style={{
                    background:
                      Object.values(selectedChoices).filter(Boolean).length > 0 ? "#2E7D32" : "#aaa",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 20px",
                    fontSize: 13.5,
                    fontWeight: 700,
                    cursor:
                      Object.values(selectedChoices).filter(Boolean).length > 0
                        ? "pointer"
                        : "not-allowed",
                  }}
                >
                  Apply Selected Photos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default PlaceForm;
