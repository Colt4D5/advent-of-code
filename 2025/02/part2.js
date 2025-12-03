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
        
        // normalize the inputs by removing leading zeros
        if (start[0] == "0") start = start.slice(1);
        if (end[0] == "0") end = end.slice(1);
        
        for (let i = startInt; i <= endInt; i++) {
            const halfIndex = Math.floor(`${i}`.length / 2);
            let isInvalid = false;

            for (let j = halfIndex; j >= 1; j--) {
                const sectionToTest = `${i}`.slice(0, j);
                const repetitions = `${i}`.length / sectionToTest.length;

                const repeatedSection = sectionToTest.repeat(repetitions);

                if (repeatedSection === `${i}`) {
                    isInvalid = true;
                    break;
                }
            }
            if (isInvalid) invalidIds.push(i);
        }
    })

    console.log(`Sum of invalid IDs: ${sumInvalidIds(invalidIds)}`);
    
}

function sumInvalidIds(idArray) {
    return idArray.reduce((acc, cur) => acc += cur, 0);
}