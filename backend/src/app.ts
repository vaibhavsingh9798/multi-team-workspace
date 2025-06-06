

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import authRoutes from './routes/auth.route';
import projectRoutes from './routes/project.route';
import taskRoutes from './routes/task.route';
import { errorHandler } from './middlewares/error.middleware';



const swaggerPath = path.join(__dirname, './swagger/swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);


const app = express();


app.use(cors({origin : '*'}));
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Swagger API docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
