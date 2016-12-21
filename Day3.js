'use strict';

let fs = require('fs');

let task = +process.argv[2];

let input = fs.readFileSync('input/day3.txt', 'utf8');
let triangles = input.split('\n');
let validTriangles = 0;
let allInput = [];

function countTriangle(triangle) {
	//sort numerically -> not by unicode!
	triangle = triangle.sort((a, b) => a - b);

	//a + b > c for it to be a triangle 
	if (triangle[0] + triangle[1] > triangle[2]) {
		validTriangles++;
	}
}

triangles.forEach((triangle, idx) => {
	triangle = triangle.trim().split('  '); //two spaces
	
	//split by 2 spaces isn't always correct...
	if (triangle.length > 3) {
		let fixedTriangle = [];
		triangle.forEach((side) => {
			if (+side) {
				fixedTriangle.push(side);
			}
		});
		triangle = fixedTriangle;
	}

	//convert strings to numbers
	let index = 0;
	triangle.forEach((side) => {
		triangle[index++] = +side;
	});

	allInput.push(triangle);

	if (task === 1) {
		countTriangle(triangle);
	}
});

if (task === 2) {
	//turn [[1,2,5], [3,4,8], [6,7,13]]
	//into [[1,3,6], [2,4,7], [5,8,13]]
	let count = 0;
	let numLines = allInput.length;

	for (let i = 0; i < numLines; i += 3) {
		countTriangle([allInput[i][0], allInput[i+1][0], allInput[i+2][0]]);
		countTriangle([allInput[i][1], allInput[i+1][1], allInput[i+2][1]]);
		countTriangle([allInput[i][2], allInput[i+1][2], allInput[i+2][2]]);
	}
}

console.log('valid triangles: ', validTriangles);