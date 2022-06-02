import generateArchive from './src/generator.js';
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(
    'Please provide a source and a destination folder as arguments. Eg:  node index.js ../Documents ../MyArcive'
  );
} else {
  generateArchive(args);
}
