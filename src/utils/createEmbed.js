import fs from 'fs-extra';
import path from 'path';

export default function createEmbed(archiveDir, archiveContentDir, dir, item) {
  const page = fs.readFileSync('templates/content/page.html', 'utf8');
  const breadCrumbItem = fs.readFileSync('templates/content/breadCrumbItem.html', 'utf8');
  const embedBreadcrumbItem = fs.readFileSync('templates/content/embedBreadcrumbItem.html', 'utf8');
  const object = fs.readFileSync('templates/content/object.html', 'utf8').replaceAll('${item}', item.name);

  const breadcrumb = path
    .relative(archiveDir, dir + '/' + item.name)
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
    .replace('${title}', item.name)
    .replaceAll('${assetsPath}', '../' + assetPath)
    .replace('${breadcrumb}', breadcrumb)
    .replace('${content}', object);

  fs.writeFileSync(dir + '/' + item.name + '.html', embedHtml);
}
