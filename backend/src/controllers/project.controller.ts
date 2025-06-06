

import { Request, Response, NextFunction } from 'express';
import * as ProjectService from '../services/project.service';

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const { teamId } = req.params;
    const project = await ProjectService.createProject(teamId, name);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { teamId } = req.params;
    const projects = await ProjectService.getProjectsByTeam(teamId);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};
