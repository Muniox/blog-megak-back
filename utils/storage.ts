import { diskStorage } from 'multer';

// @TODO Zmienić ścieżkę dla folderu upload, żeby była jedna produkcyjna i druga developerska
export const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../blog-megak-front/public/upload');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
