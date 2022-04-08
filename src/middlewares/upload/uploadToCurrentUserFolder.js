import createUserFolder from 'helpers/createUserFolder';
import multer from 'multer';

const getMulterConfig = (req, res) => {
  const { currentUser } = res.locals;
  const path = createUserFolder(currentUser.id);

  const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
      cb(null, path);
    },
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  });
  const fileFilter = (_req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error(`${file.mimetype} type is not accepted.`));
    }
  };
  const upload = multer({ storage, fileFilter });

  return upload;
};

export default getMulterConfig;
