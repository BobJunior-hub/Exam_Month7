import React from "react";
import {
  FaHome, FaUserCog, FaUserShield, FaChalkboardTeacher, FaUsers,
  FaLayerGroup, FaBook, FaMoneyBillWave, FaCogs, FaUser, FaSignOutAlt,
  FaBars, FaTimes
} from "react-icons/fa";

const SidebarMenu = ({ collapsed, toggleCollapsed, darkMode, activeSection, setActiveSection }) => {
  const menuItems = [
    { key: "1", icon: <FaHome />, label: "Asosiy" },
    { key: "2", icon: <FaUserCog />, label: "Menagerlar" },
    { key: "4", icon: <FaChalkboardTeacher />, label: "Ustozlar" },
    { key: "5", icon: <FaUsers />, label: "Studentlar" },
    { key: "6", icon: <FaLayerGroup />, label: "Guruhlar" },
    { key: "7", icon: <FaBook />, label: "Kurslar" },
    { key: "8", icon: <FaMoneyBillWave />, label: "To‘lovlar" },
    { key: "9", icon: <FaCogs />, label: "Sozlama" },
    { key: "10", icon: <FaUser />, label: "Profil" },
    { key: "11", icon: <FaSignOutAlt />, label: "Chiqish" },
  ];

  return (
    <div style={{ width: collapsed ? "80px" : "250px", minHeight: "100vh", backgroundColor: darkMode ? "#1e1e2f" : "#f4f4f4", color: darkMode ? "white" : "#1e1e2f", padding: "10px",transition: "all 0.3s ease",}}>
      <button onClick={toggleCollapsed} style={{background: "#007bff",border: "none",color: "#fff",width: "100%",padding: "10px",borderRadius: "8px",cursor: "pointer",marginBottom: "20px",}}>
        {collapsed ? <FaBars /> : "Admin CRM"}
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>{menuItems.map((item) => (
          <li key={item.key} style={{ display: "flex", alignItems: "center",gap: "10px",padding: "10px",
              cursor: "pointer",borderRadius: "6px",background: activeSection === item.label ? (darkMode ? "#2e2e42" : "#e0e0e0") : "transparent",transition: "background 0.2s",}}
            onClick={() => setActiveSection(item.label)}
            onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? "#2e2e42" : "#e0e0e0"}
            onMouseLeave={(e) => e.currentTarget.style.background = activeSection === item.label ? (darkMode ? "#2e2e42" : "#e0e0e0") : "transparent"}>
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;