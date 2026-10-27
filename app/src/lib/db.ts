import { neon } from '@neondatabase/serverless';

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL belum diatur');
}

export const sql = neon(process.env.POSTGRES_URL);
