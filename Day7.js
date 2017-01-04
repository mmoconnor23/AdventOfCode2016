'use strict';

const fs = require('fs');
const _ = require('lodash');

let task = +process.argv[2];

let input = fs.readFileSync('input/day7.txt', 'utf8').split('\n');
// let input = ['aba[bab]xyz', 'xyx[xyx]xyx', 'aaa[kek]eke', 'zazbz[bzb]cdb'];
let numValid = 0;
let m = 0;

_.forEach(input, (sequence) => {
	let letters = sequence.split('');
	let inBrackets = false;
	let foundInBrackets = false;
	let foundValid = false;

	//part 2
	let triplets = {};
	let enclosedTriplets = [];

	_.forEach(letters, (letter, idx) => {
		if (letter === '[') {
			inBrackets = true;
		} else if (letter === ']') {
			inBrackets = false;
		}
		
		if (task === 2) {
			//if we find a match in brackets, add it's inverse to the array
			//if we find a match outside brackets, add to map
			if ((letters[idx] === letters[idx + 2]) &&
					(letters[idx] !== letters[idx + 1]) && 
					(letters[idx+1] !== '[' && letters[idx+1] !== ']')) {
				if (inBrackets) {
					let newString = letters[idx+1] + letters[idx] + letters[idx+1];
					enclosedTriplets.push(newString);
				} else {
					let curr = letters.slice(idx, idx+3).join('');
					triplets[curr] = true;
				}
			}
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
	} else {
		//check the enclosedTriplets' inverses and see if they're in the map
		_.forEach(enclosedTriplets, (trip) => {
			if (triplets[trip]) {
				foundValid = true;
			}
		});

		if (foundValid) {
			numValid++;
		}
	}
});

console.log(numValid); //part 1: 105, part 2: 258