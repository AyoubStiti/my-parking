import * as TokenService from 'services/tokenService';
import * as UserService from 'services/userService';
import { hashSync } from 'bcrypt';

export const hashPassword = password => hashSync(password, 12);

export const signUp = async (req, res) => {
  const userData = req.body;
  const { avatar } = res.locals;
  const { password } = userData;
  const hashedPassword = hashPassword(password);
  userData.password = hashedPassword;

  if (avatar) userData.avatar = avatar;
  try {
    const user = await UserService.signUp(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
export const signIn = (req, res) => {
  UserService.signIn(res);
};

export const activateAccount = (req, res) => {
  UserService.activateAccount(res);
};

export const forgotPassword = (req, res) => {
  try {
    const { selectedUser } = res.locals;
    const resetPasswordToken = TokenService.createToken(selectedUser.id, process.env.PASSWORD_RESET_SECRET_KEY || '');
    selectedUser.resetPasswordToken = resetPasswordToken;
    UserService.forgotPassword(selectedUser);
    const resetPasswordRoute = `${process.env.FRONT_END_URI}/resetpassword?token=${resetPasswordToken}`;
    //   const emailSubject = 'Réinitialisation de votre mot de passe My Parking';
    //   const emailHtmlBody = `<div><h1>El Business</h1><p>Veuillez cliquer <a href=${resetPasswordRoute}>ici</a> afin
    // de réinitialiser votre mot de passe</p></div>`;
    // await mailer(user.email, emailSubject, emailHtmlBody);
    res.status(200).send(`Password reset request success, reset url:${resetPasswordRoute}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const resetPassword = (req, res) => {
  UserService.resetPassword(req.body.password, res);
};

export const getAllUsers = (req, res) => {
  UserService.getAllUsers(res);
};

export const getUserById = (req, res) => {
  UserService.getUserById(req.params.id, res);
};

export const deleteUserById = (req, res) => {
  UserService.deleteUserById(req.params.id, res);
};

export const updateUserById = (req, res) => {
  UserService.updateUserById(req.params.id, req.body, res);
};

export const signOut = async (req, res) => {
  const { currentUser, token } = res.locals;

  try {
    await UserService.signOut(currentUser, token);
    res.status(200).send('user logged out');
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message, stack: error.stack });
  }
};

export const refreshToken = async (req, res) => {
  const { currentUser } = res.locals;

  try {
    const token = await UserService.refreshToken(currentUser.id);

    res.send({ accessToken: token });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message, stack: error.stack });
  }
};

export const fetchByToken = (req, res) => {
  res.send(res.locals.currentUser);
};

export const updateUser = (req, res) => {
  UserService.updateUser(res);
};

export const updatePassword = (req, res) => {
  UserService.updatePassword(req.body, res);
};
