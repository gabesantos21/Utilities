import axios from 'axios';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

const fetchData = async () => {
  try {
    // ! Commented below code as it is having the too much requests error as of the moment of this development
    const response = await axios.get('https://bored-api.appbrewery.com/random');
    // const response = await axios.get(
    //   'https://jsonplaceholder.typicode.com/posts/1'
    // );
    return response.data;
  } catch (e) {
    throw error({ Error: e });
  }
};

// Function to save data as JSON
const saveAsJson = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  console.log('Data saved to data.json');
};

// Function to save data as CSV
const saveAsCsv = (data) => {
  const csvWriter = createObjectCsvWriter({
    path: 'data.csv',
    header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
  });

  csvWriter
    .writeRecords(data)
    .then(() => console.log('Data saved to data.csv'));
};

// Defines and preprocess args via yargs
const argv = yargs(hideBin(process.argv)).options({
  n: { type: 'number', default: 1, describe: 'Number of requests' },
  f: { type: 'string', default: 'console', describe: 'Format of the response' },
}).argv;

const main = async () => {
  // extracts value of args n and f
  const { n, f } = argv;
  // initialize temp storage
  const data = [];

  for (let i = 0; i < n; i++) {
    const result = await fetchData();
    data.push(result);
  }

  switch (f) {
    case 'json':
      saveAsJson(data);
      break;
    case 'csv':
      saveAsCsv(data);
      break;
    case 'console':
      console.log(data);
      break;
  }
};

main();
