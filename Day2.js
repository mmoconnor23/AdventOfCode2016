'use strict';

let instructions = ['DLRRRRLRLDRRRURRURULRLLULUURRRDDLDULDULLUUDLURLURLLDLUUUDUUUULDRDUUDUDDRRLRDDDUDLDLLRUURDRULUULRLRDULULLRLRLRLDRLUULDLDDDDRRLRUUUDDRURRULLLRURLUURULLRLUDDLDRUULDRURULRRRLLLRDLULDRRDDUDLURURLDULDRDRLDDUURRDUDDRDUURDULDUURDUDRDRULDUDUULRRULUUURDUURUDLDURDLRLURUUDRRDLRUDRULRURLDLLDLLRRDRDRLRRRULDRRLDUURLUUDLUUDDLLRULRDUUDURURLUURDRRRUDLRDULRRRLDRDULRUUDDDLRDUULDRLLDRULUULULRDRUUUULULLRLLLRUURUULRRLDDDRULRRRUDURUR','RULRUUUDLLUDURDRDDLLRLLUDRUDDRLRRDLDLDRDULDLULURDLUDDDUULURLDRUUURURLLRRDDDUUDRLRLLDLDRDDDRDUDLRDRDLLLDDLDUDDRUDUUDLLLLLDULRLURRRLLURUUULUDRLRLRLURRDRLLLRLLULRLLLDDLRLRDLUUUUUDULULDDULLUDUURDLRUDLRUDLRLLRLDLULRLDUDRURURDLRULDLULULDLLDLDLDLLLUDUDDLRLRRDULLUDRDDLLLDUURDULUDURLLLDRUDDDLRLULDLDRRDDDRDULDDUDRDDULLULRRLRUULRDUDURUDULUDUDURLDRDUUDDRRLRURDRRLRDDDDRUDLUDLDDLRDLUUDLRRURDDLURDLRDLLRDRDLDLDUUUURULUULDDDDLDULUURRRULUDLLLDRULDRURL','RRRLRDLLDUURDRRRLURDUULUDURDRRUUDURURRLDLLDRDLRRURDDUDDURLRUUDDULULRUUDRLUUDDLLDDDLRRRDLLLLLLRRURDULDLURRURRDDLDDDUDURRDURRRLUDRRULLRULDRLULRULDDRLLRDLRDUURULURLUURLRRULDULULUULDUDLRLDRDDRRRUUULULDUURLRLLURRLURDUUDDDRUULDLLLDRUURLRRLLDDUDRDLDDDULDRDDDUDRRLLLULURDUDLLUUURRLDULURURDDLUDLLRLDRULULURDLDRLURDLRRDRRUULLULDLURRDDUDRDDDLDUDLDRRUDRULDLDULRLLRRRRDDRLUURRRRDDLLRUURRLRURULDDULRLULRURRUULDUUDURDRRLRLUDRULDRUULUUDRDURDURRLULDDDULDDLRDURRUUUUUDDRRDLRDULUUDDL','DRRLLRRLULDDULRDDLRLDRURDDUDULURRDLUUULURRRLLRLULURLLRLLDLLUDDLLRDRURRDLDDURRURDRDDUDDDLLRLDLDLDDDDRRRRUDUDLRDUDDURLLRURRDUDLRLLUDDRLDUUDDLLLUDRRRLLDDULUDDRLLUDDULLDDLRLDLRURRLUDDLULULDLUURDLLUDUDRRRRDULUDLRRLRUDDUUDRRLLRUUDRRLDDLRRRUDRRDRRDDUDLULLURRUURLLLDRDDLUDDDUDDRURURDLRUULLRDRUUDRDUDRLULLDURUUULDDLDRDRUDRUDUULDDRLRDRRDRRRRLRLRUULDDUUDDLLLLRRRDUDLRDLDUDDUURLUDURLDRRRDRUDUDRLDLRLDRDDLUDRURLRDRDLDUDDDLRLULLUULURLDDDULDUDDDLDRLDLURULLUDLLDRULDLLLDUL','LDULURUULLUDLDDRLLDURRULRLURLLURLRRLRDLDDRUURULLRUURUURRUDDDLRRLDDLULDURLLRDURDLLLURLDRULLURLRLDRDRULURDULDLLDUULLLDUDULDURLUDRULRUUUUUUDUUDDDLLURDLDLRLRDLULRDRULUUDRLULLURLRLDURDRRDUDDDURLLUUDRRURUDLDUDRLRLDRLLLLDLLLURRUDDURLDDRULLRRRRDUULDLUDLDRDUUURLDLLLDLRLRRLDDULLRURRRULDLURLURRRRULUURLLUULRURDURURLRRDULLDULLUDURDUDRLUULULDRRDLLDRDRRULLLDDDRDUDLRDLRDDURRLDUDLLRUDRRRUDRURURRRRDRDDRULRRLLDDRRRLDLULRLRRRUDUDULRDLUDRULRRRRLUULRULRLLRLLURDLUURDULRLDLRLURDUURUULUUDRLLUDRULULULLLLRLDLLLDDDLUULUDLLLDDULRDRULURDLLRRDRLUDRD'];

let position = [1,1];
let buttons = {
	0: {
		0: 1,
		1: 2, 
		2: 3
	},
	1: {
		0: 4,
		1: 5,
		2: 6
	},
	2: {
		0: 7, 
		1: 8, 
		2: 9
	}
};
let code = '';

instructions.forEach(function(instruction) {
	let steps = instruction.split('');

	steps.forEach(function(step) {
		switch (step) {
			case 'D':
				if (position[0] < 2) {
					position[0] = position[0] + 1;
				}
				break;
			case 'L': 
				if (position[1] > 0) {
					position[1] = position[1] - 1;
				}
				break;
			case 'R': 
				if (position[1] < 2) {
					position[1] = position[1] + 1;
				}
				break;
			case 'U':
				if (position[0] > 0) {
					position[0] = position[0] - 1;
				}
				break;
		}
	});

	code += buttons[position[0]][position[1]];
});

console.log('First Code: ', code);

//PART 2
let keypad = [
	[0,0,1,0,0],
	[0,2,3,4,0],
	[5,6,7,8,9],
	[0,'A','B','C',0], 
	[0,0,'D',0,0]
];

let code2 = '';
let x = 0;
let y = 2;

instructions.forEach(function(instruction) {
	let steps = instruction.split('');
	let i = 0;
	steps.forEach(function(step) {
		switch (step) {
			case 'D':
				if (y < 4 && keypad[x][y + 1] !== 0) {
					y += 1;
				}
				break;
			case 'L': 
				if (x > 0 && keypad[x-1][y] !== 0) {
					x -= 1;
				}
				break;
			case 'R': 
				if (x < 4 && keypad[x+1][y] !== 0) {
					x += 1;
				}
				break;
			case 'U':
				if (y > 0 && keypad[x][y - 1] !== 0) {
					y -= 1;
				}
				break;
		}
	});

	code2 += keypad[y][x].toString();
});

console.log('Second Code: ', code2);