import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "1234",
  database: "Sistema-PE",
  port: 5432,
});

export default pool;
