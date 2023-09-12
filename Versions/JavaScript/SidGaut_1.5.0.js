let main = document.querySelector(`main`);
if (main === null || main === `null`)
	throw new Error(`HTML Body must have main element`);
else
	main.appendChild(document.createElement(`p`));

class SidGautam {
	goto(fn) {
		if (typeof fn !== `function`)
			throw new Error(`The goto function was not correctly defined`);
		else
			fn();
	}

	though(x, callback) {
		if (typeof x !== `boolean`)
			throw new Error(`x must be a boolean statement in though(x)`);
		else if (typeof callback !== `function`)
			throw new Error(`body was not correctly defined in though(x)`);
		else {
			while (!x)
				callback();
		}
	}

	doThough(callback, x) {
		if (typeof callback !== `function`)
			throw new Error(`body was not correctly defined in doThough({},x)`);
		else if (typeof x !== `boolean`)
			throw new Error(`x must be a boolean statement in doThough({},x)`);
		else {
			do {
				callback();
			} while (!x);
		}
	}

	until(x, y, inc, callback) {
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

	doUntil(x, callback, y, inc) {
		if (typeof callback !== `function`)
			throw new Error(`body was not correctly defined in until(x,y,inc)`);
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

	unless(x, callback, callback2) {
		if (typeof x !== `boolean`)
			throw new Error(`x must be a boolean statement in unless(x)`);
		else if (typeof callback !== `function`)
			throw new Error(`body was not correctly defined in unless(x)`);
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

	showln(x) {
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

	showErr(x) {
		let para = document.createElement(`p`);
		para.style.color = `red`;
		para.append(`${x}`);
		main.appendChild(para);
	}

	show(x) {
		let para = main.lastElementChild;
		para.append(`${x}`);
	}

	print(x) {
		console.log(`${x}`);
	}

	dont(obj) {
		;
	}
  
	doNot(obj) {
		;
	}
  
}
