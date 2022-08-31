import fs from 'fs-extra';
import path from 'path';
import { createEmbed } from './index.js';

export default function createContent(archiveDir, archiveContentDir, dir, fileNodes, metaData) {
  const page = fs.readFileSync('templates/content/page.html', 'utf8');
  const breadCrumbItem = fs.readFileSync('templates/content/breadCrumbItem.html', 'utf8');
  const activebreadCrumbItem = fs.readFileSync('templates/content/activeBreadcrumbItem.html', 'utf8');
  const table = fs.readFileSync('templates/content/table.html', 'utf8');
  const tableRow = fs.readFileSync('templates/content/tableRow.html', 'utf8');

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
      if (!item.isDir) {
        createEmbed(archiveDir, archiveContentDir, dir, item);
      }
      const relativePath = path.relative(archiveDir, dir + '/' + item.name).replaceAll(path.sep, '/');
      const { revision, status, 'create date': createDate, originator, abnahmepflichtig, description } = metaData[relativePath] || {};
      return tableRow
        .replace('${href}', './' + path.basename(dir) + '/' + item.name)
        .replace('${item}', item.name)
        .replace('${revision}', revision || '')
        .replace('${status}', status || '')
        .replace('${createDate}', createDate || '')
        .replace('${originator}', originator || '')
        .replace('${abnahmepflichtig}', abnahmepflichtig || '')
        .replace('${description}', description || '')
        // .replace('${size}',  meta['file length'] || item.size)
        .replace('${size}', item.size)
        .replace('${fileNodeType}', item.isDir ? 'fa-folder' : 'fa-file');
    })
    .join('\n');

  const assetPath = path.relative(dir, archiveContentDir) ? path.relative(dir, archiveContentDir) : './';

  const pageHtml = page
    .replace('${title}', path.basename(dir))
    .replaceAll('${assetsPath}', assetPath)
    .replace('${breadcrumb}', breadcrumb)
    .replace('${content}', table.replace('${rows}', tableRows));

  fs.writeFileSync(dir + '.html', pageHtml);
}
