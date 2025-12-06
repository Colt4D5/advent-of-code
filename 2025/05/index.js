import { readInput } from '../../utils.js';

// read lines
let inputFilePath = 'input.txt';
// inputFilePath = 'sample-input.txt';

let input = await readInput(inputFilePath);

function partOne() {
    let [ranges, ids] = input.split('\n\n');

    ranges = ranges.split('\n').map(range => range.split('-').map(val => +val));
    ids = ids.split('\n').map(id => +id);

    const result = ids.reduce((acc, id) => {
        const val = checkIfIdInRange(id, ranges) ? 1 : 0;
        return acc + val;
    }, 0);

    console.log("Result:", result);
}

function checkIfIdInRange(id, ranges) {
  return ranges.filter(range =>range[0] <= id && range[1] >= id).length > 0;
}

partOne(input);