// backend/src/services/project.service.ts

import { prisma } from "../config/db";


export const createProject = async (teamId: string, name: string) => {
  return prisma.project.create({
    data: {
      name,
      teamId,
    },
  });
};

export const getProjectsByTeam = async (teamId: string) => {
  return prisma.project.findMany({
    where: { teamId },
    include: { tasks: true },
  });
};
