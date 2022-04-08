import * as AuthMiddleware from 'middlewares/auth';
import * as userController from 'controllers/userController';
import * as userMiddleware from 'middlewares/user';
import * as userValidator from 'validators/user';
import { Router } from 'express';
import upload from 'helpers/defaultMulterConfig';
import * as UploadMiddleware from 'middlewares/upload';

const router = Router();

const API_ROUTE_HEADER = '/users';

router.post(
  API_ROUTE_HEADER,
  upload.single('avatar'),
  UploadMiddleware.compressImage({
    field: 'avatar',
    folder: 'profilePictures',
    convertToGif: true,
  }),
  userValidator.createUser,
  userMiddleware.checkIfEmailExists,
  userController.signUp,
);
router.get(`${API_ROUTE_HEADER}/by-token`, AuthMiddleware.currentUser, userController.fetchByToken);
router.get(`${API_ROUTE_HEADER}/refresh-token`, AuthMiddleware.findByRefreshToken, userController.refreshToken);
router.post(`${API_ROUTE_HEADER}/sign-in`, userValidator.signIn, userMiddleware.findByEmail, userMiddleware.signIn, userController.signIn);
router.post(`${API_ROUTE_HEADER}/sign-out`, AuthMiddleware.findByRefreshToken, userController.signOut);
router.get(`${API_ROUTE_HEADER}/activate-email`, userMiddleware.checkEmailActivationToken, userController.activateAccount);
router.patch(
  `${API_ROUTE_HEADER}/update-password`,
  userValidator.updatePassword,
  AuthMiddleware.currentUserWithPassword,
  userMiddleware.signIn,
  userController.updatePassword,
);
router.post(`${API_ROUTE_HEADER}/forgot-password`, userValidator.checkEmail, userMiddleware.findByEmail, userController.forgotPassword);
router.post(`${API_ROUTE_HEADER}/reset-password`, userValidator.resetPassword, userMiddleware.checkPasswordResetToken, userController.resetPassword);
router.delete(`${API_ROUTE_HEADER}/:id`, AuthMiddleware.currentUser, AuthMiddleware.isAdministrator, userController.deleteUserById);
router.patch(`${API_ROUTE_HEADER}/:id`, AuthMiddleware.currentUser, AuthMiddleware.isAdministrator, userController.updateUserById);
router.get(`${API_ROUTE_HEADER}/:id`, AuthMiddleware.currentUser, AuthMiddleware.isAdministrator, userController.getUserById);
router.patch(API_ROUTE_HEADER, userValidator.updateUser, AuthMiddleware.currentUser, userController.updateUser);
router.get(API_ROUTE_HEADER, userController.getAllUsers);

export default router;
