let filePath = "";
let exitDebounce = false;
let options = { theme: '', bold: false, zoom: 16 };

let menuTabs = document.querySelectorAll("#menuBar ul > li");
let textArea = document.querySelector("#textArea");
let boldItem = document.querySelector("#boldItem");
let exitItem = document.querySelector("#exitItem");
let clearItem = document.querySelector("#clearItem");
let menuSubmenus = document.querySelectorAll("#viewMenu ~ .menuDropdown > div");
let themeItems = document.querySelectorAll("#themeItem .submenuDropdown > a");
let zoomInput = document.querySelector("#zoomInput");
let contextMenu = document.querySelector("#contextMenu");
let pasteItem = document.querySelector("#pasteItem");
let contextPaste = document.querySelector("#contextPaste");
let copyItem = document.querySelector("#copyItem");
let contextCopy = document.querySelector("#contextCopy");
let cutItem = document.querySelector("#cutItem");
let contextCut = document.querySelector("#contextCut");
let contextDelete = document.querySelector("#contextDelete");
let contextSelect = document.querySelector("#contextSelect");
let undoItem = document.querySelector("#undoItem");
let contextUndo = document.querySelector("#contextUndo");
let redoItem = document.querySelector("#redoItem");
let contextRedo = document.querySelector("#contextRedo");
let screenshotItem = document.querySelector("#screenshotItem");
let loadItem = document.querySelector("#loadItem");
let saveItem = document.querySelector("#saveItem");
let saveAsItem = document.querySelector("#saveAsItem");
let errorDialog = document.querySelector("#errorDialog");
let confirmDialog = document.querySelector("#confirmDialog");
let themeStyle = document.querySelector("#themeCSS");

