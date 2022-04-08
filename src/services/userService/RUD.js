/* eslint-disable no-underscore-dangle */
import User from 'models/User';
import { hashPassword } from './auth';

export const getAllUsers = async (res) => {
  const payload = await User.find();
  res.send(payload);
};

export const getUserById = async (userId, res) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(422).send({ error, message: 'Something went horribly wrong!' });
  }
};

export const deleteUserById = async (userId, res) => {
  const success = await User.findByIdAndDelete(userId);
  if (!success) {
    res.status(404).send('User not found');
    return;
  }
  res.send('User deleted ');
};

export const updateUserById = async (userId, userData, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      projection: { password: false, emailActivationToken: false },
      new: true,
    });
    if (!updatedUser) {
      res.status(404).send('User not found');
      return;
    }
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateUser = async (res) => {
  try {
    const { currentUser, updateData, avatar } = res.locals;
    if (updateData) {
      // @ts-ignore
      Object.keys(updateData).forEach((element) => (currentUser[element] = updateData[element]));
    }
    if (avatar) currentUser.avatar = avatar;
    const updatedUser = await currentUser.save();
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updatePassword = async ({ newPassword }, res) => {
  try {
    const { currentUser } = res.locals;
    currentUser.password = hashPassword(newPassword);
    const updatedUser = await currentUser.save();
    res.send(updatedUser);
  } catch (error) {
    res.status(404).send(error);
  }
};
