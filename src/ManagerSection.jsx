import React, { useState, useEffect } from "react";

const ManagerSection = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchManagers = async () => {try {
    const res = await fetch("https://admin-crm.onrender.com/api/staff/all-managers");
    const data = await res.json();if (isMounted) setManagers(data);} catch (err) {console.error(err);} finally { if (isMounted) setLoading(false);}};fetchManagers();
    return () => { isMounted = false; };}, []);
  if (loading) return <p>Loading managers...</p>;
  return (
    <div>
      <h2>Managers</h2>
      {managers.length === 0 ? <p>No managers found.</p> :
        managers.map(u => <div key={u._id}>{u.name} - {u.email}</div>)
      }
    </div>
  );
};

export default ManagerSection;