import pkg from 'pg';
import { QueryResult } from 'pg';
const { Pool } = pkg;

// import pg types
import { builtins, getTypeParser } from 'pg-types';
// console.log({ builtins, getTypeParser });

const PG_URI = 'postgres://nhsptzfu:Y4wop8yC3EOkr_Eg6sL3QR6R0htjsfsl@mahmud.db.elephantsql.com/nhsptzfu';

// create a new pool here using the connection string above
const pool = new Pool({
    connectionString: PG_URI
  });

const db = {
    query: async (text: string, params: unknown[]): Promise<QueryResult> => {
        console.log('executed query', text);
        return await pool.query(text, params);
      }
};

export default db;