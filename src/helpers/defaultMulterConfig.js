import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { mkdirSync } from 'fs-extra';
import { resolveApp } from 'middlewares/upload/compressImage';

require('dotenv').config();

const acceptedFileTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'video/mp4',
  'video/quicktime',
  'video/*',
  'image/*',
];

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = resolveApp(
      `${process.env.IMAGE_STORAGE_LOCATION}/tmp` || 'all',
    );

    mkdirSync(destinationPath, {
      recursive: true,
    });
    cb(null, destinationPath);
  },
  filename: (_req, file, cb) => {
    cb(null, `${uuidv4()}.${file.originalname.split('.').pop()}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (acceptedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`${file.mimetype} type is not accepted.`));
  }
};

export default multer({ storage, fileFilter });
