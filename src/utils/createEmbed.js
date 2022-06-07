import fs from 'fs-extra';
import path from 'path';

export default function createEmbed(archiveContentDir, dir, item) {
  const page = fs.readFileSync('templates/content/page.html', 'utf8');
  const breadCrumbItem = fs.readFileSync('templates/content/breadCrumbItem.html', 'utf8');
  const embedBreadcrumbItem = fs.readFileSync('templates/content/embedBreadcrumbItem.html', 'utf8');
  const object = fs.readFileSync('templates/content/object.html', 'utf8');

  const breadcrumb = path
    .relative(archiveContentDir, dir + '/' + item)
    .split(path.sep)
    .map((element, index, array) => {
      if (index == array.length - 1) {
        return embedBreadcrumbItem.replaceAll('${item}', element);
      }
      return breadCrumbItem
        .replace('${item}', element)
        .replace('${href}', '../'.repeat(array.length - 1 - index) + element);
    })
    .join('\n');

  const assetPath = path.relative(dir, archiveContentDir) ? path.relative(dir, archiveContentDir) : './';

  const embedHtml = page
    .replace('${title}', item)
    .replaceAll('${assetsPath}', '../' + assetPath)
    .replace('${breadcrumb}', breadcrumb)
    .replace('${content}', object.replaceAll('${item}', item));

  fs.writeFileSync(dir + '/' + item + '.html', embedHtml);
}
