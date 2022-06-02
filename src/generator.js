import { copyFolders, createIndexHtml } from './utils/index.js';

export default function generator(args) {
  const [srcArchiveDir, archiveDir] = args;
  const archiveContentDir = archiveDir + '/content';
  const assetsDir = './assets';
  const archiveAssetsDir = archiveDir + '/assets';
  copyFolders(srcArchiveDir, archiveContentDir);
  copyFolders(assetsDir, archiveAssetsDir);

  createIndexHtml(srcArchiveDir, archiveDir);
}
