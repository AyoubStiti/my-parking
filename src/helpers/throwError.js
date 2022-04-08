import errors from 'errors';

export const throwError = (res, error, errorStatus = 1, requestStatus = 400) => {
  res.status(requestStatus).send({ status: errorStatus, error: errors[errorStatus], message: error.message });
};
