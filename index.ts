import config from './global/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { handleError } from './utils/errors';
import { showServerMode } from './utils/show_server_mode';
import { storage } from './utils/storage';
import { usersRouter } from './routes/users';
import { postsRouter } from './routes/posts';
import './utils/database';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  const { file } = req;
  res.status(200).json(file.filename);
});

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use(handleError);

app.listen(config.PORT, config.ADDRESS, () => {
  showServerMode(config.NODE_ENV, config.PORT, config.ADDRESS);
});
