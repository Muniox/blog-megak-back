import config from './global/config';
import express from 'express';
import 'express-async-errors';
import { handleError } from './utils/errors';
import { showServerMode } from './utils/showServerMode';
import { pool } from './utils/database';

const app = express();

app.get('/', async (req, res) => {
  const [result] = await pool.execute('SELECT * FROM `users`');
  console.log(result);
  res.send('działa');
});

app.use(handleError);

app.listen(config.PORT, config.ADDRESS, () => {
  showServerMode(config.NODE_ENV, config.PORT, config.ADDRESS);
});
