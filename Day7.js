'use strict';

const fs = require('fs');
const _ = require('lodash');

let task = +process.argv[2];

let input = fs.readFileSync('input/day7.txt', 'utf8').split('\n');
let numValid = 0;

_.forEach(input, (sequence) => {
	let letters = sequence.split('');
	let inBrackets = false;
	let foundInBrackets = false;
	let foundValid = false;

	_.forEach(letters, (letter, idx) => {
		if (letter === '[') {
			inBrackets = true;
		} else if (letter === ']') {
			inBrackets = false;
		}
		
		if (task === 2) {
			
		} else {
			if ((letters[idx] === letters[idx + 3]) &&
					(letters[idx + 1] === letters[idx + 2]) && 
					(letters[idx] !== letters[idx + 1])) {
				if (inBrackets) {
					foundInBrackets = true;
				} else {
					foundValid = true;
				}
			}
		}

		
	});

	if (!foundInBrackets && foundValid && task !== 2) {
		numValid ++;
	}
});

console.log(numValid); //part 1: 105