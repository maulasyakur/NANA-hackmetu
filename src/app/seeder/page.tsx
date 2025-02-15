"use client";

import { useState } from "react";

export default function SeederPage() {
  const [message, setMessage] = useState("");

  const seedDatabase = async () => {
    const response = await fetch("/api/seed", { method: "POST" });
    const data = await response.json();
    setMessage(data.message || "Error seeding database");
  };

  return (
    <div>
      <h1>Seed Database</h1>
      <button onClick={seedDatabase}>Run Seeder</button>
      <p>{message}</p>
    </div>
  );
}