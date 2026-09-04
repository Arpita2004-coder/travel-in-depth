import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import { useNavigate } from "react-router-dom";
import * as submissionApi from "../../api/submissionApi";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchPending = async () => {
      try {
        const data = await submissionApi.getAllSubmissions();
        if (isMounted && Array.isArray(data)) {
          const count = data.filter((s) => s.status === "pending").length;
          setPendingCount(count);
        }
      } catch (err) {
        // Silent fail in sidebar count
      }
    };
    fetchPending();
    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navLinks = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/places", label: "Places" },
    {
      to: "/admin/submissions",
      label: "Submissions",
      badge: pendingCount > 0 ? pendingCount : null,
    },
  ];

  return (
    <aside style={{ width: 220, borderRight: "1px solid #E8DCC4", padding: "24px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
      <div>
        <h2 style={{ fontWeight: 700, marginBottom: 24 }}>Admin Panel</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                  color: isActive ? "#fff" : "#8B1A1A",
                  background: isActive ? "#8B1A1A" : "transparent",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{link.label}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span
                    style={{
                      fontSize: 11,
                      backgroundColor: isActive ? "#fff" : "#DC2626",
                      color: isActive ? "#8B1A1A" : "#fff",
                      padding: "2px 7px",
                      borderRadius: 12,
                      fontWeight: 700,
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div>
        <p style={{ fontSize: 13, color: "#8B1A1A99", marginBottom: 8 }}>{user?.name}</p>
        <button onClick={handleLogout} style={{ fontSize: 13, color: "#8B1A1A", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;