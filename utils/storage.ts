import { diskStorage } from 'multer';

export const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/upload');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
