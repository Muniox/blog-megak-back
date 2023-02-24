import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello :)');
});

app.listen(3000, 'localhost', () => {
  // eslint-disable-next-line no-console
  console.log('server working on http://localhost:3000');
});
