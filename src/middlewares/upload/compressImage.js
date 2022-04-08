import { mkdirSync } from 'fs-extra';
import im from 'imagemagick';
import * as fs from 'fs';
import path from 'path';
import getFilePath from 'helpers/getFilePath';

const compressImage = ({
  field,
  folder,
}) => async (req, res, next) => {
  if (!req.file) {
    next();

    return;
  }

  // if (typeGuard(req.body[field])) {
  //   res.locals[field] = [req.body[field]];
  //   next();

  //   return;
  // }

  try {
    mkdirSync(
      resolveApp(`${process.env.IMAGE_STORAGE_LOCATION}/${folder}`) || 'avatars',
      {
        recursive: true,
      },
    );

    const media = await processOneFile({ file: req.file, folder });

    res.locals[field] = media;

    next();

    return;
  } catch (error) {
    res.status(400).send({ message: 'Something went horribly wrong', error });
  }
};
const appDirectory = fs.realpathSync(process.cwd());

export const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
export const processOneFile = async ({ file, folder }) => {
  const { filename: fileNameExtension, path: oldPath } = file;
  const fileNameExtensionSplit = fileNameExtension.split('.');
  const filename = fileNameExtensionSplit[0];
  const extension = fileNameExtensionSplit[1];

  const folderPath = resolveApp(`${process.env.IMAGE_STORAGE_LOCATION}/${folder}`);

  const basePath = `${folderPath}/${filename}`;
  const newPath = `${basePath}.${extension}`;

  await new Promise((res, rej) => {
    im.resize(
      {
        srcPath: oldPath,
        dstPath: newPath,
        width: 1000,
        customArgs: ['-auto-orient'],
        quality: 1,
      },
      err => {
        if (err) return rej(err);

        return res('image compressed');
      },
    );
  });

  fs.unlinkSync(oldPath);

  return getFilePath(newPath);
};
export default compressImage;
