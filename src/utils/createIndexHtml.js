import fs from 'fs-extra';
import path from 'path';
import { readdir } from 'node:fs/promises';
import createContent from './createContent.js';
//
export default async function createIndexHtml(archiveDir, archiveContentDir) {
  let indexTemplate = fs.readFileSync('templates/index.html', 'utf8');
  const folderTemplate = fs.readFileSync('templates/treeView/folder.html', 'utf8');
  const fileTemplate = fs.readFileSync('templates/treeView/file.html', 'utf8');

  async function createRecurcsiveTreeItem(dir, parent = '${childs}') {
    try {
      const fileNodes = await readdir(dir);

      let childs = '';
      for (const fileNode of fileNodes) {
        const filePath = path.resolve(dir, fileNode);
        const stat = fs.lstatSync(filePath);
        if (stat && stat.isDirectory()) {
          childs += folderTemplate.replace('${name}', fileNode).replace('${href}', filePath);
          childs = await createRecurcsiveTreeItem(filePath, childs);
        } else {
          childs += fileTemplate.replace('${name}', fileNode).replace('${href}', filePath);
        }
      }
      createContent(archiveContentDir, dir);
      console.log(' ');
      console.log(' ');
      console.log(' ');

      return parent.replace('${childs}', childs);
    } catch (err) {
      console.error(err);
    }
  }

  const treeHtml = await createRecurcsiveTreeItem(archiveContentDir);

  indexTemplate = indexTemplate.replace('${treeView}', treeHtml);
  fs.writeFileSync(`${archiveDir}/index.html`, indexTemplate);
  // const createTreeView = function (dir, done) {
  //   fs.readdir(dir, function (err, treeHtml) {
  //     if (err) return done(err);
  //     //createContent(dir, list, archiveContentDir);
  //     createTree(dir, done, list);
  //   });
  // };

  // createTreeView(archiveDir, function (err, treeHtml) {
  //   if (err) throw err;
  //   indexTemplate.replace('${treeView}', treeHtml);
  //   fs.writeFileSync('./archive/index.html', indexTemplate);
  // });
}
