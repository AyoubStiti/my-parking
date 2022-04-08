import * as fs from 'fs';

require('dotenv').config();

const createUserFolder = path => {
  const fullPath = `${process.env.IMAGE_STORAGE_LOCATION}/${path}`;
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  }
  return fullPath;
};

export default createUserFolder;
