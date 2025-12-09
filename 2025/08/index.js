import { readInput } from '../../utils.js';

// read lines
let inputFilePath = 'input.txt';
// inputFilePath = 'sample-input.txt';

let input = await readInput(inputFilePath);

function partOne() {
  const numberOfCircuits = inputFilePath === 'sample-input.txt' ? 10 : 1000;
  let junctionsArr = input.split('\n').sort((a, b) => +a[0] - +b[0]);
  let distances = [];

  // compile and organize list of closest circuits
  for (let i = 0; i < junctionsArr.length - 1; i++) {
    for (let j = i + 1; j < junctionsArr.length; j++) {
      const point1 = junctionsArr[i].split(',').map(Number);
      const point2 = junctionsArr[j].split(',').map(Number);
      const distance = getDistance(point1, point2);
     
      distances.push({ distance: +distance.toFixed(5), point1: junctionsArr[i], point2: junctionsArr[j] })
    }
  }
  distances = distances.sort((a, b) => a.distance - b.distance);
 
  // make connections
  let circuits = [];
 
  for (let i = 0; i < Math.min(numberOfCircuits, distances.length); i++) {
    const junction = distances[i];
    if (circuits.find(circuit => circuit.includes(junction.point1) || circuit.includes(junction.point2))) {
        const existingIndex = circuits.findIndex(
          circuit => circuit.includes(junction.point1) || circuit.includes(junction.point2)
        );
        const newArrayVal = Array.from(new Set([...circuits[existingIndex], junction.point1, junction.point2]));
        circuits[existingIndex] = newArrayVal;
    } else {
        circuits.push([junction.point1, junction.point2]);
    }
  }
  circuits = mergeArray(circuits.sort((a,b) => b.length - a.length));

  let result = 1;
  for (let i = 0; i < Math.min(3, circuits.length); i++) {
    result *= circuits[i].length;
  }
  console.log("Result:", result);
}
partOne();

function mergeArray(arr) {
  let newArr = arr;
  let hasChanges = true;
  
  while (hasChanges) {
    hasChanges = false;
    for (let i = 0; i < newArr.length; i++) {
      for (let j = i + 1; j < newArr.length; j++) {
        if (newArr[i].some(value => newArr[j].includes(value))) {
          newArr[i] = Array.from(new Set([...newArr[i], ...newArr[j]]));
          newArr.splice(j, 1);
          j--;
          hasChanges = true;
        }
      }
    }
  }
  return newArr.sort((a, b) => b.length - a.length);
}

function getDistance(point1, point2) {
  const xDist = point1[0] - point2[0];
  const yDist = point1[1] - point2[1];
  const zDist = point1[2] - point2[2];
  const distance2d = Math.hypot(xDist, zDist);
  const totalDistance = Math.hypot(yDist, distance2d);
 
  return totalDistance;
}