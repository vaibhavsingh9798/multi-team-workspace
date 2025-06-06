"use client";
import { useEffect, useState } from "react";
import { fetchUsersInCompany, updateRole } from "@/lib/api";

export default function SettingsPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersInCompany().then(setUsers);
  }, []);

  const handleRoleChange = (userId: string, role: string) => {
    updateRole(userId, role).then(() => {
      setUsers((prev: any[]) =>
        prev.map((u) => (u.id === userId ? { ...u, role } : u))
      );
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Settings & Permissions</h1>
      <ul className="space-y-4">
        {users.map((user: any) => (
          <li key={user.id} className="bg-white p-4 shadow rounded">
            <div className="flex justify-between">
              <span>{user.name}</span>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                className="border p-1"
              >
                <option value="OWNER">Owner</option>
                <option value="MANAGER">Manager</option>
                <option value="MEMBER">Member</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