errorDialog.querySelector('a').addEventListener("click", () => errorDialog.close());
redoItem.addEventListener("click", (e) => redoText(e));
contextRedo.addEventListener("click", (e) => redoText(e));
undoItem.addEventListener("click", (e) => undoText(e));
contextUndo.addEventListener("click", (e) => undoText(e));
pasteItem.addEventListener("click", (e) => pasteText(e));
contextPaste.addEventListener("click", (e) => pasteText(e));
copyItem.addEventListener("click", (e) => copyText(e));
contextCopy.addEventListener("click", (e) => copyText(e));
cutItem.addEventListener("click", (e) => cutText(e));
contextCut.addEventListener("click", (e) => cutText(e));
exitItem.addEventListener("click", () => window.utilities.exit());
clearItem.addEventListener("click", () => textArea.value = "");
window.addEventListener("click", () => contextMenu.style.display = "none");
menuTabs.forEach(tab => {
    let dropdown = tab.querySelector(".menuDropdown");
    tab.addEventListener("mouseover", () => dropdown.style.display = "block");
    tab.addEventListener("mouseleave", () => dropdown.style.display = "none");
});
confirmDialog.querySelectorAll('a').forEach(el => {
    if (el.textContent === "No") {
        el.addEventListener("click", () => exitItem.click());
    } else {
        el.addEventListener("click", () => {
            saveItem.click();
            exitItem.click();
        });
    }
});
boldItem.addEventListener("click", () => {
    if (!boldItem.classList.contains("selected")) {
        textArea.classList.add("bold");
        options.bold = true;
    }
    else {
        textArea.classList.remove("bold");
        options.bold = false;
    }

    boldItem.classList.toggle("selected");
});
menuSubmenus.forEach((tab) => {
    let dropdown = tab.querySelector(".submenuDropdown");
    tab.addEventListener("mouseover", () => dropdown.style.display = "block");
    tab.addEventListener("mouseleave", () => dropdown.style.display = "none");
});
themeItems.forEach((item) => {
    item.addEventListener("click", () => {
        let theme = item.textContent.toLowerCase();
        themeItems.forEach((i) => i.classList.remove("selected"));
        item.classList.toggle("selected");

        options.theme = theme;
        themeStyle.href = (theme === "dark" || theme === "light")
            ? `css/${theme}-theme.css`
            : "css/default-theme.css";
    });
});
zoomInput.addEventListener("input", () => {
    let zoomNum = parseInt(zoomInput.value);
    let zoomLevel = Math.round((zoomNum - 8.0) / 0.2);
    let zoomLabel = document.querySelector("#zoomInput ~ label");

    zoomLabel.textContent = `${zoomLevel}%`;
    textArea.style.fontSize = `${zoomNum}pt`;
});
textArea.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenu.style.top = `${e.clientY - 41}px`;
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.display = "block";
});
contextDelete.addEventListener("click", () => {
    let startPos = textArea.selectionStart;
    let endPos = textArea.selectionEnd;
    textArea.value = textArea.value.substring(0, startPos) + "" + textArea.value.substring(endPos);
    textArea.focus();
});
contextSelect.addEventListener("click", () => {
    textArea.focus();
    textArea.select();
});
screenshotItem.addEventListener("click", async (e) => {
    let menu = e.target.closest(".menuDropdown");
    menu.style.display = "none";
    setTimeout(async () => {
        try {
            let main = document.querySelector("main");
            let rect = main.getBoundingClientRect();
            let bounds = {
                x: Math.round(rect.x),
                y: Math.round(rect.y + 8),
                width: Math.round(rect.width),
                height: Math.round(rect.height - 8)
            };

            await window.utilities.screenshot(bounds);
        } catch (err) {
            showErrorDialog("Screenshot Error", "An unknown error occurred while\ntaking a screenshot.");
        }
    }, 500);
});
loadItem.addEventListener("click", async (e) => {
    let menu = e.target.closest(".menuDropdown");
    menu.style.display = "none";

    window.utilities.openFile().then((fileObj) => {
        try {
            if (fileObj.error) {
                throw new Error(fileObj.error);
            } else {
                filePath = fileObj.path;
                textArea.value = fileObj.data;
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            if (fileObj.error == "Incompatible") {
                showErrorDialog("File is Incompatible", "The file that you tried to open\nmay be corrupted or incompatible.");
            } else {
                showErrorDialog("File Load Error", "An unknown error occurred while\nopening the file.");
            }
        }
        textArea.focus();
    });
});
saveItem.addEventListener("click", async (e) => {
    let menu = e.target.closest(".menuDropdown");
    menu.style.display = "none";

    window.utilities.saveFile(filePath, textArea.value).then((saveObj) => {
        try {
            if (saveObj.filePath.length === 0 || saveObj.error) {
                throw new Error(saveObj.error);
            } else {
                filePath = saveObj.filePath;
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            showErrorDialog("File Save Error", "An unknown error occurred while\nsaving the file.");
        }
        textArea.focus();
    });
});
saveAsItem.addEventListener("click", async (e) => {
    let menu = e.target.closest(".menuDropdown");
    menu.style.display = "none";
    let oldFilePath = filePath;
    filePath = "";

    window.utilities.saveFile(filePath, textArea.value).then((saveObj) => {
        try {
            if (saveObj.filePath.length === 0 || saveObj.error) {
                throw new Error(saveObj.error);
            } else {
                filePath = saveObj.filePath;
            }
        } catch (error) {
            filePath = oldFilePath;
            console.error(`Error: ${saveObj.error}`);
        }
        textArea.focus();
    });
});
window.addEventListener('beforeunload', (e) => {
    if (exitDebounce) return;
    e.preventDefault();

    saveInitialOptions()
    exitDebounce = true;
    window.utilities.fileExists(filePath, textArea.value).then((fileObj) => {
        try {
            if (fileObj.error) {
                throw new Error(fileObj.error);
            } else if (!fileObj.matches) {
                confirmDialog.showModal();
            } else if (fileObj.matches) {
                exitItem.click();
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    });
});
document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveItem.click();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        loadItem.click();
    } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 's') {
        e.preventDefault();
        saveAsItem.click();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        boldItem.click();
    } else if ((e.ctrlKey || e.metaKey) && e.key === '=') {
        e.preventDefault();
        zoomInput.value = Math.min(zoomInput.valueAsNumber + 2, zoomInput.max);
        zoomInput.dispatchEvent(new Event('input'));
    } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        zoomInput.value = Math.max(zoomInput.valueAsNumber - 2, zoomInput.min);
        zoomInput.dispatchEvent(new Event('input'));
    } else if (e.key === 'F12') {
        e.preventDefault();
        screenshotItem.click();
    }
});
window.addEventListener('DOMContentLoaded', async () => {
    let fileObj = await window.utilities.initialize();
    setupInitialOptions();
    try {
        if (fileObj.error) {
            if (fileObj.error !== "No File") {
                throw new Error(fileObj.error);
            }
        } else {
            filePath = fileObj.path;
            textArea.value = fileObj.data;
        }
    } catch (error) {
        console.error(`Error: ${error}`);
        if (fileObj.error == "Incompatible") {
            showErrorDialog("File is Incompatible", "The file that you tried to open\nmay be corrupted or incompatible.");
        } else {
            showErrorDialog("File Load Error", "An unknown error occurred while\nopening the file.");
        }
    }
    textArea.focus();
});

