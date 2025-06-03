// backend/src/controllers/task.controller.ts

import { Request, Response, NextFunction } from 'express';
import * as TaskService from '../services/task.service';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, tags, parentId } = req.body;
    const { projectId } = req.params;
    const task = await TaskService.createTask(projectId, title, description, tags, parentId);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    const tasks = await TaskService.getTasksByProject(projectId);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const updated = await TaskService.updateTaskStatus(taskId, status);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};
