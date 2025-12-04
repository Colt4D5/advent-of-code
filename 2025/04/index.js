import { readInput } from '../../utils.js';

// read lines
let inputFilePath = 'input.txt';
// inputFilePath = 'sample-input.txt';

let input = await readInput(inputFilePath);
input = input.split('\n');

async function partOne(input) {
    const matrix = input.map(row => row.split(''));
    const altMatrix = input.map(row => row.split(''));

    // loop over inputs
    let totalAccessible = 0;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] !== '@') continue;
            const surroundingAtCount = checkSurroundingMatrices(matrix, row, col);
            if (surroundingAtCount < 4) {
                altMatrix[row][col] = 'X';
                totalAccessible++;
            }
        }            
    }
    console.log(altMatrix.map(row => row.join('')).join('\n'));
    console.log("Total Accessible:", totalAccessible);
}

async function partTwo(input) {
    const matrix = input.map(row => row.split(''));

    // loop over inputs
    let totalAccessible = 0;
    let currentAccessible = 0;
    let round = 1;
    do {
        currentAccessible = 0;
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col] !== '@') continue;
                const surroundingAtCount = checkSurroundingMatrices(matrix, row, col);
                if (surroundingAtCount < 4) {
                    matrix[row][col] = 'X';
                    totalAccessible++;
                    currentAccessible++;
                }
            }            
        }
        console.log(totalAccessible, round);
        round++;
    } while (currentAccessible > 0);
    console.log(matrix.map(row => row.join('')).join('\n'));
    console.log("Total Accessible:", totalAccessible);
}

function checkSurroundingMatrices(matrix, row, col) {
    let totalAccessible = 0;
    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            if (
                (y === 0 && x === 0) ||
                (row === 0 && y === -1) ||
                (row === matrix.length - 1 && y === 1) ||
                (col === 0 && x === -1) ||
                (col === matrix[row].length - 1 && x === 1)
            ) continue;
            if (matrix[row + y][col + x] === '@') {
                totalAccessible++;
            }
        }
    }
    return totalAccessible;
}

// partOne(input);

partTwo(input);