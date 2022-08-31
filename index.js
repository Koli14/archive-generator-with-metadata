import generateArchive from './src/generator.js';
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log(
    'Please provide a source folder, a destination folder, and a file containing the metadata as arguments. Eg:  node index.js ../Documents ../MyArcive ../metadata.csv'
  );
} else {
  generateArchive(args);
}
