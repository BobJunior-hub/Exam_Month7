import React, { useState } from "react";

const SignInSection = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {e.preventDefault();setLoading(true);try {
  const res = await fetch("https://admin-crm.onrender.com/api/auth/sign-in", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify(formData),});
  const result = await res.json();setResponse(result);} catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">{loading ? "Signing In..." : "Sign In"}</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default SignInSection;