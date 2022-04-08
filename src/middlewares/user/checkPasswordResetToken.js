import User from 'models/User';
import verifyToken from 'helpers/verifyToken';

const checkPasswordResetToken = async (req, res, next) => {
  const { token } = req.body;
  try {
    const decodedToken = verifyToken(token, process.env.EMAIL_ACTIVATION_SECRET_KEY || '');
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(404).send('Problem while finding user');
      return;
    }
    res.locals.selectedUser = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(403).send('IToken expired');
      return;
    }
    res.status(500).send('Something went wrong');
  }
};

export default checkPasswordResetToken;
