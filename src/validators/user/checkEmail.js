import { check, validationResult } from 'express-validator';

const checkIfEmailPresent = async (req, res, next) => {
  await check('email', 'Wrong email format').isEmail().run(req);
  await check('email', 'Email is required').exists().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array(), message: 'Wrong email format' });
  }

  next();
};

export default checkIfEmailPresent;
