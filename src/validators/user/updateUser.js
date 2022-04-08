const updateUser = (req, res, next) => {
  let updateData = {};
  Object.keys(req.body).forEach((element) => {
    if (accessibleData.includes(element)) updateData = { ...updateData, [element]: req.body[element] };
  });
  res.locals.updateData = updateData;
  next();
};

const accessibleData = ['country', 'lastName', 'firstName', 'companyName', 'phoneNumber'];

export default updateUser;
