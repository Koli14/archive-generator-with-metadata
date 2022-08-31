import generateArchive from './src/generator.js';
const args = process.argv.slice(2);

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

String.prototype.replaceAll = function (target, payload) {
    let regex = new RegExp(escapeRegExp(target), 'g')
    return this.valueOf().replace(regex, payload)
};


if (args.length < 3) {
  console.log(
    'Please provide a source folder, a destination folder, and a file containing the metadata as arguments. Eg:  node index.js ../Documents ../MyArcive ../metadata.csv'
  );
} else {
  generateArchive(args);
}
