import readline from 'readline';
import fs from 'fs';

// read lines
const lines = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity,
});
const sampleLines = readline.createInterface({
    input: fs.createReadStream('sample-input.txt'),
    crlfDelay: Infinity,
});

async function partOne(input) {
    let joltageArr = [];

    // loop over inputs
    for await (const row of input) {
        const highest = getIndexOfHighestValue(row.slice(0, -1))
        const secondHighest = getIndexOfHighestValue(row.slice(highest[1] + 1));
        
        joltageArr.push(`${highest[0]}${secondHighest[0]}`);
    }
    console.log(joltageArr.reduce((acc, cur) => acc += +cur, 0));
}

function getIndexOfHighestValue(arr) {
  let highest = [0, 0];
  for (let i = 9; i > 0; i--) {
    if (arr.indexOf(i) >= 0) {
      highest = [i, arr.indexOf(i)];
      break;
    }
  }
  return highest;
}


partOne(lines);
// partOne(sampleLines);