import React, { useState } from "react";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import SidebarMenu from "./SidebarMenu";
import ManagerSection from "./ManagerSection";
import TeacherSection from "./TeacherSection";
import StudentSection from "./StudentSection";
import GroupSection from "./GroupSection";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("Asosiy");
  const user = { name: "Davron Raimjonov", role: "Admin" };
  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const themeStyles = { backgroundColor: darkMode ? "#1e1e2f" : "#f4f4f4",color: darkMode ? "white" : "#1e1e2f",minHeight: "100vh",display: "flex",};
  const topBarStyle = {backgroundColor: darkMode ? "#2a2a3d" : "#ffffff", color: darkMode ? "#fff" : "#000",display: "flex",alignItems: "center", justifyContent: "space-between", padding: "12px 24px",boxShadow: "0 2px 4px rgba(0,0,0,0.1)",position: "sticky",top: 0,zIndex: 10,};

  return (
    <div style={themeStyles}>
      <SidebarMenu collapsed={collapsed}toggleCollapsed={toggleCollapsed}
        darkMode={darkMode}activeSection={activeSection}
        setActiveSection={setActiveSection}/>
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={topBarStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUserCircle size={32} /><div>
      <h3 style={{ margin: 0, fontSize: "16px" }}>{user.name}</h3>
      <p style={{ margin: 0, fontSize: "13px", opacity: 0.8 }}>{user.role}</p> </div></div>
          <button onClick={toggleTheme}style={{ background: "none", border: "none", color: "inherit", fontSize: "20px", cursor: "pointer" }}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            {darkMode ? <FaSun /> :<FaSun />}
          </button>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{ display: activeSection === "Menagerlar" ? "block" : "none" }}>
            <ManagerSection />
          </div>
          <div style={{ display: activeSection === "Ustozlar" ? "block" : "none" }}>
            <TeacherSection />
          </div>
          <div style={{ display: activeSection === "Studentlar" ? "block" : "none" }}>
            <StudentSection />
          </div>
          <div style={{ display: activeSection === "Guruhlar" ? "block" : "none" }}>
            <GroupSection />
          </div>
          {activeSection === "Asosiy" && <h2>Welcome</h2>}
        </div>
      </div>
    </div>
  );
};

export default App;