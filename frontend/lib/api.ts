export async function fetchCompanies() {
  const res = await fetch("/api/companies");
  return res.json();
}

export async function fetchTasksByProject(projectId: string) {
  const res = await fetch(`/api/projects/${projectId}/tasks`);
  return res.json();
}

export async function updateTaskStatus(taskId: string, status: string) {
  const res = await fetch(`/api/tasks/${taskId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function fetchUsersInCompany() {
  const res = await fetch("/api/company/users");
  return res.json();
}

export async function updateRole(userId: string, role: string) {
  return fetch(`/api/company/users/${userId}/role`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role }),
  });
}
