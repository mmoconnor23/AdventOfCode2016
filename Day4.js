'use strict';

let fs = require('fs');
let _ = require('lodash');

let task = +process.argv[2];

let input = fs.readFileSync('input/day4.txt', 'utf8');
let rooms = input.split('\n');
let shiftCypher = { 
	a: 0,
	b: 1, 
	c: 2, 
	d: 3, 
	e: 4, 
	f: 5,
	g: 6,
	h: 7,
	i: 8,
	j: 9,
	k: 10,
	l: 11,
	m: 12, 
	n: 13,
	o: 14,
	p: 15,
	q: 16,
	r: 17,
	s: 18,
	t: 19, 
	u: 20, 
	v: 21,
	w: 22,
	x: 23,
	y: 24, 
	z: 25
};
let invert = _.invert(shiftCypher);

let password = 0;

function shiftCode(room, sectorId) {
	let newRoom = [];
	
	_.forEach(room, (letter, idx) => {
		let letterCode = shiftCypher[letter];
		let newLetterNum = (letterCode + sectorId) % 26;
		newRoom.push(invert[newLetterNum]);
	});

	let codeWord = newRoom.join('');
	if (_.includes(codeWord, 'north')) {
		console.log('secret room, part 2: ', sectorId);
	}
	return newRoom.join('');
}

rooms.forEach((room) => {
	//get checksum
	let checksum = room.slice(-7).replace('[', '').replace(']', '');
	room = room.slice(0, -7);

	//get sector id
	let idMatch = room.match(/\d+/);
	let sectorId = +idMatch[0];
	room = room.slice(0, idMatch.index);

	//remove - from code
	room = room.replace(/-/g, '');

	if (task === 2) {
		room = shiftCode(room, sectorId);
	}

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
		password += sectorId;
	}
});

console.log('part 1: ', password); //173787