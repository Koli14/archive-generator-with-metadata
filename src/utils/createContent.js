import fs from 'fs-extra';
import path from 'path';
import { formatBytes, createEmbed } from './index.js';

export default function createContent(archiveDir, archiveContentDir, dir, fileNodes) {
  const page = fs.readFileSync('templates/content/page.html', 'utf8');
  const breadCrumbItem = fs.readFileSync('templates/content/breadCrumbItem.html', 'utf8');
  const activebreadCrumbItem = fs.readFileSync('templates/content/activeBreadcrumbItem.html', 'utf8');
  const table = fs.readFileSync('templates/content/table.html', 'utf8');
  const tableRow = fs.readFileSync('templates/content/tableRow.html', 'utf8');

  // console.log('XXX');

  // console.log(dir, fileNodes);

  const breadcrumb = path
    .relative(archiveDir, dir)
    .split(path.sep)
    .map((item, index, array) => {
      //console.log(item, index, array);

      if (index == array.length - 1) {
        return activebreadCrumbItem.replace('${item}', item);
      }
      return breadCrumbItem.replace('${item}', item).replace('${href}', '../'.repeat(array.length - 1 - index) + item);
    })
    .join('\n');

  const tableRows = fileNodes
    .map((item) => {
      const itemDir = dir + '/' + item;
      //console.log(item, itemDir);
      const stat = fs.lstatSync(itemDir);

      if (stat.isFile()) {
        createEmbed(archiveDir, archiveContentDir, dir, item);
      }

      return tableRow
        .replace('${href}', './' + path.basename(dir) + '/' + item)
        .replace('${item}', item)
        .replace('${birthtime}', stat.birthtime.toLocaleString())
        .replace('${mtime}', stat.mtime.toLocaleString())
        .replace('${size}', formatBytes(stat.size))
        .replace('${fileNodeType}', stat.isDirectory() ? 'fa-folder' : 'fa-file');
    })
    .join('\n');

  const assetPath = path.relative(dir, archiveContentDir) ? path.relative(dir, archiveContentDir) : './';

  const pageHtml = page
    .replace('${title}', path.basename(dir))
    .replaceAll('${assetsPath}', assetPath)
    .replace('${breadcrumb}', breadcrumb)
    .replace('${content}', table.replace('${rows}', tableRows));
  //console.log(dir);

  fs.writeFileSync(dir + '.html', pageHtml);

  //console.log(tableRows);

  //table.replace('${rows}')
}
