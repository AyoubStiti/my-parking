const isAdministrator = async (_req, res, next) => {
  const { role } = res.locals.currentUser;
  if (role < 3) res.status(401).send('Please login with an Administrator account');
  else next();
};

export default isAdministrator;
