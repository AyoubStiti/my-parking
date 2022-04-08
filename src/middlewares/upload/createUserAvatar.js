import * as fs from 'fs';
import createUserFolder from 'helpers/createUserFolder';
import getFilePath from 'helpers/getFilePath';

const createUserAvatar = async (req, res, next) => {
  const { currentUser } = res.locals;

  if (!req.file) {
    res.send(currentUser);

    return;
  }

  const { filename, path: oldPath } = req.file;

  try {
    const newPath = `${createUserFolder(currentUser.id)}/${filename}`;

    fs.rename(oldPath, newPath, error => {
      if (error) throw error;
    });
    currentUser.avatar = getFilePath(newPath);
    next();
  } catch (error) {
    res.status(400).send({ message: 'Something went horribly wrong', error });
  }
};

export default createUserAvatar;
