import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};
