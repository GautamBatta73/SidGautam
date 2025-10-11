const form = getEl("form");
const sendBtn = getEl("#btnSend");
const userPrompt = getEl("#userPrompt");
const chatBox = getEl("#chatDiv");
const helpBtn = getEl("#btnHelp");
const helpDialog = getEl("#helpDialog");
const helpCloseBtn = getEl("#btnCloseHelp");
const menuBtn = getEl("#btnMenu");
const menuDialog = getEl("#menuDialog");
const menuCloseBtn = getEl("#btnCloseMenu");
const disableDiv = getEl("#disabledDiv");
const aiModel = getEl("#modelSelect");

window.whenOn('load', () => {
	if (localStorage.getItem("chat"))
		chatBox.setText(localStorage.getItem("chat"), true);
	if (localStorage.getItem("model")) {
		aiModel.setVal(localStorage.getItem("model"));
		let currVal = getVal(aiModel);

		document.title = (currVal == "3") ? "SinJautamAI" : "SidGautamAI";
		getEl("header>div>h1").setText((currVal == "3") ? "SinJautamAI" : "SidGautamAI");
		getEl("header>div>img").css("rotate", (currVal == "3") ? "180deg" : "0deg");

		localStorage.setItem("model", getVal(aiModel));
	}

	unless(!(getEl('.delConvo')), () => {
		unless(!(getEl('.delConvo').length > 1), () => {
			getEl('.delConvo').forEach(el => {
				el.whenOn('click', (e) => {
					let convoDiv = e.target.parentElement instanceof HTMLDivElement ? e.target.parentElement : e.target.parentElement.parentElement;
					convoDiv.delEl();
					localStorage.setItem("chat", getText(chatBox, true));
				});
			});
		}, () => {
			getEl('.delConvo').whenOn('click', (e) => {
				let convoDiv = e.target.parentElement instanceof HTMLDivElement ? e.target.parentElement : e.target.parentElement.parentElement;
				convoDiv.delEl();
				localStorage.setItem("chat", getText(chatBox, true));
			});
		});
	});

	aiModel.whenOn('change', () => {
		let oldVal = localStorage.getItem("model");
		let currVal = getVal(aiModel);

		unless((!(oldVal == "3" || currVal == "3")), () => {
			chatBox.setText("", true);
			localStorage.setItem("chat", getText(chatBox, true));
		});

		document.title = (currVal == "3") ? "SinJautamAI" : "SidGautamAI";
		getEl("header>div>h1").setText((currVal == "3") ? "SinJautamAI" : "SidGautamAI");
		getEl("header>div>img").css("rotate", (currVal == "3") ? "180deg" : "0deg");

		localStorage.setItem("model", getVal(aiModel));
	});


	unless(!(getEl('.ai, .user')), () => {
		unless(!(getEl('.ai, .user').length > 1), () => {
			getEl('.ai, .user').forEach(el => {
				el.whenOn('click', (e) => {
					navigator.clipboard.writeText(getText(el));
					let copyDiv = getEl('div#copied');
					let x = e.clientX;
					let y = e.clientY;
					copyDiv.css('left', `${x}px`);
					copyDiv.css('top', `${y}px`);
					copyDiv.css('display', 'block');
					delay(0.5, () => copyDiv.css('display', 'none'));
				});
				el.whenOn('contextmenu', (e) => {
					e.preventDefault();
					clipboardCopy(el);
					let copyDiv = getEl('div#copied');
					let x = e.clientX;
					let y = e.clientY;
					copyDiv.css('left', `${x}px`);
					copyDiv.css('top', `${y}px`);
					copyDiv.css('display', 'block');
					delay(0.5, () => copyDiv.css('display', 'none'));
					return false;
				});
			});
		}, () => {
			getEl(".ai, .user").whenOn('click', (e) => {
				navigator.clipboard.writeText(getText(e.target.closest(".ai, .user")));
				let copyDiv = getEl('div#copied');
				let x = e.clientX;
				let y = e.clientY;
				copyDiv.css('left', `${x}px`);
				copyDiv.css('top', `${y}px`);
				copyDiv.css('display', 'block');
				delay(0.5, () => copyDiv.css('display', 'none'));
			});
			getEl(".ai, .user").whenOn('contextmenu', (e) => {
				e.preventDefault();
				clipboardCopy(e.target.closest(".ai, .user"));
				let copyDiv = getEl('div#copied');
				let x = e.clientX;
				let y = e.clientY;
				copyDiv.css('left', `${x}px`);
				copyDiv.css('top', `${y}px`);
				copyDiv.css('display', 'block');
				delay(0.5, () => copyDiv.css('display', 'none'));
				return false;
			});
		});
	});

	getEl('#btnClearAll').whenOn('click', () => {
		chatBox.setText("", true);
		localStorage.setItem("chat", getText(chatBox, true));
	});

	userPrompt.whenOn('input', () => {
		userPrompt.css("height", "auto");
		userPrompt.css("height", (userPrompt.scrollHeight) + "px");
	}, false);

	menuCloseBtn.whenOn('click', () => {
		menuDialog.close();
	}, false);

	menuBtn.whenOn('click', () => {
		menuDialog.showModal();
	}, false);

	helpCloseBtn.whenOn('click', () => {
		helpDialog.close();
	}, false);

	helpBtn.whenOn('click', () => {
		helpDialog.showModal();
	}, false);
});

