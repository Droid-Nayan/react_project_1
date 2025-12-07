import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, signInWithGoogle, signInWithGithub } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (err) { setError(err.message); }
  };

  const handleGithub = async () => {
    try {
      await signInWithGithub();
      navigate(from, { replace: true });
    } catch (err) { setError(err.message); }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Login</button>
      </form>

      <div className="mt-4">
        <button onClick={handleGoogle} className="mr-2 border px-3 py-1">Login with Google</button>
        <button onClick={handleGithub} className="border px-3 py-1">Login with GitHub</button>
      </div>

      {error && <p className="text-red-600 mt-3">{error}</p>}
      <p className="mt-3">No account? <Link to="/register" className="underline">Register</Link></p>
    </div>
  );
}
