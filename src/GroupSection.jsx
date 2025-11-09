import React, { useState, useEffect } from "react";

const GroupSection = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchGroups = async () => {try {
    const res = await fetch("https://admin-crm.onrender.com/api/group/get-all-group");
    const data = await res.json();
    if (isMounted) setGroups(data);} catch (err) {console.error(err);}
     finally {if (isMounted) setLoading(false);}};fetchGroups();

    return () => { isMounted = false; };}, []);
  if (loading) return <p>Loading groups...</p>;
  return (
    <div>
      <h2>Groups</h2>
    { groups.length === 0 ? <p>No groups found.</p> :
        groups.map(g => <div key={g._id}>{g.name}</div>)}
    </div>
  );
};

export default GroupSection;