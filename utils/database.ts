import { createPool } from 'mysql2/promise';
import config from '../global/config';

export const pool = createPool({
  host: config.ADDRESS,
  user: config.DBUSER,
  port: config.DBPORT,
  password: config.DBPASSWORD,
  database: config.DBNAME,
  namedPlaceholders: true,
  decimalNumbers: true,
});
