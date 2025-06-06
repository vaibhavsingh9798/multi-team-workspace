"use client";
import { useEffect, useState } from "react";
import { fetchCompanies } from "@/lib/api";

export default function DashboardPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies().then(setCompanies);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>
      <ul className="space-y-2">
        {companies.map((c: any) => (
          <li key={c.id} className="p-4 bg-white shadow rounded">{c.name}</li>
        ))}
      </ul>
    </div>
  );
}