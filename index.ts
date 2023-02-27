import config from './global/config';
import express from 'express';
import { showServerMode } from './utils/showServerMode';

const app = express();

app.get('/', (req, res) => {
  res.send('hello :)');
});

app.listen(config.PORT, config.ADDRESS, () => {
  showServerMode(config.NODE_ENV, config.PORT, config.ADDRESS);
});
