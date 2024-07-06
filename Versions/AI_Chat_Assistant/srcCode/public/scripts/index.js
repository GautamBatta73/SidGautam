const form = getEl("form");
const sendBtn = getEl("#btnSend");
const userPrompt = getEl("#userPrompt");
const chatBox = getEl("#chatDiv");
const helpBtn = getEl("#btnHelp");
const helpDialog = getEl("dialog");
const closeBtn = getEl("#btnCloseHelp");

window.whenOn('load', () => {
	if (localStorage.getItem("chat"))
		chatBox.setText(localStorage.getItem("chat"), true);

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
  
  getEl(".ai, .user").whenOn('click', (e) => {
    navigator.clipboard.writeText(getText(e.target));
    let copyDiv = getEl('div#copied');
    let x = e.clientX;
    let y = e.clientY;
    copyDiv.style.left = `${x}px`;
    copyDiv.style.top = `${y}px`;
    copyDiv.style.display = 'block';
    setTimeout(() => copyDiv.style.display = 'none', 500);
  });

	getEl('#btnClearAll').whenOn('click', () => {
		chatBox.setText("", true);
		localStorage.setItem("chat", getText(chatBox, true));
	});

	userPrompt.whenOn('input', () => {
		userPrompt.css("height", "auto");
		userPrompt.css("height", (userPrompt.scrollHeight) + "px");
	}, false);

	closeBtn.whenOn('click', () => {
		helpDialog.close();
	}, false);

	helpBtn.whenOn('click', () => {
		helpDialog.showModal();
	}, false);
});

form.whenOn(`submit`, (e) => {
	e.preventDefault();
	let uPrompt = getVal(userPrompt).trim();
	let obj = {
		prompt: `${uPrompt}`
	};
	let AIRes = setupConvo(uPrompt);

	unless(!(uPrompt.length > 1), () => {
		getEl(':root').css('cursor', 'wait');
		sendBtn.disabled = true;
		let postAI = fetch(`/api`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			mode: "same-origin",
			credentials: "same-origin",
			body: JSON.stringify(obj)
		}).then(response => {
			print('Response object: ', response);
			return response.text();
		}).then(text => {
			print('text object: ', text);
			sendConvo(AIRes, text);
		}).catch(error => {
			printErr('Error:', error);
			AIRes.addClass(`aiError`);
			sendConvo(AIRes, "Internal Server Error.")
		});
		print(postAI);
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

	let userEl = addEl('p', convoDiv);
	let btnDel = addEl('button', convoDiv);
	let aiEl = addEl('p', convoDiv);

	userEl.addClass("user");
  userEl.title = "Click to Copy";
	userEl.setText(`${prompt}`);
  userEl.whenOn('click', (e) => {
    navigator.clipboard.writeText(getText(e.target));
    let copyDiv = getEl('div#copied');
    let x = e.clientX;
    let y = e.clientY;
    copyDiv.style.left = `${x}px`;
    copyDiv.style.top = `${y}px`;
    copyDiv.style.display = 'block';
    setTimeout(() => copyDiv.style.display = 'none', 500);
  });

	btnDel.addClass("delConvo");
	btnDel.setText(`<img src="https://cdn.glitch.global/d8a2d8d1-6959-4a91-badd-90859a83dc87/delete.png?v=1705944823062" alt="Delete">`, true);
	btnDel.css('display', 'none');
	btnDel.whenOn('click', () => {
		convoDiv.delEl();
		localStorage.setItem("chat", getText(chatBox, true));
	});

	aiEl.addClass("ai");
	aiEl.css('display', 'none');
  aiEl.title = "Click to Copy";
  aiEl.whenOn('click', (e) => {
    navigator.clipboard.writeText(getText(e.target));
    let copyDiv = getEl('div#copied');
    let x = e.clientX;
    let y = e.clientY;
    copyDiv.style.left = `${x}px`;
    copyDiv.style.top = `${y}px`;
    copyDiv.style.display = 'block';
    setTimeout(() => copyDiv.style.display = 'none', 500);
  });
  
	userEl.scrollIntoView({
		behavior: "smooth"
	});
	return aiEl;
}

function sendConvo(AIRes, text) {
	AIRes.setText(`${text}`);
	getChildEl('.delConvo', AIRes.parentElement).css('display', 'block');
	AIRes.css('display', 'block');;
	getEl(':root').css('cursor', 'initial');
	sendBtn.disabled = false;
	AIRes.scrollIntoView({
		behavior: "smooth"
	});
	localStorage.setItem("chat", getText(chatBox, true));
}
