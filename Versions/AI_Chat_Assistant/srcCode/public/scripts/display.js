const chatBox = getEl("#chatDiv");
const menuBtn = getEl("#btnMenu");
const menuDialog = getEl("#menuDialog");
const menuCloseBtn = getEl("#btnCloseMenu");

window.whenOn('load', () => {
	if (localStorage.getItem("importedChat"))
		chatBox.setText(localStorage.getItem("importedChat"), true);

	unless(!(getEl('.delConvo')), () => {
		unless(!(getEl('.delConvo').length > 1), () => {
			getEl('.delConvo').forEach(el => {
				el.whenOn('click', (e) => {
					let convoDiv = e.target.parentElement instanceof HTMLDivElement ? e.target.parentElement : e.target.parentElement.parentElement;
					convoDiv.delEl();
					localStorage.setItem("importedChat", getText(chatBox, true));
				});
			});
		}, () => {
			getEl('.delConvo').whenOn('click', (e) => {
				let convoDiv = e.target.parentElement instanceof HTMLDivElement ? e.target.parentElement : e.target.parentElement.parentElement;
				convoDiv.delEl();
				localStorage.setItem("importedChat", getText(chatBox, true));
			});
		});
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
		localStorage.setItem("importedChat", getText(chatBox, true));
	});

	menuCloseBtn.whenOn('click', () => {
		menuDialog.close();
	}, false);

	menuBtn.whenOn('click', () => {
		menuDialog.showModal();
	}, false);
});

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

function uploadChat() {
	const fileInput = getEl('#uploadInput');
	const fileErr = getEl('#uploadErrors');
	const file = fileInput.files[0];
	let fileName = file ? file.name.toLowerCase() : '';

	unless((Boolean(file)), () => {
		fileErr.setText('Select a File');
		return;
	}, () => {
		unless((fileName.endsWith(".json") || fileName.endsWith(".sgtxt")), () => {
			fileErr.setText('Select a Valid File');
			return;
		});
	});

	unless((!(fileName.endsWith(".json"))), () => {
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const chatHistory = JSON.parse(e.target.result);

				unless((Array.isArray(chatHistory)), () => {
					throw new Error("Invalid Chat Format")
				});

				chatHistory.forEach(pair => {
					const convoDiv = addEl('div', chatBox);
					convoDiv.addClass(`convo`);

					const userSection = addEl('section', convoDiv);
					userSection.addClass('user');
					userSection.addAttr("title=Click to Copy");
					userSection.setText(pair.user || "[Missing User]");

					const btnDel = addEl('button', convoDiv);
					btnDel.addClass("delConvo");
					btnDel.setText(`<img src="./images/delete.png" alt="Delete" loading="lazy">`, true);
					btnDel.css('display', 'block');
					btnDel.whenOn('click', () => {
						convoDiv.delEl();
						localStorage.setItem("importedChat", getText(chatBox, true));
					});

					const aiSection = addEl('section', convoDiv);
					aiSection.addClass('ai');
					aiSection.addAttr("title=Click to Copy");
					aiSection.setText(pair.ai || "[Missing AI]");
				});

				localStorage.setItem("importedChat", getText(chatBox, true));
				location.reload();
			} catch (err) {
				console.error("Failed to parse chat: ", err);
				fileErr.setText('Invalid Chat Format');
			}
		};

		reader.readAsText(file);
	}, () => {
		unless((!(fileName.endsWith(".sgtxt"))), () => {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const b64 = e.target.result;
					const decoded = decodeURIComponent((atob(b64)));

					chatBox.appendText(decoded, true);

					localStorage.setItem("importedChat", getText(chatBox, true));
					location.reload();
				} catch (err) {
					console.error("Failed to parse chat: ", err);
					fileErr.setText('Invalid Chat Format');
				}
			};

			reader.readAsText(file);
		});
	});
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
			const blob = new Blob([btoa(encodeURIComponent(chat))], { type: 'application/octet-stream' });
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