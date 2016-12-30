'use strict';

const fs = require('fs');
const _ = require('lodash');

let task = +process.argv[2];
let input = fs.readFileSync('input/day6.txt', 'utf8').split('\n');
let counts = {
	0: {},
	1: {},
	2: {},
	3: {},
	4: {},
	5: {},
	6: {},
	7: {}
};

//create counts for each position
_.forEach(input, (line) => {
	_.forEach(line.split(''), (letter, idx) => {
		if (counts[idx][letter]) {
			counts[idx][letter]++;
		} else {
			counts[idx][letter] = 1;
		}
	});
});

//figure out most/least frequent letter
let password = [];
_.forEach(counts, (letters, position) => {
	let passwordLetter = '';
	if (task !== 2) {
		let highestCount = 0;
		_.forEach(letters, (total, letter) => {
			if (total > highestCount) {
				highestCount = total;
				passwordLetter = letter;
			}
		});
	} else {
		let lowestCount = Number.MAX_VALUE;
		_.forEach(letters, (total, letter) => {
			if (total < lowestCount) {
				lowestCount = total;
				passwordLetter = letter;
			}
		});
	}

	password[position] = passwordLetter;
});

console.log(password.join('')); //dzqckwsd or lragovly