let main = document.querySelector(`main`);

if (main === null || main === `null`)
	main = document.querySelector(`body>script`).parentElement.insertBefore(document.createElement(`main`), document.querySelector(`body>script`));

if (document.querySelector(`main>p`) === null || document.querySelector(`main>p`) === `null`)
	main.appendChild(document.createElement(`p`));

function though(boolean, func) {
	if (typeof boolean !== `boolean`)
		throw new Error(`\'boolean\' must be a boolean statement in though(boolean)`);
	else if (typeof func !== `function`)
		throw new Error(`Body was not correctly defined in though(boolean)`);
	else {
		while (!boolean)
			boolean = func();
	}
}

function doThough(func, boolean) {
	if (typeof func !== `function`)
		throw new Error(`Body was not correctly defined in doThough({},boolean)`);
	else if (typeof boolean !== `boolean`)
		throw new Error(`\'boolean\' must be a boolean statement in doThough({},boolean)`);
	else {
		do {
			boolean = func();
		} while (!boolean);
	}
}

function until(start, end, increment, func) {
	if (typeof start !== `number`)
		throw new Error(`start must be a number in until(start,end,increment)`);
	else if (typeof end !== `number`)
		throw new Error(`end must be a number in until(start,end,increment)`);
	else if (typeof increment !== `number`)
		throw new Error(`increment must be a number in until(start,end,increment)`);
	else if (typeof func !== `function`)
		throw new Error(`Body was not correctly defined in until(start,end,increment)`);
	else {
		while (start != end) {
			func();
			start += increment;
		}
	}
}

function doUntil(func, start, end, increment) {
	if (typeof func !== `function`)
		throw new Error(`Body was not correctly defined in doUntil({}, start,end,increment)`);
	else if (typeof start !== `number`)
		throw new Error(`start must be a number in doUntil({}, start,end,increment)`);
	else if (typeof end !== `number`)
		throw new Error(`end must be a number in doUntil({}, start,end,increment)`);
	else if (typeof increment !== `number`)
		throw new Error(`increment must be a number in doUntil({}, start,end,increment)`);
	else {
		do {
			func();
			if (start != end)
				start += increment;
		} while (start != end);
	}
}

function repeat(number, func) {
	if (typeof number !== `number`)
		throw new Error(`\'number\' must be a number, for repeat(number)`);
	else if (typeof func !== `function`)
		throw new Error(`Body was not correctly defined, for repeat(number)`);
	else {
		for (let i = 1; i <= number; i++)
			func();
	}
}

function showln(anything) {
	let para = main.lastElementChild;
	if (typeof anything === `undefined`) {
		para.innerHTML += `<br>`;
		main.appendChild(para);
	} else {
		if (para.innerHTML.substring(`<br>`) !== -1)
			para.append(`${anything}`);
		else {
			para.textContent = `${anything}`;
		}
	}
	let next = document.createElement(`p`);
	main.appendChild(next);
}

function show(anything) {
	let para = main.lastElementChild;
	if (para.innerHTML.substring(`<br>`) !== -1)
		para.append(`${anything}`);
	else {
		para.textContent = `${anything}`;
	}
}

function showErr(anything) {
	let para = document.createElement(`p`);
	para.style.color = `red`;
	para.append(`${anything}`);
	main.appendChild(para);
}

function print(anything) {
	console.log(`${anything}`);
}

function printErr(anything) {
	console.error(`${anything}`);
}

Element.prototype.css = function(property, value) {
	if (typeof value !== `string` || typeof property !== `string`)
		throw new Error(`Property and Value in Element.css(property, value) must be strings.`);
	else
		this.style[property] = `${value}`;
}

HTMLInputElement.prototype.setVal = function(value) {
	this.value = `${value}`;
}

function getVal(element) {
	if (!(element instanceof HTMLInputElement))
		throw new Error(`Parameter must be an element that can have a value for getVal(Element).`);
	else
		return element.value;
}

function getEl(element, index) {
	if (typeof element !== `string`)
		throw new Error(`First parameter must be an html element as a string, for getEl(Element, index).`);
	else if (typeof index !== `undefined` && typeof index !== `number`)
		throw new Error(`Second parameter must be a number for getEl(Element, index).`);
	else {
		let temp = document.querySelectorAll(element).length;
		if (typeof index === `undefined`) {
			if (temp > 1)
				return document.querySelectorAll(element);
		} else if (index >= temp)
			throw new Error(`Second parameter must be a less than ${temp}, for getEl(Element, index).`);
		else {
			if (temp > 1)
				return document.querySelectorAll(element)[index];
		}
		if (temp === 1)
			return document.querySelector(element);
	}
}

