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
        const highest = getIndexOfHighestValue(row.slice(0, -1));
        const secondHighest = getIndexOfHighestValue(row.slice(highest[1] + 1));
        
        joltageArr.push(`${highest[0]}${secondHighest[0]}`);
    }
    console.log(joltageArr.reduce((acc, cur) => acc += +cur, 0));
}

async function partTwo(input) {
    let joltageArr = [];

    // loop over inputs
    for await (const row of input) {
        let totalJoltage = '';
        let lastIndex = -1;

        for (let i = -11; i <= 0; i++) {
            const arr = i < 0 ? row.slice(0, i) : row.slice(0);
            for (let j = 9; j > 0; j--) {
                if (arr.slice(lastIndex + 1).indexOf(j) >= 0) {
                    totalJoltage += j;
                    lastIndex = arr.slice(lastIndex + 1).indexOf(j) + (lastIndex + 1);
                    break;
                }
            }
        }
        joltageArr.push(totalJoltage);
    }
    console.log(joltageArr.reduce((acc, cur) => acc += +cur, 0));
}

function getIndexOfHighestValue(arr, prevIndex, usedIndexes = []) {
  let highest = [0, 0];
  for (let i = 9; i > 0; i--) {
    if (arr.slice(usedIndexes[-1]).indexOf(i) >= 0 && !usedIndexes.includes(arr.slice(prevIndex).indexOf(i))) {
      highest = [i, arr.indexOf(i) + prevIndex];
      break;
    }
  }
  return highest;
}


// partOne(lines);
// partOne(sampleLines);

partTwo(lines);
// partTwo(sampleLines);