form.whenOn(`submit`, (e) => {
	userPrompt.css("height", "auto");
	e.preventDefault();
	let uPrompt = getVal(userPrompt).trim();
	let rModel = getVal(aiModel);

	unless(!(uPrompt.length > 1), () => {
		const count = uPrompt.split(/\s+/).length;

		unless((count > 1500), () => {
			let AIRes = setupConvo(uPrompt);
			disableDiv.css('display', 'flex');
			sendBtn.addAttr("disabled");
			let obj = {
				messages: getMessages(uPrompt),
				model: `${rModel}`,
			};

			let stat = 500;
			let postAI = fetch(`/api`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				mode: "same-origin",
				credentials: "same-origin",
				body: JSON.stringify(obj)
			}).then(response => {
				stat = response.status;
				return response.text();
			}).then(text => {
				unless((stat == 200), () => {
					throw new Error(text);
				});
				sendConvo(AIRes, text);
			}).catch(error => {
				printErr('Error:', error.message);
				AIRes.addClass(`aiError`);
				sendConvo(AIRes, `${stat == 400 ? error.message : "Internal Server Error"}`);
			});
			//print(postAI);
		}, () => alert("Prompt too long. Must be 1500 words or less!"));
	});
	userPrompt.setVal("");
});

userPrompt.whenOn("keydown", (e) => {
	unless(!(e.keyCode == 13 && !e.shiftKey), () => {
		e.preventDefault();
		form.requestSubmit();
	});
});

function setupConvo(prompt) {
	let convoId = getEl('[id^="convo"') ? (getEl('[id^="convo"').length ? `convo${getEl('[id^="convo"').length}` : `convo${1}`) : `convo${0}`;
	let convoDiv = addEl('div', chatBox);
	convoDiv.setID(convoId);

	let userEl = addEl('section', convoDiv);
	let btnDel = addEl('button', convoDiv);
	let aiEl = addEl('section', convoDiv);

	userEl.addClass("user");
	userEl.addAttr("title=Click to Copy");
	addEl('pre', userEl).setText(`${prompt}`);
	userEl.whenOn('click', (e) => {
		navigator.clipboard.writeText(getText(userEl));
		let copyDiv = getEl('div#copied');
		let x = e.clientX;
		let y = e.clientY;
		copyDiv.css('left', `${x}px`);
		copyDiv.css('top', `${y}px`);
		copyDiv.css('display', 'block');
		delay(0.5, () => copyDiv.css('display', 'none'));
	});
	userEl.whenOn('contextmenu', (e) => {
		e.preventDefault();
		clipboardCopy(userEl);
		let copyDiv = getEl('div#copied');
		let x = e.clientX;
		let y = e.clientY;
		copyDiv.css('left', `${x}px`);
		copyDiv.css('top', `${y}px`);
		copyDiv.css('display', 'block');
		delay(0.5, () => copyDiv.css('display', 'none'));
		return false;
	});

	btnDel.addClass("delConvo");
	btnDel.setText(`<img src="./images/delete.png" alt="Delete">`, true);
	btnDel.css('display', 'none');
	btnDel.whenOn('click', () => {
		convoDiv.delEl();
		localStorage.setItem("chat", getText(chatBox, true));
	});

	aiEl.addClass("ai");
	aiEl.css('display', 'none');
	aiEl.addAttr("title=Click to Copy");
	aiEl.whenOn('click', (e) => {
		navigator.clipboard.writeText(getText(aiEl));
		let copyDiv = getEl('div#copied');
		let x = e.clientX;
		let y = e.clientY;
		copyDiv.css('left', `${x}px`);
		copyDiv.css('top', `${y}px`);
		copyDiv.css('display', 'block');
		delay(0.5, () => copyDiv.css('display', 'none'));
	});
	aiEl.whenOn('contextmenu', (e) => {
		e.preventDefault()
		clipboardCopy(aiEl);
		let copyDiv = getEl('div#copied');
		let x = e.clientX;
		let y = e.clientY;
		copyDiv.css('left', `${x}px`);
		copyDiv.css('top', `${y}px`);
		copyDiv.css('display', 'block');
		delay(0.5, () => copyDiv.css('display', 'none'));
		return false;
	});

	userEl.scrollIntoView({
		behavior: "smooth"
	});
	return aiEl;
}

