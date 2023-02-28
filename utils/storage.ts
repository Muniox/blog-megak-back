import { diskStorage } from 'multer';

// @TODO Change upload directory for production
export const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../blog-megak-front/public/upload');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
