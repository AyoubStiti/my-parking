import nodePath from 'path';

export default path => path.split(`public${nodePath.sep}`)[1];
