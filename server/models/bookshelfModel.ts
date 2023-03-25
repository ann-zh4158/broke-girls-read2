import { Pool } from 'pg';

const PG_URI = 'postgres://nhsptzfu:Y4wop8yC3EOkr_Eg6sL3QR6R0htjsfsl@mahmud.db.elephantsql.com/nhsptzfu';

// create a new pool here using the connection string above
const pool = new Pool({
    connectionString: PG_URI
  });

export default {
    query: (text: string, params: unknown[], callback: function): unknown => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
      }
};