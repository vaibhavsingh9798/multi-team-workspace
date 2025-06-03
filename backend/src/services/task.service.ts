

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (projectId: string, title: string, description?: string, tags: string[] = [], parentId?: string) => {
  return prisma.task.create({
    data: {
      title,
      description,
      tags,
      status: 'TODO',
      parentId,
      projectId,
    },
  });
};

export const getTasksByProject = async (projectId: string) => {
  return prisma.task.findMany({
    where: { projectId },
    include: {
      subtasks: true,
      activityLogs: true,
    },
  });
};

export const updateTaskStatus = async (taskId: string, newStatus: string) => {
  return prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });
};

export const addActivityLog = async (taskId: string, message: string) => {
  return prisma.activityLog.create({
    data: {
      taskId,
      message,
    },
  });
};
