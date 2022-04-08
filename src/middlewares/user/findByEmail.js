import User from 'models/User';

const findByEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send('Problem while finding user');
    return;
  }
  res.locals.selectedUser = user;
  next();
};

export default findByEmail;
