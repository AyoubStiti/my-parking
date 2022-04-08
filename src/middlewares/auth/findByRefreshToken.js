import User from 'models/User';
import VerifyToken from 'helpers/verifyToken';
import { checkTokenPresence } from './currentUser';

const findByRefreshToken = async (req, res, next) => {
  try {
    const token = checkTokenPresence(req);
    const decodedToken = VerifyToken(token, process.env.REFRESH_TOKEN_SECRET_KEY || '');
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(404).send('Problem while finding user');
      return;
    }
    res.locals.currentUser = user;
    res.locals.token = token;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default findByRefreshToken;
