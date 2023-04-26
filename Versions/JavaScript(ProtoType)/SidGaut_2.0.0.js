let main = document.querySelector(`main`);

if (main === null || main === `null`)
	throw new Error(`HTML Body must have main element`);
else
	main.appendChild(document.createElement(`p`));

function though(x, callback) {
	if (typeof x !== `boolean`)
		throw new Error(`x must be a boolean statement in though(x)`);
	else if (typeof callback !== `function`)
		throw new Error(`Body was not correctly defined in though(x)`);
	else if (typeof callback() !== `boolean`)
		throw new Error(`Body must return a boolean value in though(x)`);
	else {
		while (!x)
			x = callback();
	}
}

function doThough(callback, x) {
	if (typeof callback !== `function`)
		throw new Error(`Body was not correctly defined in doThough({},x)`);
	else if (typeof x !== `boolean`)
		throw new Error(`x must be a boolean statement in doThough({},x)`);
	else {
		do {
			x = callback();
		} while (!x);
	}
}

function until(x, y, inc, callback) {
	if (typeof x !== `number`)
		throw new Error(`x must be a number in until(x,y,inc)`);
	else if (typeof y !== `number`)
		throw new Error(`x must be a number in until(x,y,inc)`);
	else if (typeof inc !== `number`)
		throw new Error(`x must be a number in until(x,y,inc)`);
	else if (typeof callback !== `function`)
		throw new Error(`body was not correctly defined in until(x,y,inc)`);
	else {
		while (x != y) {
			callback();
			x += inc;
		}
	}
}

function doUntil(x, callback, y, inc) {
	if (typeof callback !== `function`)
		throw new Error(`Body was not correctly defined in until(x,y,inc)`);
	else if (typeof x !== `number`)
		throw new Error(`x must be a number in until(x,y,inc)`);
	else if (typeof y !== `number`)
		throw new Error(`x must be a number in until(x,y,inc)`);
	else if (typeof inc !== `number`)
		throw new Error(`x must be a number in until(x,y,inc)`);
	else {
		do {
			callback();
			if (x != y)
				x += inc;
		} while (x != y);
	}
}

function unless(x, callback, callback2) {
	if (typeof x !== `boolean`)
		throw new Error(`x must be a boolean statement in unless(x)`);
	else if (typeof callback !== `function`)
		throw new Error(`Body was not correctly defined in unless(x)`);
	else if (callback2 === undefined || callback2 === `undefined`) {
		if (!x)
			callback();
	} else {
		if (typeof callback2 !== `function`)
			throw new Error(`else body was not correctly defined in unless(x,{},[else]{})`);
		else {
			if (!x)
				callback();
			else
				callback2();
		}
	}
}

function showln(x) {
	if (x === undefined || x === `undefined`) {
		let para = document.createElement(`p`);
		main.appendChild(para);
	} else {
		let para = main.lastElementChild;
		para.append(`${x}`);
		let next = document.createElement(`p`);
		main.appendChild(next);
	}
}

function showErr(x) {
	let para = document.createElement(`p`);
	para.style.color = `red`;
	para.append(`${x}`);
	main.appendChild(para);
}

function show(x) {
	let para = main.lastElementChild;
	para.append(`${x}`);
}

function print(x) {
	console.log(`${x}`);
}

function dont(obj) {
	;
}

function doNot(obj) {
	;
}

Element.prototype.css = function(prop, val) {
	if (typeof val !== `string` || typeof prop !== `string`)
		throw new Error(`Property and Value in Element.css(property, value) must be strings.`)
	else
		this.style[prop] = `${val}`;
}

function getVal(el) {
	if (!(el instanceof HTMLInputElement))
		throw new Error(`Parameter must be an element that can have a value for getVal(element).`)
	else
		return el.value;
}

HTMLInputElement.prototype.setVal = function(val) {
	this.value = `${val}`;
}

class Label {
	constructor() {
		let labelFN = undefined;
	}

	createLabel(fn) {
		if (typeof fn !== `function`)
			throw new Error(`Body was not correctly defined in createLabel.`);
		else {
			this.constructor.labelFN = fn;
			fn();
		}
	}
}

function goto(name) {
	if (!(name instanceof Label))
		throw new Error(`The goto function must only be used to call Label objects.`);
	else if (typeof name.constructor.labelFN !== `function`)
		throw new Error(`The label object must have a created label before you can use goto(): LabelInstance.createLabel({})`);
	else
		name.constructor.labelFN();
}
