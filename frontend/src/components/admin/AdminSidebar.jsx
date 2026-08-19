import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import { useNavigate } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/places", label: "Places" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside style={{ width: 220, borderRight: "1px solid #E8DCC4", padding: "24px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
      <div>
        <h2 style={{ fontWeight: 700, marginBottom: 24 }}>Admin Panel</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                textDecoration: "none",
                color: location.pathname === link.to ? "#fff" : "#8B1A1A",
                background: location.pathname === link.to ? "#8B1A1A" : "transparent",
                fontWeight: 600,
              }}
            >
              {link.label}
            </Link>
          ))}
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