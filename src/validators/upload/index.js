export const checkFile = (req, res, next) => {
  if (!req.file) {
    res.status(422).send('Missing required file or incorrect file type');
    return;
  }
  next();
};
