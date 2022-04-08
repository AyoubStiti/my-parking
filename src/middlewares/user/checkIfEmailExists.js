import User from 'models/User';

const checkIfEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(422).send('E-mail already in use');
    return;
  }
  next();
};

export default checkIfEmailExists;
