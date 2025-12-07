import { readInput } from '../../utils.js';

// read lines
let inputFilePath = 'input.txt';
inputFilePath = 'sample-input.txt';

let input = await readInput(inputFilePath);

function partOne() {
    const matrix = input.split('\n').map(row => row.split(''));
    // find start position
    const startingPosition = findStartPosition(matrix, 'S');

    let splits = 0;

    // create laser
    class Laser {
        constructor(grid, startPos) {
            this.grid = grid;
            this.position = startPos;
            this.isBlocked = false;
        }
        update() {

        }
    }

    const lasersArr = [new Laser(matrix, startingPosition)];

    // while next laser position is valid continue
    let movingLasersCount = 0;

    do {
        movingLasersCount = 0;

        for (const [i, laser] of lasersArr.entries()) {
            if (laser.isBlocked || laser.position[0] + 1 >= matrix.length) {
                laser.isBlocked = true;
                continue;
            }
            const nextLaserPosition = matrix[laser.position[0] + 1][laser.position[1]];

            if (nextLaserPosition !== '|' && nextLaserPosition !== undefined) {
                if (nextLaserPosition === '.') {
                    laser.position = [laser.position[0] + 1, laser.position[1]];
                    matrix[laser.position[0]][laser.position[1]] = '|';
                } else if (nextLaserPosition === '^') {
                    laser.isBlocked = true;
                    spawnNewLasers(matrix, laser.position, lasersArr);
                } else {
                    laser.isBlocked = true;
                }
                movingLasersCount++;
            } else {
                laser.isBlocked = true;
            }
        }
    } while (movingLasersCount > 0);

    drawCurrentMatrix(matrix);
    console.log('Splits:', splits);

    function spawnNewLasers(matrix, position, lasersArr) {
        const leftLaserPos = [position[0], position[1] - 1];
        const rightLaserPos = [position[0], position[1] + 1];
        lasersArr.push(new Laser(matrix, leftLaserPos));
        lasersArr.push(new Laser(matrix, rightLaserPos));
        splits++;
    }
    
    function findStartPosition(grid, startChar) {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                if (grid[row][col] === startChar) {
                    return [row, col];
                }
            }
        }
    }

    function drawCurrentMatrix(matrix) {
        console.clear();
        console.log(matrix.map(row => row.join('')).join('\n'));
    }
}

partOne();