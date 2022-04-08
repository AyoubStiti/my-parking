import User from 'models/User';
import VerifyToken from 'helpers/verifyToken';
import { checkTokenPresence } from './currentUser';

const currentUserWithPassword = async (req, res, next) => {
  try {
    const token = checkTokenPresence(req);
    const decodedToken = VerifyToken(token, process.env.ACCESS_TOKEN_SECRET_KEY || '');
    const user = await User.findById(decodedToken.id, { emailActivationToken: false });
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

export default currentUserWithPassword;
