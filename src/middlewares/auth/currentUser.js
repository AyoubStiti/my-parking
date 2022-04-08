import User from 'models/User';
import VerifyToken from 'helpers/verifyToken';

const currentUser = async (req, res, next) => {
  try {
    const token = checkTokenPresence(req);
    const decodedToken = VerifyToken(token, process.env.ACCESS_TOKEN_SECRET_KEY || '');
    const user = await User.findById(decodedToken.id, { password: false, emailActivationToken: false });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.locals.currentUser = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') res.status(403).send('IToken expired');
    else {
      res.status(400).send(error.message);
    }
  }
};

export const checkTokenPresence = req => {
  const header = req.headers.authorization;
  if (!header) throw Error('No token');
  const bearer = header.split(' ');
  return bearer[1];
};

export default currentUser;