function sendConvo(AIRes, text) {
	let parseText = parseThink(text);

	AIRes.setText(`${parseText.thoughts}`, true);

	AIRes.appendText(`${marked.parse(parseText.cleanedText)}`, true);
	getChildEl('.delConvo', AIRes.parentElement).css('display', 'block');
	AIRes.css('display', 'block');;
	disableDiv.css('display', 'none');
	sendBtn.delAttr('disabled');
	AIRes.scrollIntoView({
		behavior: "smooth"
	});
	localStorage.setItem("chat", getText(chatBox, true));
}

function clipboardCopy(el) {
	const clipboardItem = new ClipboardItem({
		"text/plain": new Blob(
			[getText(el, true)], {
			type: "text/plain"
		}
		),
		"text/html": new Blob(
			[el.outerHTML], {
			type: "text/html"
		}
		),
	});

	navigator.clipboard.write([clipboardItem]);
}

function getMessages(userInput) {
	const convoDivs = getEl('#chatDiv > div');
	let messages = [];
	let convoDivArr = [];

	unless((!(convoDivs instanceof Element)), () => {
		convoDivArr.push(convoDivs);
	}, () => {
		convoDivArr = convoDivs ? Array.from(convoDivs) : 0;
	});

	unless((!(Array.isArray(convoDivArr))), () => {
		convoDivArr = convoDivArr.filter(div => {
			const user = getChildEl("section.user", div);
			const ai = getText(getChildEl("section.ai", div)).trim();
			const aiError = getChildEl("section.aiError", div);

			return user && ai && !aiError;
		});

		const last = convoDivArr.slice(Math.max(convoDivArr.length - 10, 0));

		last.forEach(div => {
			const userEl = getChildEl("section.user", div);
			const aiEl = getChildEl("section.ai", div);

			unless((!(userEl)), () => {
				messages.push({ role: "user", content: `${getText(userEl).trim()}` });
			});
			unless((!(aiEl)), () => {
				messages.push({ role: "assistant", content: `${getText(aiEl).trim()}` });
			});
		});

		messages.push({ role: "user", content: `${userInput}` });
	});

	return messages;
}

function parseThink(text) {
	const thinkMatches = [...text.matchAll(/<think>([\s\S]*?)<\/think>/gi)];
	let thoughts = thinkMatches.map(match => match[1].trim()).join("\n");
	const cleanedText = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

	thoughts = `<think>${thoughts}</think>`;
	return { thoughts, cleanedText };
}

function buildChatJson() {
	const convoDivs = getEl('#chatDiv > div');
	let chatData = [];
	let convoDivArr = [];

	unless((!(convoDivs instanceof Element)), () => {
		convoDivArr.push(convoDivs);
	}, () => {
		convoDivArr = convoDivs ? Array.from(convoDivs) : 0;
	});

	unless((!(Array.isArray(convoDivArr))), () => {
		convoDivArr.forEach(div => {
			const userTxt = getText(getChildEl('.user', div)).trim();
			const aiTxt = getText(getChildEl('.ai', div)).trim();
			const aiError = getChildEl("section.aiError", div);

			unless((!(userTxt && aiTxt && !aiError)), () => {
				chatData.push({ user: userTxt, ai: aiTxt });
			});
		});
	});

	return chatData;
}

function buildChatSgtxt() {
	const chatDupe = chatBox.cloneNode(true);

	getChildEl("div", chatDupe, -1).forEach(el => {
		el.delAttr("id");
		el.addClass("convo");
	});

	return getText(chatDupe, true).trim() || "";
}

function downloadChatJson() {
	try {
		const chat = buildChatJson();
		unless((chat.length !== 0), () => {
			alert("No Chat History To Download!");
		}, () => {
			const blob = new Blob([JSON.stringify(chat, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);

			const a = addEl('a', document.body);
			a.addAttr(`href=${url}`, "download=chat_history.json");
			a.click();
			a.delEl();
			URL.revokeObjectURL(url);
		});
	} catch (err) {
		console.error("Error downloading chat as JSON: ", err);
		alert("Failed To Download Chat History as JSON.\nPlease Try Again Later!");
	}
}

function downloadChatSgtxt() {
	try {
		const chat = buildChatSgtxt();
		unless((chat.length !== 0 || Boolean(chat)), () => {
			alert("No Chat History To Download!");
		}, () => {
			const blob = new Blob([btoa(encodeURIComponent(chat))], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);

			const a = addEl('a', document.body);
			a.addAttr(`href=${url}`, "download=chat_history.sgtxt");
			a.click();
			a.delEl();
			URL.revokeObjectURL(url);
		});
	} catch (err) {
		console.error("Error downloading chat as SGTXT: ", err);
		alert("Failed To Download Chat History as SGTXT.\nPlease Try Again Later!");
	}
}

function _throw(m) { throw new Error(m); }
