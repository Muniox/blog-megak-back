import config from '../global/config';
import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: config.DBHOST,
  user: config.DBUSER,
  port: config.DBPORT,
  password: config.DBPASSWORD,
  database: config.DBNAME,
  namedPlaceholders: true,
  decimalNumbers: true,
});
