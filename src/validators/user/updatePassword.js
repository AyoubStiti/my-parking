import { check, validationResult } from 'express-validator';

const updatePassword = async (req, res, next) => {
  await check('password', 'password is required').exists().run(req);
  await check('password', 'password  must be a string').isString().run(req);
  await check('newPassword', 'newPassword is required').exists().run(req);
  await check('newPassword', 'newPassword  must be a string').isString().run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).send({ message: 'Missing required information', errors: errors.array() });
    return;
  }
  next();
};
export default updatePassword;
