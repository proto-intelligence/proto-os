import { Client } from 'pg';
import * as config from 'config';

async function testSupabaseConnection() {
  console.log(config.get('typeorm.url'));
  const client = new Client({
    connectionString: config.get('typeorm.url'),
    ssl: { rejectUnauthorized: false }, // required by Supabase
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log('✅ Connected to Supabase! Time:', res.rows[0]);
  } catch (err) {
    console.error('❌ Failed to connect to Supabase:', err.message);
  } finally {
    await client.end();
  }
}

export default testSupabaseConnection;
