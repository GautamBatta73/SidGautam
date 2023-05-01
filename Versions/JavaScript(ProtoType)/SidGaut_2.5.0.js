let main = document.querySelector(`main`);

if (main === null || main === `null`)
	main = document.querySelector(`body>script`).parentElement.insertBefore(document.createElement(`main`), document.querySelector(`body>script`));

main.appendChild(document.createElement(`p`));

function though(x, callback) {
	if (typeof x !== `boolean`)
		throw new Error(`x must be a boolean statement in though(x)`);
	else if (typeof callback !== `function`)
		throw new Error(`Body was not correctly defined in though(x)`);
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

function repeat(x, callback) {
	if (typeof x !== `number`)
		throw new Error(`x must be a number, for repeat(x)`);
	else if (typeof callback !== `function`)
		throw new Error(`Body was not correctly defined, for repeat(x)`);
	else {
		for (let i = 1; i <= x; i++)
			callback();
	}
}

function showln(x) {
	let para = main.lastElementChild;
	if (typeof x === `undefined`) {
		para.innerHTML += `<br>`;
		main.appendChild(para);
	} else {
		if (para.innerHTML.substring(`<br>`) !== -1)
			para.append(`${x}`);
		else {
			para.textContent = `${x}`;
		}
	}
	let next = document.createElement(`p`);
	main.appendChild(next);
}

function show(x) {
	let para = main.lastElementChild;
	if (para.innerHTML.substring(`<br>`) !== -1)
		para.append(`${x}`);
	else {
		para.textContent = `${x}`;
	}
}

function showErr(x) {
	let para = document.createElement(`p`);
	para.style.color = `red`;
	para.append(`${x}`);
	main.appendChild(para);
}

function print(x) {
	console.log(`${x}`);
}

function printErr(x) {
	console.error(`${x}`);
}

Element.prototype.css = function(prop, val) {
	if (typeof val !== `string` || typeof prop !== `string`)
		throw new Error(`Property and Value in Element.css(property, value) must be strings.`);
	else
		this.style[prop] = `${val}`;
}

HTMLInputElement.prototype.setVal = function(val) {
	this.value = `${val}`;
}

function getVal(el) {
	if (!(el instanceof HTMLInputElement))
		throw new Error(`Parameter must be an element that can have a value for getVal(Element).`);
	else
		return el.value;
}

function getEl(el, index) {
	if (typeof el !== `string`)
		throw new Error(`First parameter must be an html element as a string, for getEl(Element, index).`);
	else if (typeof index !== `undefined` && typeof index !== `number`)
		throw new Error(`Second parameter must be a number for getEl(Element, index).`);
	else {
		let temp = document.querySelectorAll(el).length;
		if (typeof index === `undefined`) {
			if (temp > 1)
				return document.querySelectorAll(el);
		} else if (index >= temp)
			throw new Error(`Second parameter must be a less than ${temp}, for getEl(Element, index).`);
		else {
			if (temp > 1)
				return document.querySelectorAll(el)[index];
		}
		if (temp === 1)
			return document.querySelector(el);
	}
}

function createEl(el, parent) {
	if (typeof el !== `string`)
		throw new Error(`Parameter must be an html element as a string for createEl(Element).`);
	else {
		let element = document.createElement(el);

		if (!(parent instanceof Element))
			return element;
		else {
			parent.appendChild(element);
			return element;
		}
	}
}

Element.prototype.setText = function(text, html) {
	if (html === undefined)
		html = false;
	if (typeof html !== `boolean`)
		throw new Error(`Second parameter must be a boolean that indicates if there is html or not in the first parameter, for Element.setText(text, html?).`);
	else {
		if (html) {
			this.innerHTML = ``;
			this.innerHTML = `${text}`;
		} else {
			this.textContent = ``;
			let textNode = document.createTextNode(`${text}`);
			this.appendChild(textNode);
		}
	}
}

Element.prototype.appendText = function(text, html) {
	if (html === undefined)
		html = false;
	if (typeof html !== `boolean`)
		throw new Error(`Second parameter must be a boolean that indicates if there is html or not in the first parameter, for Element.setText(text, html?).`);
	else {
		if (html) {
			this.innerHTML += `${text}`;
		} else {
			let textNode = document.createTextNode(`${text}`);
			this.appendChild(textNode);
		}
	}
}

Node.prototype.delEl = function() {
	this.remove();
}

NodeList.prototype.delEl = function() {
	this.forEach((e) => e.remove());
}

function getText(el, html) {
	if (html === undefined)
		html = false;
	if (typeof html !== `boolean`)
		throw new Error(`Second parameter must be a boolean that indicates if the output should be html or not, for getText(Element, html?).`);
	else if (!(el instanceof Element))
		throw new Error(`First parameter must be an element that can have text, for getText(Element, html?).`);
	else {
		if (html) {
			return el.innerHTML;
		} else {
			return el.textContent;
		}
	}
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

function dont(obj) {
	let thisWindow = window.open(``, `_self`);
	let imgWindow = window.open(`https://i.imgur.com/eGdI1T5.png`);
	setTimeout(() => {
		thisWindow.close();
		imgWindow.close();
	}, 1000)
}

function doNot(obj) {
	;
}

function delay(x, callback) {
	if (typeof x !== `number`)
		throw new Error(`x must be a number in seconds, for delay(x)`);
	else if (typeof callback !== `function`)
		throw new Error(`Body was not correctly defined, for delay(x)`);
	else {
		setTimeout(() => callback(), (x * 1000));
	}
}




