// import express, { Application, Request, Response, NextFunction } from "express";



// const app: Application = express();


// app.use("/", (req: Request, res: Response, next: NextFunction): void => {
//   res.json({ message: "Allo! Catch-all route." });
// });

// export default app;

// backend/src/app.ts

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import authRoutes from './routes/auth.route';
import projectRoutes from './routes/project.route';
import taskRoutes from './routes/task.route';



const swaggerPath = path.join(__dirname, './swagger/swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Swagger API docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



export default app;
