import { remove } from 'fs-extra';
import errors from 'errors';
import { get } from 'lodash';

const deleteFile = field => async (_req, res, next) => {
  try {
    const path = get(res.locals, field);

    if (path) await remove(`public/${path}`);
    next();
  } catch (error) {
    res.status(500)
      .send({ status: 500, error: errors[1], message: error.message });
  }
};

export default deleteFile;
