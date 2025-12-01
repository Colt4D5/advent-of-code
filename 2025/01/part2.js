import readline from 'readline';
import fs from 'fs';

let timesPastZero = 0;
let dialValue = 50;

// read lines
const lines = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity,
});

// loop over inputs
for await (const line of lines) {
    const currentDifference = +line.replace(/[^0-9]/g, '');

    for (let i = 0; i < currentDifference; i++) {
        dialValue += line[0] === 'R' ? 1 : -1;
        
        if (line[0] === 'R') {
            if (dialValue > 99) dialValue = 0;
        } else {
            if (dialValue < 0) dialValue = 99;
        }

        if (dialValue === 0) timesPastZero++;
    }
}

// console.log(`Final dial value: ${dialValue}`);
console.log(`Number of 0s: ${timesPastZero}`);