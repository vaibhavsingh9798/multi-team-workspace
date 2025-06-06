"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
  description?: string;
}

export default function Dashboard() {
  const { selectedCompany } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!selectedCompany) return;
    setLoading(true);
    axios
      .get(`/companies/${selectedCompany.id}/projects`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedCompany]);

  if (!selectedCompany) return <div>Please select a company</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{selectedCompany.name} Projects</h1>
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length ? (
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-3 mb-2 cursor-pointer border rounded hover:bg-gray-100"
              onClick={() => router.push(`/project/${project.id}`)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
}
