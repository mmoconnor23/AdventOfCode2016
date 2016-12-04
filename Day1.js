'use strict';

let walkingPath = 'L2, L3, L3, L4, R1, R2, L3, R3, R3, L1, L3, R2, R3, L3, R4, R3, R3, L1, L4, R4, L2, R5, R1, L5, R1, R3, L5, R2, L2, R2, R1, L1, L3, L3, R4, R5, R4, L1, L189, L2, R2, L5, R5, R45, L3, R4, R77, L1, R1, R194, R2, L5, L3, L2, L1, R5, L3, L3, L5, L5, L5, R2, L1, L2, L3, R2, R5, R4, L2, R3, R5, L2, L2, R3, L3, L2, L1, L3, R5, R4, R3, R2, L1, R2, L5, R4, L5, L4, R4, L2, R5, L3, L2, R4, L1, L2, R2, R3, L2, L5, R1, R1, R3, R4, R1, R2, R4, R5, L3, L5, L3, L3, R5, R4, R1, L3, R1, L3, R3, R3, R3, L1, R3, R4, L5, L3, L1, L5, L4, R4, R1, L4, R3, R3, R5, R4, R3, R3, L1, L2, R1, L4, L4, L3, L4, L3, L5, R2, R4, L2';
walkingPath = walkingPath.split(', ');

let start = [0,0];
let facingDirection = 'north';
let visitedLocations = {
	'0.0': [0,0]
};
let hq = false;

walkingPath.forEach(function(direction) {
	let turn = direction[0];
	let steps = +direction.substr(1);

	if (turn === 'L') {
		switch (facingDirection) {
			case 'north':
				facingDirection = 'west';
				break;
			case 'east':
				facingDirection = 'north';
				break;
			case 'south': 
				facingDirection = 'east';
				break;
			case 'west': 
				facingDirection = 'south';
				break;
		}
	} else { // turn === 'R'
		switch (facingDirection) {
			case 'north':
				facingDirection = 'east';
				break;
			case 'east':
				facingDirection = 'south';
				break;
			case 'south': 
				facingDirection = 'west';
				break;
			case 'west': 
				facingDirection = 'north';
				break;
		}
	}

	switch (facingDirection) {
		case 'north':
			step(0, true, steps);
			break;
		case 'east':
			step(1, true, steps);
			break;
		case 'south': 
			step(0, false, steps);
			break;
		case 'west': 
			step(1, false, steps);
			break;
	}

	function step(coord, isAdd, steps) {
		let counter = 0;
		while (counter < steps) {
			if (isAdd) {
				start[coord] = start[coord] + 1;
			} else {
				start[coord] = start[coord] - 1;
			}

			counter++;
			markLocation();
		}
	}

	//for each step, make a new mark
	function markLocation() {
		let key = start[0].toString()+ '.' + start[1].toString();

		//if we've visited, log the distance from start
		if (!hq && visitedLocations[key]) {
			let twoTime = visitedLocations[key];
			hq = true;
			console.log('revisit: ', Math.abs(twoTime[0]) + Math.abs(twoTime[1]));
		} else {
			visitedLocations[key] = start;
		}
	}
	
});

//log number of steps from start total
console.log('total distance: ', Math.abs(start[0]) + Math.abs(start[1]));
