
import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import {prisma } from './config/db';



const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL via Prisma');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📚 Swagger docs available at http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

startServer();
