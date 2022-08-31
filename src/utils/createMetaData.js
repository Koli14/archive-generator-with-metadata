import fs from 'fs-extra';
import path from 'path';
import { parse } from 'csv-parse';

export default async function createMetadata(metadataPath) {
  const rawMetaData = fs.readFileSync(metadataPath, 'utf8');
  const records = await processFile(metadataPath);
  const  converted = records.reduce((obj, item) => (obj[item.directory + item.filename] = item, obj) ,{});
  return converted;
}

const processFile = async (metadataPath) => {
  const records = [];
  const parser = fs
    .createReadStream(metadataPath)
    .pipe(parse({
      delimiter: ';',
      columns: true
    }));
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};
