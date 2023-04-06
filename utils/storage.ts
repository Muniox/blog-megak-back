import config from '../global/config';
import { diskStorage } from 'multer';

// @TODO Zmienić ścieżkę dla folderu upload, żeby była jedna produkcyjna i druga developerska
export const storage = diskStorage({
  destination: (req, file, cb) => {
    if (config.NODE_ENV === 'development') {
      cb(null, '../blog-megak-front/public/upload');
    }
    if (config.NODE_ENV === 'production') {
      cb(null, './public/upload');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
