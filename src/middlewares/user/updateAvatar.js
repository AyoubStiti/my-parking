import * as fs from 'fs';

const updateAvatar = (req, res, next) => {
  const { currentUser } = res.locals;
  if (!req.file) {
    res.send(currentUser);
    return;
  }
  if (!currentUser.avatar) {
    next();
    return;
  }
  try {
    fs.rename(req.file.path, `public/${currentUser.avatar}`, (error) => {
      if (error) throw error;
    });
    res.send('updated');
  } catch (error) {
    res.status(400).send({ message: 'Something went horribly wrong', error });
  }
};

export default updateAvatar;
