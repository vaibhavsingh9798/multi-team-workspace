"use client";

import React from "react";
import { useAuth } from "@/context/AuthProvider";

export  function CompanySwitcher() {
  const { companies, selectedCompany, setSelectedCompany } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = e.target.value;
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
    }
  };

  if (!companies.length) return null;

  return (
    <select
      value={selectedCompany?.id || ""}
      onChange={handleChange}
      className="bg-gray-700 text-white rounded px-2 py-1"
    >
      {companies.map((company) => (
        <option key={company.id} value={company.id}>
          {company.name}
        </option>
      ))}
    </select>
  );
}
