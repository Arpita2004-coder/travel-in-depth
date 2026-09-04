import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import * as submissionApi from "../../api/submissionApi";

function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const loadSubmissions = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await submissionApi.getAllSubmissions();
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleApprove = async (sub) => {
    const confirmed = window.confirm(
      `This will create a live destination for "${sub.name}" and award a contributor badge — continue?`
    );
    if (!confirmed) return;

    setActionLoadingId(sub._id);
    setSuccessMessage("");
    try {
      await submissionApi.approveSubmission(sub._id);
      setSuccessMessage(`Successfully approved "${sub.name}"! Destination is now live.`);
      await loadSubmissions();
    } catch (err) {
      alert(`Failed to approve submission: ${err.message}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (sub) => {
    const confirmed = window.confirm(
      `Are you sure you want to reject the submission for "${sub.name}"?`
    );
    if (!confirmed) return;

    setActionLoadingId(sub._id);
    setSuccessMessage("");
    try {
      await submissionApi.rejectSubmission(sub._id);
      setSuccessMessage(`Submission for "${sub.name}" has been rejected.`);
      await loadSubmissions();
    } catch (err) {
      alert(`Failed to reject submission: ${err.message}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return {
          bg: "#DCFCE7",
          text: "#15803D",
          border: "#86EFAC",
          label: "Approved",
        };
      case "rejected":
        return {
          bg: "#FEE2E2",
          text: "#B91C1C",
          border: "#FCA5A5",
          label: "Rejected",
        };
      case "pending":
      default:
        return {
          bg: "#FEF3C7",
          text: "#B45309",
          border: "#FDE68A",
          label: "Pending",
        };
    }
  };

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#8B1A1A", margin: 0 }}>
            Destination Review Queue
          </h1>
          <p style={{ color: "#666", margin: "4px 0 0 0", fontSize: 14 }}>
            Review community suggested destinations. Approval creates a live destination and awards contributor status.
          </p>
        </div>
        <button
          onClick={loadSubmissions}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            background: "#FAF7F2",
            border: "1px solid #E8DCC4",
            color: "#8B1A1A",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {successMessage && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: 20,
            backgroundColor: "#ECFDF5",
            border: "1px solid #A7F3D0",
            borderRadius: 8,
            color: "#065F46",
            fontSize: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>✅ {successMessage}</span>
          <button
            onClick={() => setSuccessMessage("")}
            style={{
              background: "none",
              border: "none",
              color: "#065F46",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: 20,
            backgroundColor: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: 8,
            color: "#991B1B",
            fontSize: 14,
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={{ padding: 40, textAlign: "center", color: "#666" }}>
          Loading submissions queue...
        </div>
      ) : submissions.length === 0 ? (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #E8DCC4",
          }}
        >
          <p style={{ margin: 0, fontSize: 16, color: "#666" }}>
            No destination submissions found in the queue.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #E8DCC4",
            overflowX: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: 14,
            }}
          >
            <thead>
              <tr style={{ background: "#FAF7F2", borderBottom: "2px solid #E8DCC4" }}>
                <th style={{ padding: "14px 16px", fontWeight: 700, color: "#443" }}>Submitter</th>
                <th style={{ padding: "14px 16px", fontWeight: 700, color: "#443" }}>Destination</th>
                <th style={{ padding: "14px 16px", fontWeight: 700, color: "#443" }}>Status</th>
                <th style={{ padding: "14px 16px", fontWeight: 700, color: "#443", minWidth: 260 }}>
                  Gemini AI Fact-Check
                </th>
                <th style={{ padding: "14px 16px", fontWeight: 700, color: "#443" }}>Submitted</th>
                <th style={{ padding: "14px 16px", fontWeight: 700, color: "#443", minWidth: 180 }}>Actions / Review Info</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => {
                const badge = getStatusBadge(sub.status);
                const isPending = sub.status === "pending";
                const isActionBusy = actionLoadingId === sub._id;
                const verdict = sub.geminiVerdict || {};

                return (
                  <tr
                    key={sub._id}
                    style={{
                      borderBottom: "1px solid #E8DCC4",
                      verticalAlign: "top",
                      backgroundColor: isPending ? "#FFFDF9" : "transparent",
                    }}
                  >
                    {/* Submitter */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: 600, color: "#222" }}>
                        {sub.submittedBy?.name || "Anonymous User"}
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        {sub.submittedBy?.email || "No email available"}
                      </div>
                    </td>

                    {/* Destination Name + State & Region */}
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: 700, color: "#8B1A1A", fontSize: 15 }}>
                        {sub.name}
                      </div>
                      <div style={{ fontSize: 13, color: "#444" }}>
                        📍 {sub.state} {sub.region ? `• ${sub.region}` : ""}
                      </div>
                      {sub.tagline && (
                        <div
                          style={{
                            fontSize: 12,
                            color: "#777",
                            fontStyle: "italic",
                            marginTop: 4,
                            maxWidth: 220,
                          }}
                        >
                          "{sub.tagline}"
                        </div>
                      )}
                      <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                        🗓️ {sub.bestSeason} | 💰 {sub.budget}
                      </div>
                    </td>

                    {/* Status badge */}
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          backgroundColor: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`,
                        }}
                      >
                        {badge.label}
                      </span>
                    </td>

                    {/* Gemini AI Verdict */}
                    <td style={{ padding: "14px 16px" }}>
                      <div
                        style={{
                          padding: "8px 12px",
                          borderRadius: 8,
                          backgroundColor: verdict.verified ? "#F0FDF4" : "#FFF7ED",
                          border: `1px solid ${verdict.verified ? "#BBF7D0" : "#FED7AA"}`,
                          fontSize: 13,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600 }}>
                            {verdict.verified ? "✅ Verified" : "⚠️ Unverified / Flagged"}
                          </span>
                          {verdict.confidence && (
                            <span
                              style={{
                                fontSize: 11,
                                padding: "1px 6px",
                                borderRadius: 10,
                                backgroundColor: "#E5E7EB",
                                color: "#374151",
                                textTransform: "capitalize",
                                fontWeight: 500,
                              }}
                            >
                              {verdict.confidence} Confidence
                            </span>
                          )}
                        </div>
                        {verdict.notes && (
                          <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.4 }}>
                            {verdict.notes}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Submission Date */}
                    <td style={{ padding: "14px 16px", whiteSpace: "nowrap", fontSize: 13, color: "#555" }}>
                      {sub.createdAt
                        ? new Date(sub.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>

                    {/* Actions / Review details */}
                    <td style={{ padding: "14px 16px" }}>
                      {isPending ? (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <button
                            onClick={() => handleApprove(sub)}
                            disabled={isActionBusy}
                            style={{
                              padding: "6px 12px",
                              borderRadius: 6,
                              backgroundColor: "#16A34A",
                              color: "#fff",
                              border: "none",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: isActionBusy ? "not-allowed" : "pointer",
                              opacity: isActionBusy ? 0.6 : 1,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleReject(sub)}
                            disabled={isActionBusy}
                            style={{
                              padding: "6px 12px",
                              borderRadius: 6,
                              backgroundColor: "#DC2626",
                              color: "#fff",
                              border: "none",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: isActionBusy ? "not-allowed" : "pointer",
                              opacity: isActionBusy ? 0.6 : 1,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: "#666" }}>
                          <div>
                            <strong>Reviewed by:</strong> {sub.reviewedBy?.name || sub.reviewedBy?.email || "Admin"}
                          </div>
                          {sub.reviewedAt && (
                            <div style={{ marginTop: 2 }}>
                              <strong>Date:</strong>{" "}
                              {new Date(sub.reviewedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          )}
                          {sub.resultingDestinationSlug && (
                            <div style={{ marginTop: 4 }}>
                              <a
                                href={`/destinations/${sub.resultingDestinationSlug}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#8B1A1A", fontWeight: 600, textDecoration: "underline" }}
                              >
                                View Live Page ↗
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminSubmissionsPage;
