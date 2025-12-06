import { readInput } from '../../utils.js';

// read lines
let inputFilePath = 'input.txt';
// inputFilePath = 'sample-input.txt';

let input = await readInput(inputFilePath);

function partOne() {
    const cleanedRows = input.split('\n').map(row => row.split(' ').filter(entry => entry !== ''));

    const rowCount = cleanedRows.length;
    const colCount = cleanedRows[0].length;

    let total = 0;

    for (let col = 0; col < colCount; col++) {
        const vals = cleanedRows.map(row => row[col]);
        const operator = vals.pop();

        const result = performMathOperations(operator, ...vals);
        total += result;
    }

    console.log("Total:", total);
}

function performMathOperations(operator, ...vals) {
    if (operator === '*') {
        return vals.reduce((acc, val) => acc * +val, 1);
    } else if (operator === '+') {
        return vals.reduce((acc, val) => acc + +val, 0);
    }
}

partOne(input);