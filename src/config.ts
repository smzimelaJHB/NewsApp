import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({
  path: resolve(__dirname, '../.env')
});

export const db_url = process.env.DATABASE_URL ?? "localhost";
export const port = Number(process.env.API_PORT) || 3000;
export const jwt_secret = process.env.JWT_SECRET ?? "secret";
export const node_env = process.env.NODE_ENV ?? "development";
