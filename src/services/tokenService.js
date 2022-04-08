import { sign, verify } from 'jsonwebtoken';

export const isAccessTokenStillValid = token => {
  try {
    verify(token, process.env.ACCESS_TOKEN_SECRET_KEY || '', error => {
      if (error && error.name === 'TokenExpiredError') throw new Error('Token expired');

      return true;
    });

    return true;
  } catch (error) {
    return false;
  }
};
export const createToken = (id, secret, isExpireble = true) => sign(
  { id },
  secret,
  isExpireble
    ? {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    }
    : undefined,
);
export const createAccessToken = id => sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
  expiresIn: process.env.TOKEN_EXPIRES_IN,
});
export const createRefreshToken = id => sign({ id }, process.env.REFRESH_TOKEN_SECRET_KEY);
