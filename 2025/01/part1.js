import readline from 'readline';
import fs from 'fs';

let numberOfZeroes = 0;
let startingValue = 50;

// read lines
const lines = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity,
});

// loop over inputs
for await (const line of lines) {
    const currentDifference = (+line.replace(/[^0-9]/g, '')) % 100;
    let newVal = line[0] === 'L' ? startingValue + (currentDifference * -1) : startingValue + currentDifference;
    if (newVal > 99) newVal -= 100;
    if (newVal < 0) newVal += 100;
    if (newVal === 0) numberOfZeroes++;
    startingValue = newVal;
}

console.log(`Number of 0s: ${numberOfZeroes}`);