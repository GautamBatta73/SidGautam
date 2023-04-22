function though(x, callback) {
	while (!x)
		callback();
}

function doThough(callback, x) {
	do {
		callback();
	} while (!x);
}

function until(x, y, inc, callback) {
	while (x != y) {
		callback();
		x += inc;
	}
}

function doUntil(x, callback, y, inc) {
	do {
		callback();
		if (x != y)
			x += inc;
	} while (x != y);
}

function unless(x, callback) {
	if (!x)
		callback();
}

function unlessOr(x, callback, y, callback2) {
	if (!x)
		callback();
	else if (!y)
		callback2();
}

function unlessFinal(x, callback, callback2) {
	if (!x)
		callback();
	else
		callback2();
}

function show(x) {
	let para = document.createElement(`p`);
	para.append(`${x}`);
	document.querySelector(`div`).appendChild(para);
}

function showln() {
	let brEl = document.createElement(`br`);
	document.querySelector(`div`).appendChild(brEl);
}

function dont(obj) {
	;
}
function doNot(obj) {
	;
}
function dont() {
	;
}
function doNot() {
	;
}
