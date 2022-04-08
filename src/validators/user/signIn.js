import { check, validationResult } from 'express-validator';

const signIn = async (req, res, next) => {
  await check('email', 'Wrong email format').isEmail().run(req);
  await check('email', 'Email is required').exists().run(req);
  await check('password', 'password is required').exists().run(req);
  await check('password', 'password must be a string').isString().run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).send({ message: 'Missing required information', errors: errors.array() });
    return;
  }
  next();
};

export default signIn;
