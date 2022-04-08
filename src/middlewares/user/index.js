import checkEmailActivationToken from 'middlewares/user/checkEmailActivationToken';
import checkIfEmailExists from 'middlewares/user/checkIfEmailExists';
import checkPasswordResetToken from 'middlewares/user/checkPasswordResetToken';
import findByEmail from 'middlewares/user/findByEmail';
import signIn from 'middlewares/user/signIn';
import updateAvatar from 'middlewares/user/updateAvatar';

export {
  checkEmailActivationToken,
  checkIfEmailExists,
  checkPasswordResetToken,
  signIn,
  findByEmail,
  updateAvatar,
};
