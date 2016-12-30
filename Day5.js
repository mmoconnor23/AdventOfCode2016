'use strict';

const md5 = require('md5');
const _ = require('lodash');
const doorId = 'cxdnnyjw';

let task = +process.argv[2];

let password = [];
let index = 0;

while (_.compact(password).length < 8) {
	let curr = md5(doorId + index++);

	if (curr.startsWith('00000')) {
		if (task !== 2) {
			password.push(curr.substr(5,1));
		} else {
			let solutionIndex = +curr.substr(5,1);
			if (solutionIndex < 8 && !password[solutionIndex]) {
				password[solutionIndex] = curr.substr(6,1);
			}
		}
	}
}

console.log('password: ', password.join(''));
