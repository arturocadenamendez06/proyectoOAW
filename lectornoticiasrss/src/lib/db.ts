import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

interface QueryResult {
  rows: any[];
  // Puedes agregar más propiedades según sea necesario
}

const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};

export default { query };