import { readInput } from '../../utils.js';

// read lines
let inputFilePath = 'input.txt';
// inputFilePath = 'sample-input.txt';

let input = await readInput(inputFilePath);

function partOne() {
  const coords = input.split('\n').map(coord => coord.split(',').map(Number));
 
  let largestSquare = 0;
 
  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const area = calculateArea(coords[i], coords[j]);
      largestSquare = Math.max(area, largestSquare);
    }
  }
 
  console.log("Largest Area:", largestSquare);
}
partOne();

function calculateArea(coord1, coord2) {
  const width = Math.abs(coord1[0] - coord2[0]) + 1;
  const height = Math.abs(coord1[1] - coord2[1]) + 1;
  return width * height;
}