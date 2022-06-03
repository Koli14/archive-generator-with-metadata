import path from 'path';
import { copyFolders, createIndexHtml } from './utils/index.js';

export default function generator(args) {
  let [srcArchiveDir, archiveDir] = args;
  srcArchiveDir = path.resolve(srcArchiveDir);
  archiveDir = path.resolve(archiveDir).replaceAll(path.sep, '/');
  const archiveContentDir = archiveDir + '/content';
  const assetsDir = './assets';
  const archiveAssetsDir = archiveDir + '/assets';
  copyFolders(srcArchiveDir, archiveContentDir);
  copyFolders(assetsDir, archiveAssetsDir);

  createIndexHtml(archiveDir, archiveContentDir);
}
