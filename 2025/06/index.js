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
    return vals.reduce((acc, val) => operator === '*' ? acc * +val : acc + +val, operator === '*' ? 1 : 0);
}

function partTwo() {
    const rows = input.split('\n');

    const rowCount = rows.length;
    const colCount = rows[0].length;

    let lastOperator = '';
    const operatorRow = rows[rowCount - 1].split('').map((val, i) => {
        if (val === '*' || val === '+') lastOperator = val;
        return val === ' ' ? lastOperator : val;
    }).join('');

    let calculations = [];
    let index = 0;

    for (let col = colCount - 1; col >= 0; col--) {
        const value = rows.slice(0, -1).map(row => row[col]).join('');
        const operator = operatorRow[col];

        if (value.trim() === '') {
            index++;
            continue;
        } else {
            if (!calculations[index]) {
                calculations.push(+value);
            } else {
                calculations[index] = performMathOperations(operator, calculations[index], +value);
            }
        }
    }
    const result = calculations.reduce((acc, val) => acc + val, 0);
    console.log("Result:", result);
}

// partOne();
partTwo();