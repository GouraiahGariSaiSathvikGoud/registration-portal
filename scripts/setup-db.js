import pg from "pg";

// Connects to PostgreSQL and creates the registrations table.
// Safe to run more than once: IF NOT EXISTS skips it when the table is already there.
const { Client } = pg;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Check your .env file.");
  process.exit(1);
}

const client = new Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();
  console.log("Connected to PostgreSQL.");

  await client.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id          SERIAL PRIMARY KEY,
      full_name   VARCHAR(60)  NOT NULL,
      email       VARCHAR(254) NOT NULL UNIQUE,
      phone       VARCHAR(20)  NOT NULL,
      country     VARCHAR(80)  NOT NULL,
      created_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
    )
  `);
  console.log("Table 'registrations' is ready.");

  const { rows } = await client.query("SELECT COUNT(*)::int AS total FROM registrations");
  console.log(`Rows in the table right now: ${rows[0].total}`);
} catch (error) {
  console.error("Setup failed:", error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}