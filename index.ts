import './utils/globals';
import express from 'express';

const app = express();
const PORT = Number(process.env.PORT);
const { ADDRESS } = process.env;

app.get('/', (req, res) => {
  res.send('hello :)');
});

app.listen(Number(process.env.PORT), process.env.ADDRESS, () => {
  // eslint-disable-next-line no-console
  console.log(`server working on http://${ADDRESS}:${PORT}`);
});
