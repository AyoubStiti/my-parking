import { compareSync } from 'bcrypt';

const signIn = async (req, res, next) => {
  const { password } = req.body;
  const { password: userPassword, isBanned } = res.locals.selectedUser || res.locals.currentUser;

  try {
    checkVerifications(isBanned);
    if (!compareSync(password, userPassword)) {
      throw Error('Password incorrect');
    }
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

const checkVerifications = (banned) => {
  if (banned) throw Error('User banned');
};

export default signIn;
