import readline from 'readline';
import fs from 'fs';

// read lines
const lines = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity,
});


// loop over inputs
for await (const line of lines) {
    const invalidIds = [];

    const ranges = line.split(',');

    ranges.forEach(range => {
        let [start, end] = range.split('-');
        const startInt = +start;
        const endInt = +end;
        
        if (start[0] == "0") start = start.slice(1);
        if (end[0] == "0") end = end.slice(1);
        
        for (let i = startInt; i <= endInt; i++) {
            const currentLength = String(i).length;
            if (currentLength % 2 === 0) {
                const firstPart = `${i}`.slice(0, currentLength / 2);
                const secondPart = `${i}`.slice(currentLength / 2);
            
                if (firstPart === secondPart) invalidIds.push(i);
            }
        }
    })

    console.log(`Sum of invalid IDs: ${sumInvalidIds(invalidIds)}`);
    
}

function sumInvalidIds(idArray) {
    return idArray.reduce((acc, cur) => acc += cur, 0);
}