function addEl(element, parent) {
	if (typeof element !== `string`)
		throw new Error(`\'element\' must be an html element as a string, for addEl(element).`);
	else {
		let newElement = document.createElement(element);

		if (!(parent instanceof Element))
			return newElement;
		else {
			parent.appendChild(newElement);
			return newElement;
		}
	}
}

Element.prototype.setText = function(text, html) {
	if (html === undefined)
		html = false;
	if (typeof html !== `boolean`)
		throw new Error(`Second parameter must be a boolean that indicates if there is html or not in the first parameter, for Element.setText(text, html).`);
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
		throw new Error(`Second parameter must be a boolean that indicates if there is html or not in the first parameter, for Element.setText(text, html).`);
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

function getText(element, html) {
	if (html === undefined)
		html = false;
	if (typeof html !== `boolean`)
		throw new Error(`Second parameter must be a boolean that indicates if the output should be html or not, for getText(Element, html).`);
	else if (!(element instanceof Element))
		throw new Error(`First parameter must be an element that can have text, for getText(Element, html).`);
	else {
		if (html) {
			return element.innerHTML;
		} else {
			return element.textContent;
		}
	}
}

Node.prototype.setClass = function(className) {
	if (typeof className !== `string`)
		throw new Error(`\'className\' must be a string for Element.setClass(className).`);
	else
		this.setAttribute(`class`, className);
}

NodeList.prototype.setClass = function(className) {
	if (typeof className !== `string`)
		throw new Error(`\'className\' must be a string for Element.setClass(className).`);
	else
		this.forEach((e) => e.setAttribute(`class`, className));
}

function getClass(element) {
	if (!(element instanceof Node || element instanceof NodeList))
		throw new Error(`\'element\' must be an Element or Element Array for getClass(element).`);
	else if (element instanceof Node)
		return element.className;
	else {
		let classArray = new Array();
		element.forEach((e) => {
			classArray.push(e.className)
		});
		return classArray;
	}
}

Element.prototype.setID = function(idName) {
	if (typeof idName !== `string`)
		throw new Error(`\'idName\' must be a string for Element.setID(idName).`);
	else
		this.id = idName;
}

function getID(element) {
	if (!(element instanceof Element))
		throw new Error(`\'element\' must be an html element, for getID(element).`);
	else
		return element.id;
}

class Label {

	labelFN = null;

	constructor(optionalFunc) {
		if (typeof optionalFunc == `function`)
			this.createLabel(optionalFunc);
		else
			this.labelFN = undefined;
	}

	createLabel(func) {
		if (typeof func !== `function`)
			throw new Error(`Body was not correctly defined in createLabel.`);
		else {
			this.labelFN = func;
			func();
		}
	}
}

function goto(labelInstance) {
	if (!(labelInstance instanceof Label))
		throw new Error(`The goto function must only be used to call Label objects.`);
	else if (typeof labelInstance.labelFN !== `function`)
		throw new Error(`The label object must have a created label before you can use goto(): LabelInstance.createLabel({})`);
	else
		labelInstance.labelFN();
}

function unless(boolean, body, body2) {
	if (typeof boolean !== `boolean`)
		throw new Error(`\'boolean\' must be a boolean statement in unless(boolean)`);
	else if (typeof body !== `function`)
		throw new Error(`Body was not correctly defined in unless(boolean)`);
	else if (body2 === undefined || body2 === `undefined`) {
		if (!boolean)
			body();
	} else {
		if (typeof body2 !== `function`)
			throw new Error(`else body was not correctly defined in unless(boolean,{},[else]{})`);
		else {
			if (!boolean)
				body();
			else
				body2();
		}
	}
}

function dont(anything) {
	let thisWindow = window.open(``, `_self`);
	let imgWindow = window.open(`https://i.imgur.com/eGdI1T5.png`);
	setTimeout(() => {
		thisWindow.close();
		imgWindow.close();
	}, 1000);
}

function doNot(anything) {
	;
}

function delay(number, func) {
	if (typeof number !== `number`)
		throw new Error(`\'number\' must be a number in seconds, for delay(number)`);
	else if (typeof func !== `function`)
		throw new Error(`Body was not correctly defined, for delay(number)`);
	else {
		setTimeout(() => func(), (number * 1000));
	}
}
