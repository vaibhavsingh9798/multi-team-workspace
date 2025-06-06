"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axios";
import { Task } from "@/types";

const statuses = ["TODO", "IN_PROGRESS", "DONE"] as const;

export default function ProjectBoard() {
  const params = useParams();
  const projectId = params.projectId;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    setLoading(true);
    axios
      .get(`/projects/${projectId}/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [projectId]);

  // Update task status with optimistic UI
  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    const oldTasks = [...tasks];
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
    try {
      await axios.patch(`/tasks/${taskId}/status`, { status: newStatus });
    } catch (error) {
      setTasks(oldTasks);
      alert("Failed to update task status");
    }
  };

  const tasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="flex gap-6 p-6">
      {statuses.map((status) => (
        <div key={status} className="flex-1 bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-4">{status.replace("_", " ")}</h2>
          {tasksByStatus(status).length === 0 && <p>No tasks</p>}
          {tasksByStatus(status).map((task) => (
            <div
              key={task.id}
              className="bg-white p-3 mb-2 rounded shadow cursor-pointer"
            >
              <h3>{task.title}</h3>
              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                className="mt-2 border rounded px-2 py-1"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
