import { check, validationResult } from 'express-validator';

const resetPassword = async (req, res, next) => {
  await check('password', 'Password cannot be blank').isLength({ min: 6 }).run(req);
  await check('resetPasswordToken', 'resetPasswordToken cannot be blank').isLength({ min: 6 }).run(req);
  await check('password', 'password is required').isString().run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).send({ message: 'Missing required information', errors: errors.array() });
    return;
  }
  next();
};

export default resetPassword;
