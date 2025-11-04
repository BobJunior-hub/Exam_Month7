import React, { useState, useEffect } from "react";

const StudentSection = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchStudents = async () => {try {
    const res = await fetch("https://admin-crm.onrender.com/api/student/get-all-students");
    const data = await res.json();if (isMounted) setStudents(data);} catch (err) {console.error(err);} finally {
        if (isMounted) setLoading(false);}};
    fetchStudents();
    return () => { isMounted = false; };}, []);
  if (loading) return <p>Loading students...</p>;
  return (
    <div>
      <h2>Students</h2>
      {students.length === 0 ? <p>No students found.</p> :
        students.map(u => <div key={u._id}>{u.name} - {u.email}</div>)
      }
    </div>
  );
};

export default StudentSection;