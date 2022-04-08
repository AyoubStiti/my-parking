import { check, validationResult } from 'express-validator';

const createUser = async (req, res, next) => {
  await check('email', 'Wrong email format').isEmail().run(req);
  await check('email', 'Email is required').exists().run(req);
  await check('password', 'password is required').exists().run(req);
  await check('password', 'password must be a string').isString().run(req);
  await check('firstName', 'firstName is required').exists().run(req);
  await check('lastName', 'lastName is required').exists().run(req);
  await check('gender', 'gender is required').exists().run(req);
  await check('gender', 'gender should be MALE or FEMALE').isIn(['MALE', 'FEMALE']).run(req);
  await check('password', 'Password cannot be blank').isLength({ min: 6 }).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ message: 'Missing required information', errors: errors.array() });
    return;
  }
  next();
};

export default createUser;
