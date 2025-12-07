import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section>
      <h1 className="text-2xl">Dashboard</h1>
      <div className="mt-4">
        <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>UID:</strong> {user?.uid}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl">Protected content</h2>
        <p>This area is only visible to authenticated users.</p>
      </div>
    </section>
  );
}
