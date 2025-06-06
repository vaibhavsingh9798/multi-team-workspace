"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchTasksByProject, updateTaskStatus } from "@/lib/api";

export default function ProjectPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (projectId) fetchTasksByProject(projectId as string).then(setTasks);
  }, [projectId]);

  const handleStatusChange = async (taskId: string, status: string) => {
    const updated = await updateTaskStatus(taskId, status);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Tasks</h1>
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow p-4 rounded">
            <h2 className="font-semibold">{task.title}</h2>
            <p>{task.description}</p>
            <div className="mt-2">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className="border p-1"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
