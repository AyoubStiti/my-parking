import * as TokenService from 'services/tokenService';
import User from 'models/User';

export const signUp = async userData => {
  const user = await new User(userData).save();
  const emailActivationToken = TokenService.createToken(user.id, process.env.EMAIL_ACTIVATION_SECRET_KEY || '');
  user.emailActivationToken = emailActivationToken;
  await user.save();
  return await constructSignedInUserObject(user);
};

export const activateAccount = async res => {
  try {
    const { user } = res.locals;
    user.activated = true;
    user.emailActivationToken = null;
    await user.save();
    res.send('Account activated, you can now log in to Oryx Guide');
  } catch (error) {
    res.status(400).send(error);
  }
};

export const forgotPassword = user => user.save();

export const resetPassword = async (newPassword, res) => {
  try {
    const { user } = res.locals;
    // const hashedPassword = hashPassword(newPassword);
    // user.password = hashedPassword;
    // user.resetPasswordToken = null;
    await user.save();
    res.send('Password reset successfully');
  } catch (error) {
    res.status(400).send(error);
  }
};

export const signIn = async res => {
  const { selectedUser } = res.locals;
  const updatedUser = await constructSignedInUserObject(selectedUser);

  res.send(updatedUser);
};

export const signOut = async (currentUser, token) => {
  currentUser.refreshTokens = currentUser.refreshTokens.filter(refreshToken => refreshToken !== token);
  await currentUser.save();
};

export const createRefreshToken = async user => {
  const { refreshTokens } = user;
  const newRefreshToken = TokenService.createRefreshToken(user.id);

  refreshTokens.push(newRefreshToken);

  await user.save();

  return newRefreshToken;
};

export const constructSignedInUserObject = async user => {
  const refreshToken = await createRefreshToken(user);
  const accessToken = TokenService.createAccessToken(user.id);

  return { user, token: { refreshToken, accessToken } };
};

export const refreshToken = async id => TokenService.createAccessToken(id);
