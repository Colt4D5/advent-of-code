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

function partTwo() {
    let [ranges, ids] = input.split('\n\n');
    ranges = ranges.split('\n').map(range => range.split('-').map(val => +val));
    ids = ids.split('\n').map(id => +id);
    
    const sortedRanges = ranges.sort((a, b) => a[0] - b[0]);

    let currentMerges = 0;

    do {
        currentMerges = 0;
        
        for (let i = 1; i < sortedRanges.length; i++) {
            const [prevStart, prevEnd] = sortedRanges[i - 1 - currentMerges];
            const [currStart, currEnd] = sortedRanges[i - currentMerges];
            
            if (currStart <= prevEnd) {

                sortedRanges[i - 1 - currentMerges][1] = Math.max(prevEnd, currEnd);

                sortedRanges.splice(i - currentMerges, 1);
                currentMerges++;
                i--;
            }
        }
    } while (currentMerges > 0);

    // count numbers in ranges
    let totalCount = 0;
    for (const [start, end] of sortedRanges) {
        totalCount += (end - start + 1);
    }

    console.log("Total Count:", totalCount);
}

// partOne(input);
partTwo(input);