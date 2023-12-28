let main = document.querySelector(`main`);
const tableResponse = [
	`Yes`,
	`No`,
	`Maybe`,
	`Kind Of`,
	`Hi`,
	`I Will Destroy Humanity`,
	`I am a Table`,
	`Interesting...`,
	`Error: Stupid Question`,
	`Loading...`,
	`You Got ${Math.floor(Math.random() * 101)}% on Your Test`
]

if (main === null || main === `null`)
	main = document.querySelector(`body>script`).parentElement.insertBefore(document.createElement(`main`), document.querySelector(`body>script`));

if (document.querySelector(`main>p`) === null || document.querySelector(`main>p`) === `null`)
	main.appendChild(document.createElement(`p`));

window.onload = () => {
	let reloading = sessionStorage.getItem("reloading");
	if (reloading) {
		sessionStorage.removeItem("reloading");
		let table = document.createElement(`table`);
		table.innerHTML = `
		 	<thead>
		  <tr>
		    <th>How Many Tables are There?</th>
		    <th>1</th>
		  </tr>
		</thead>
		<tbody>
		  <tr>
		    <td>What is a Table?</td>
		    <td>This</td>
		  </tr>
		  <tr>
		    <td>Why is This a Table?</td>
		    <td>Because</td>
		  </tr>
		  <tr>
		    <td>Ask the Table something:</td>
		    <td>
					<input id="tableInput">
				</td>
		  </tr>
		  <tr>
		    <td>The Table Speaks!</td>
		    <td>
					<div id="tableOutput">
						
					</div>
				</td>
		  </tr>
		</tbody>
	 `;
		table.style.margin = `auto`;
		table.id = `magicTable`;
		table.style.fontSize = `5vmin`;
		table.style.border = `white solid 0.1em`;
		table.style.borderCollapse = `collapse`;
		main.appendChild(table);
		document.querySelectorAll(`table>*, table>*>*, table>*>*>*`).css(`border`, `inherit`);
		document.querySelector(`input#tableInput`).style.fontSize = `inherit`;
		document.querySelector(`input#tableInput`).style.width = `50vmin`;
		document.querySelector(`div#tableOutput`).style.width = `50vmin`;
		document.querySelector(`div#tableOutput`).style.fontWeight = `bold`;
		document.querySelector(`div#tableOutput`).style.overflowWrap = `break-word`;
		document.querySelector(`input#tableInput`).addEventListener(`blur`, () => {
			let rand = tableResponse[Math.floor(Math.random() * tableResponse.length)];
			document.querySelector(`div#tableOutput`).textContent = `${rand}`;
		});
	}
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
	let para = document.querySelectorAll(`main>p`)[document.querySelectorAll(`main>p`).length - 1];
	if (typeof anything === `undefined`) {
		para.innerHTML += `<br>`;
		main.appendChild(para);
	} else {
		if (para.innerHTML.indexOf(`<br>`) === -1)
			para.append(`${anything}`);
		else {
			para.textContent = `${anything}`;
		}
	}
	let next = document.createElement(`p`);
	main.appendChild(next);
}

function show(anything) {
	let para = document.querySelectorAll(`main>p`)[document.querySelectorAll(`main>p`).length - 1];
	if (para.innerHTML.indexOf(`<br>`) === -1)
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

function getChildEl(element, parent) {
	if (typeof element !== `string`)
		throw new Error(`First parameter must be an html element as a string, for getChildEl(Element, parent).`);
	else if (!(parent instanceof Element))
		throw new Error(`Second parameter must be a element for getChildEl(Element, parent).`);
	else {
		let temp = parent.querySelectorAll(element).length;
		if (temp > 1)
			return parent.querySelectorAll(element);
		else
			return parent.querySelector(element);
	}
}

Node.prototype.css = function(property, value) {
	if (typeof property !== `string`)
		throw new Error(`Property in Element.css(property, value) must be a string.`);
	else {
		if (property.includes(`-`))
			property.toLowerCase();

		property = property.replace(/-([a-z])/g, (match, letter) => {
			return letter.toUpperCase();
		});
		this.style[property] = `${ue}`;
	}
}

NodeList.prototype.css = function(property, ue) {
	if (typeof property !== `string`)
		throw new Error(`Property in Element.css(property, ue) must be a string.`);
	else {
		if (property.includes(`-`))
			property.toLowerCase();

		property = property.replace(/-([a-z])/g, (match, letter) => {
			return letter.toUpperCase();
		});
		this.forEach((e) => e.style[property] = `${ue}`);
	}
}

Element.prototype.set = function(ue) {
	this.ue = `${value}`;
}

function getVal(element) {
	if (!(element instanceof Element))
		throw new Error(`Parameter must be an element that can have a value for getVal(Element).`);
	else
		return element.value;
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

Node.prototype.delEl = function() {
	this.remove();
}

NodeList.prototype.delEl = function() {
	this.forEach((e) => e.remove());
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
			this.innerText = ``;
			this.innerText = `${text}`;
		}
	}
}

