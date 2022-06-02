import path from 'path';
import fs from 'fs-extra';

export default function createContent(dir) {
  let breadCrumbItem = fs.readFileSync('templates/content/breadCrumbItem.html.html', 'utf8');
  let activebreadCrumbItem = fs.readFileSync('templates/content/activeBreadcrumbItem.html', 'utf8');

  const breadcrumb = path
    .relative('./', dir)
    .split(path.sep)
    .map((item, index, array) => {
      let url = '';
      for (let j = 0; j <= index; j++) {
        url += '/' + array[j];
      }
      if (index == array.length - 1) {
        return ActivebreadCrumbItem.replace('${item}', item);
      }
      return breadCrumbItem.replace('${item}', item);
    })
    .join('\n');
  console.log(breadcrumb);
}
