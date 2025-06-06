"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/context/AuthProvider";
import { User } from "@/types";

export default function SettingsPage() {
  const { user, token } = useAuth();
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.companies.length > 0) {
      setSelectedCompanyId(user.companies[0].companyId);
    }
  }, [user]);

  useEffect(() => {
    if (!selectedCompanyId) return;

    const fetchCompanyUsers = async () => {
      try {
        const res = await axios.get(`/companies/${selectedCompanyId}/users`);
        setCompanyUsers(res.data);
      } catch (err) {
        console.error("Failed to load company users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyUsers();
  }, [selectedCompanyId]);

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await axios.put(`/companies/${selectedCompanyId}/users/${userId}/role`, {
        role,
      });
      setCompanyUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role } : u))
      );
    } catch (err) {
      console.error("Failed to update role", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">User Settings</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyUsers.map((member) => (
            <tr key={member.id}>
              <td className="border p-2">{member.name}</td>
              <td className="border p-2">{member.email}</td>
              <td className="border p-2">{member.Role}</td>
              <td className="border p-2">
                <select
                  className="border p-1"
                  value={member.Role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                >
                  <option value="OWNER">Owner</option>
                  <option value="MANAGER">Manager</option>
                  <option value="MEMBER">Member</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