async function setupInitialOptions() {
    options = await window.utilities.getOptions();

    if (options.theme === "light" || options.theme === "dark") {
        document.querySelector(`#${options.theme}ThemeItem`).click()
    } else {
        document.querySelector(`#defaultThemeItem`).click()
    }

    if (options.bold)
        boldItem.click();

    if (options.zoom > 16 || options.zoom < 16) {
        if (options.zoom > 16) {
            zoomInput.value = Math.min(options.zoom, zoomInput.max);
        } else {
            zoomInput.value = Math.max(options.zoom, zoomInput.min);
        }
        zoomInput.dispatchEvent(new Event('input'));
    }
}
function saveInitialOptions() {
    window.utilities.setOptions(
        options.theme,
        options.bold,
        zoomInput.value
    );
}
function pasteText(e) {
    let clipboardText = navigator.clipboard.readText();
    let menu = e.target.closest(".menuDropdown, #contextMenu");
    clipboardText.then((text) => {
        let startPos = textArea.selectionStart;
        let endPos = textArea.selectionEnd;
        textArea.value = textArea.value.substring(0, startPos) + text + textArea.value.substring(endPos);
        menu.style.display = "none";
        textArea.focus();
        textArea.setSelectionRange(startPos + text.length, endPos);
    });
}
function copyText(e) {
    let startPos = textArea.selectionStart;
    let endPos = textArea.selectionEnd;
    let menu = e.target.closest(".menuDropdown, #contextMenu");

    let textToCopy = textArea.value.substring(startPos, endPos);
    navigator.clipboard.writeText(textToCopy);
    menu.style.display = "none";
    textArea.focus();
}
function cutText(e) {
    let startPos = textArea.selectionStart;
    let endPos = textArea.selectionEnd;
    let menu = e.target.closest(".menuDropdown, #contextMenu");
    let textToCopy = textArea.value.substring(startPos, endPos);

    textArea.value = textArea.value.substring(0, startPos) + "" + textArea.value.substring(endPos);
    navigator.clipboard.writeText(textToCopy);
    menu.style.display = "none";
    textArea.focus();
}
function undoText(e) {
    let menu = e.target.closest(".menuDropdown, #contextMenu");
    window.utilities.undo()

    menu.style.display = "none";
    textArea.focus();
}
function redoText(e) {
    let menu = e.target.closest(".menuDropdown, #contextMenu");
    window.utilities.redo()

    menu.style.display = "none";
    textArea.focus();
}
function showErrorDialog(heading, message) {
    let header = errorDialog.querySelector("h1");
    let body = errorDialog.querySelector("div");

    header.textContent = heading;
    body.innerText = message;
    errorDialog.showModal();
}