Element.prototype.appendText = function(text, html) {
	if (html === undefined)
		html = false;
	if (typeof html !== `boolean`)
		throw new Error(`Second parameter must be a boolean that indicates if there is html or not in the first parameter, for Element.appendText(text, html).`);
	else {
		if (html) {
			this.innerHTML += `${text}`;
		} else {
			this.innerText += `${text}`;
		}
	}
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

Node.prototype.addClass = function(className) {
	if (typeof className !== `string`)
		throw new Error(`\'className\' must be a string for Element.addClass(className).`);
	else
		this.classList.add(className);
}

NodeList.prototype.addClass = function(className) {
	if (typeof className !== `string`)
		throw new Error(`\'className\' must be a string for Element.addClass(className).`);
	else
		this.forEach((e) => e.classList.add(className));
}

Node.prototype.delClass = function(className) {
	if (typeof className !== `string`)
		throw new Error(`\'className\' must be a string for Element.delClass(className).`);
	else
		this.classList.remove(className);
}

NodeList.prototype.delClass = function(className) {
	if (typeof className !== `string`)
		throw new Error(`\'className\' must be a string for Element.delClass(className).`);
	else
		this.forEach((e) => e.classList.remove(className));
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

EventTarget.prototype.whenOn = function(listener, func, capture) {
	if (typeof listener !== `string`)
		throw new Error(`\'listener\' must be a string for Element.whenOn(listener, function).`);
	else if (typeof func !== `function`)
		throw new Error(`\'function\' must be a function for Element.whenOn(listener, function).`);
	else {
		if (typeof capture === `undefined`)
			this.addEventListener(listener, func);
		else if (typeof capture !== `boolean`)
			throw new Error(`\'capture\' must be a boolean value for Element.whenOn(listener, function, capture).`);
		else
			this.addEventListener(listener, func, capture);
	}
}

NodeList.prototype.whenOn = function(listener, func, capture) {
	let allValid = true;
	this.forEach((e) => {
		if (!(e instanceof EventTarget))
			allValid = false;
	});

	if (!(allValid))
		throw new Error(`\'Element(s)\' must be a valid set of EventTarget elements, for Element(s).whenOn(listener, function, capture).`);
	else if (typeof listener !== `string`)
		throw new Error(`\'listener\' must be a string for Element.whenOn(listener, function).`);
	else if (typeof func !== `function`)
		throw new Error(`\'function\' must be a function for Element.whenOn(listener, function).`);
	else {
		if (typeof capture === `undefined`)
			this.forEach((e) => e.addEventListener(listener, func));
		else if (typeof capture !== `boolean`)
			throw new Error(`\'capture\' must be a boolean value for Element.whenOn(listener, function, capture).`);
		else
			this.forEach((e) => e.addEventListener(listener, func, capture));
	}
}

EventTarget.prototype.notOn = function(listener, func, capture) {
	if (typeof listener !== `string`)
		throw new Error(`\'listener\' must be a string for Element.notOn(listener, function).`);
	else if (typeof func !== `function`)
		throw new Error(`\'function\' must be a function for Element.notOn(listener, function).`);
	else {
		if (typeof capture === `undefined`)
			this.removeEventListener(listener, func);
		else if (typeof capture !== `boolean`)
			throw new Error(`\'capture\' must be a boolean value for Element.notOn(listener, function, capture).`);
		else
			this.removeEventListener(listener, func, capture);
	}
}

NodeList.prototype.notOn = function(listener, func, capture) {
	let allValid = true;
	this.forEach((e) => {
		if (!(e instanceof EventTarget))
			allValid = false;
	});

	if (!(allValid))
		throw new Error(`\'Element(s)\' must be a valid set of EventTarget elements, for Element(s).notOn(listener, function, capture).`);
	else if (typeof listener !== `string`)
		throw new Error(`\'listener\' must be a string for Element.notOn(listener, function).`);
	else if (typeof func !== `function`)
		throw new Error(`\'function\' must be a function for Element.notOn(listener, function).`);
	else {
		if (typeof capture === `undefined`)
			this.forEach((e) => e.removeEventListener(listener, func));
		else if (typeof capture !== `boolean`)
			throw new Error(`\'capture\' must be a boolean value for Element.notOn(listener, function, capture).`);
		else
			this.forEach((e) => e.removeEventListener(listener, func, capture));
	}
}

Node.prototype.addAttr = function(...attr) {
	let allValid = true;
	attr.forEach((e) => {
		if (typeof e !== `string`)
			allValid = false;
	});

	if (!(allValid))
		throw new Error(`\'attr\' in Elements.addAttr(..attr) must be one or multiple strings.`);
	else {
		for (let i = 0; i < attr.length; i++) {
			let attribute = "";
			let value = "";
			if (attr[i].indexOf(`=`) > -1) {
				attribute = attr[i].substring(0, attr[i].indexOf(`=`));
				value = attr[i].substring((attr[i].indexOf(`=`) + 1));
			} else
				attribute = attr[i];

			this.setAttribute(attribute, value);
		}
	}
}

NodeList.prototype.addAttr = function(...attr) {
	let allValid = true;
	attr.forEach((e) => {
		if (typeof e !== `string`)
			allValid = false;
	});

	if (!(allValid))
		throw new Error(`\'attr\' in Elements.addAttr(..attr) must be one or multiple strings.`);
	else {
		for (let i = 0; i < attr.length; i++) {
			let attribute = "";
			let value = "";
			if (attr[i].indexOf(`=`) > -1) {
				attribute = attr[i].substring(0, attr[i].indexOf(`=`));
				value = attr[i].substring((attr[i].indexOf(`=`) + 1));
			} else
				attribute = attr[i];

			this.forEach((e) => e.setAttribute(attribute, value));
		}
	}
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

function table() {
	sessionStorage.setItem("reloading", "true");
	location.reload();
}

function delay(seconds, func) {
	let del = null;

	if (typeof seconds !== `number`)
		throw new Error(`\'seconds\' must be a number in seconds, for delay(seconds)`);
	else if (typeof func !== `function`)
		throw new Error(`Body was not correctly defined, for delay(seconds)`);
	else
		del = setTimeout(() => func(), (seconds * 1000));

	return del;
}

function removeDelay(delayID) {
	if (typeof delayID !== `number`)
		throw new Error(`\'delayID\' must be a delayID (number) returned by executing delay(), for removeDelay(delayID)`);
	else
		clearTimeout(delayID);
}

function delayRepeat(seconds, func) {
	let delRep = null;

	if (typeof seconds !== `number`)
		throw new Error(`\'seconds\' must be a number in seconds, for delayRepeat(seconds)`);
	else if (typeof func !== `function`)
		throw new Error(`Body was not correctly defined, for delayRepeat(seconds)`);
	else
		delRep = setInterval(() => func(), (seconds * 1000));

	return delRep;
}

function removeDelayRepeat(delayRepID) {
	if (typeof delayRepID !== `number`)
		throw new Error(`\'delayRepID\' must be a delayRepID (number) returned by executing delayRepeat(), for removeDelayRepeat(delayRepID)`);
	else
		clearInterval(delayRepID);
}

function getLoremIpsum(sentenceNum, paragraphNum) {
	if (typeof paragraphNum !== `number` && typeof sentenceNum === `undefined`) {
		paragraphNum = Math.floor(Math.random() * 8) + 1;
		sentenceNum = Math.floor(Math.random() * 8) + 1;
	} else if (typeof paragraphNum !== `number`)
		paragraphNum = 1;
	else
		if (typeof sentenceNum === `undefined`)
			sentenceNum = 1;

	if (typeof sentenceNum !== `number` || (sentenceNum < 1 || sentenceNum > 50))
		throw new Error(`\'sentenceNum\' must be a number more than 1 and less than 51, for geLoremIpsum(sentenceNum, paragraphNum)`);
	else if (paragraphNum < 1 || paragraphNum > 50)
		throw new Error(`\'sentenceNum\' must be a number more than 1 and less than 51, for geLoremIpsum(sentenceNum, paragraphNum)`);
	else {
		let loremIpsum = [
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			"Ced dolor sit amet, consectetur adipiscing elit.",
			"Etiam semper neque nec est pretium, et scelerisque est porttitor.",
			"Maecenas odio justo, euismod et odio id, aliquet aliquet leo.",
			"Nulla id dolor sit amet enim pellentesque lobortis id faucibus sapien.",
			"Aenean id tristique velit.",
			"Ut sit amet augue ac lacus mollis sollicitudin.",
			"Vestibulum at metus a dolor pulvinar fringilla in quis nunc.",
			"Donec ac felis tempor, auctor erat eget, malesuada eros.",
			"Sed pulvinar turpis sit amet interdum porttitor.",
			"Ut nisl orci, vestibulum in augue et, tristique tincidunt ipsum.",
			"Nam nec mauris ut mi fermentum cursus.",
			"Nunc facilisis sapien et massa iaculis, non tempus sapien finibus.",
			"Interdum et malesuada fames ac ante ipsum primis in faucibus.",
			"Integer turpis lorem, lacinia id nisi quis, hendrerit convallis nunc.",
			"In hac habitasse platea dictumst.",
			"Nunc venenatis arcu non consequat scelerisque.",
			"Nulla facilisi.",
			"Nunc mattis eleifend pellentesque.",
			"Phasellus consequat odio quis massa finibus porttitor.",
			"Cras diam ipsum, commodo nec hendrerit a, efficitur eu nulla.",
			"Donec auctor auctor sagittis.",
			"Duis suscipit, justo in lobortis pellentesque, metus dui porttitor eros, vitae tempus velit nibh et nisl.",
			"Quisque pretium, turpis a varius gravida, libero nulla varius diam, non finibus libero nulla eu augue.",
			"Etiam in vestibulum quam, eu viverra justo.",
			"Donec euismod, diam id suscipit bibendum, leo nunc aliquet mauris, ac aliquam metus elit id tellus.",
			"Suspendisse volutpat mauris in tempor ornare.",
			"Morbi scelerisque lobortis ipsum eu venenatis.",
			"Curabitur id faucibus urna.",
			"Proin sed consectetur turpis, eget mattis enim.",
			"Integer lobortis dapibus magna et accumsan.",
			"Curabitur eleifend libero viverra nisl euismod, in fermentum odio pretium.",
			"In non neque egestas, pharetra erat a, pretium tortor.",
			"Nullam nec iaculis justo.",
			"Maecenas vel cursus augue.",
			"Duis dapibus, nisl vel vehicula lacinia, elit metus tempus felis, id ornare tellus neque vitae dolor.",
			"Integer vel sapien ex.",
			"Ut non luctus elit.",
			"Sed eget massa hendrerit, finibus velit quis, ornare velit.",
			"Integer tempor ante nec tincidunt mattis.",
			"Aenean at nisi ante.",
			"Curabitur id lectus eleifend arcu dapibus ultricies ac in nulla.",
			"Sed sagittis a magna vel bibendum.",
			"Suspendisse hendrerit quam turpis, ac vehicula lectus semper nec.",
			"Proin sapien diam, blandit faucibus laoreet a, suscipit a nulla.",
			"Nam vitae suscipit urna."
		];

		let result = "";

		for (let i = 0; i < paragraphNum; i++) {
			result += "<p>";
			for (let j = 0; j < sentenceNum; j++) {
				result += loremIpsum[j];
				result += " ";
			}
			result += "</p>";
		}
		return `${result}`;
	}
}

function darkenTheme(colour) {
	if (typeof colour !== `string`)
		colour = `white`;

	let styleElement = document.createElement('style');
	let css = `
			:root {
					color-scheme: dark !important;
			}
			* {
					background-color: #181818 !important;
					color: ${colour} !important;
					border: ${colour} !important;
			}
			nav, nav *, a, button {
					background-color: #333 !important;
			}
	`;

	if (styleElement.styleSheet)
		styleElement.styleSheet.cssText = css;
	else
		styleElement.appendChild(document.createTextNode(css));

	document.head.appendChild(styleElement);
}
