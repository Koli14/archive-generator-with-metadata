import fs from 'fs-extra';

export default function copyFolders(src, target) {
  fs.copySync(src, target, { overwrite: true }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('success copy!');
    }
  });
}
