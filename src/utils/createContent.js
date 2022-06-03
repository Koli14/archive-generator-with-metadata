import path from 'path';
import fs from 'fs-extra';

export default function createContent(archiveContentDir, dir) {
  const breadCrumbItem = fs.readFileSync('templates/content/breadCrumbItem.html', 'utf8');
  const activebreadCrumbItem = fs.readFileSync('templates/content/activeBreadcrumbItem.html', 'utf8');

  const breadcrumb = path
    .relative(archiveContentDir, dir)
    .split(path.sep)
    .map((item, index, array) => {
      let url = '';
      for (let j = 0; j <= index; j++) {
        url += '/' + array[j];
      }

      if (index == array.length - 1) {
        return activebreadCrumbItem.replace('${item}', item);
      }
      return breadCrumbItem.replace('${item}', item).replace('${href}', archiveContentDir + url);
    })
    .join('\n');
}
