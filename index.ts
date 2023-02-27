import config from './global/config';
import express from 'express';
import 'express-async-errors';
import { handleError } from './utils/errors';
import { showServerMode } from './utils/showServerMode';

const app = express();

app.get('/', (req, res) => {
  res.send('hello :)');
});

app.use(handleError);

app.listen(config.PORT, config.ADDRESS, () => {
  showServerMode(config.NODE_ENV, config.PORT, config.ADDRESS);
});
