'use strict';

let fs = require('fs');
let _ = require('lodash');

let input = fs.readFileSync('input/day4.txt', 'utf8');
let rooms = input.split('\n');
let password = 0;

rooms.forEach((room) => {
	//get checksum
	let checksum = room.slice(-7).replace('[', '').replace(']', '');
	room = room.slice(0, -7);

	//get sector id
	let idMatch = room.match(/\d+/);
	let sectorId = idMatch[0];
	room = room.slice(0, idMatch.index);

	//remove - from code
	room = room.replace(/-/g, '');

	//create {letter: count, letter2: count}
	let counts = _.countBy(room);

	//create {count: [letters]}
	let totals = {};
	_.forEach(counts, (count, letter) => {
		totals[count] = totals[count] || [];
		totals[count].push(letter);
	});

	//sort then reverse each letters array
	_.forEach(totals, (letters) => {
		letters = letters.sort().reverse();
	});

	//last 5 entries are the actual checksum
	let actualChecksum = _.flatten(_.values(totals)).slice(-5);

	//check validity
	let isValid = _.every(actualChecksum, (letter) => {
		return _.includes(checksum, letter);
	});

	//increase password by sectorId if valid
	if (isValid) {
		password += +sectorId;
	}
});

console.log('part 1: ', password); //173787