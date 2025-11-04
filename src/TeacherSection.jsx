import React, { useState, useEffect } from "react";

const TeacherSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTeachers = async () => { try {
    const res = await fetch("https://admin-crm.onrender.com/api/teacher/get-all-teachers");
    const data = await res.json();if (isMounted) setTeachers(data);} catch (err) { console.error(err);} finally {
        if (isMounted) setLoading(false);}};
    fetchTeachers();
    return () => { isMounted = false; };}, []);
  if (loading) return <p>Loading teachers...</p>;
  return (
    <div>
      <h2>Teachers</h2>
      {teachers.length === 0 ? <p>No teachers found.</p> :
        teachers.map(u => <div key={u._id}>{u.name} - {u.email}</div>)
      }
    </div>
  );
};

export default TeacherSection;