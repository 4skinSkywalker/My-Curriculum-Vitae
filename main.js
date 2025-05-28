const container = document.querySelector(".container");
const minAsideWidth = 20;
const asideWidthVar = "--aside-width";
const aside = document.querySelector(".aside");
const resizer = document.querySelector(".resizer");
const asideEditors = document.querySelector(".aside-editors");
const htmlEditor = document.querySelector(".editor.html");
const cssEditor = document.querySelector(".editor.css");
const jsEditor = document.querySelector(".editor.js");
const sections = document.querySelectorAll(".nav-content > section");
const navItems = document.querySelectorAll(".nav-item");
const fredopenSection = document.querySelector("section.fredopen");
const catContainer = document.querySelector(".cat-container");
const cat = document.querySelector(".cat");
let editors = {};
let selectedTab = "experience";
let fileHandle;

function catWalk() {
    const left = 4000;
    cat.style.transitionDuration = (left / 60) + "s";
    cat.style.left = left + "px";
}

function getDoc(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
}

async function loadFile() {
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    const doc = getDoc(contents);

    const html = doc.body.innerHTML;
    const css = doc.head.querySelector("style").innerHTML;
    const javascript = doc.head.querySelector("script").innerHTML;

    editors.html.setValue(html);
    editors.css.setValue(css);
    editors.javascript.setValue(javascript);
}

async function saveFile() {
    fileHandle = await self.showSaveFilePicker({
        suggestedName: "Untitled.html",
        types: [{
            description: "Html documents",
            accept: { "text/plain": [".html"] }
        }]
    });
    writeFile(getHtml());
}

async function writeFile(contents) {
    if (!fileHandle) {
        return;
    }
    const writable = await fileHandle.createWritable();
    await writable.write(contents);
    await writable.close();
}

function debounce(callback, wait) {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

function getHtml() {
    const html = editors.html ? editors.html.getSession().getValue() : "";
    const css = editors.css ? editors.css.getSession().getValue() : "";
    const javascript = editors.javascript ? editors.javascript.getSession().getValue() : "";
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<style>${css}</style>
<scr${""}ipt defer>window.onload = () => {${javascript}};</scr${""}ipt>
</head>
<body>${html}</body>
</html>`;
}

function writeIntoIframe() {
    const content = getHtml();
    writeFile(content);

    const iframe = document.createElement("IFRAME");
    fredopenSection.innerHTML = "";
    fredopenSection.appendChild(iframe);

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(content);
    iframe.contentWindow.document.close();
}

function initEditor(targetId, mode = "html") {
    editors[mode] = ace.edit(targetId);
    editors[mode].setTheme("ace/theme/monokai");

    ace.require("ace/ext/emmet").setCore("ext/emmet_core");
    switch(mode) {
        case "html": {
            ace.config.loadModule("ace/snippets/html", () => console.log("HTML snippets loaded."));
            break;
        }
        case "css": {
            ace.config.loadModule("ace/snippets/css", () => console.log("CSS snippets loaded."));
            break;
        }
        case "javascript": {
            ace.config.loadModule("ace/snippets/javascript", () => console.log("JS snippets loaded."));
            break;
        }
    }

    editors[mode].setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableEmmet: true,
    });

    editors[mode].getSession().setUseWorker(false);
    editors[mode].getSession().setMode("ace/mode/" + mode);

    editors[mode].getSession().on("change", debounce(() => {
        writeIntoIframe();
        localStorage.setItem(`last-editor-${mode}`, editors[mode].getSession().getValue());
    }, 500));

    const lastEditorContent = localStorage.getItem(`last-editor-${mode}`) || "";
    if (lastEditorContent) {
        editors[mode].setValue(lastEditorContent);
    } else {
        switch (mode) {
            case "html": {
                editors[mode].setValue(`<h1>Hello World!</h1>`);
                break;
            }
            case "css": {
                editors[mode].setValue(`body {\n\tbackground: #C0FFEE;\n}`);
                break;
            }
            case "javascript": {
                editors[mode].setValue(`console.log("Hello World!");`);
                break;
            }
        }
    }

    editors[mode].clearSelection();
}

function openFredopen() {
    selectedTab = "fredopen";
    showSelectedTab();
}

function showSelectedTab() {
    if (selectedTab === "fredopen") {
        document.body.classList.add("fredopen");
        document.body.classList.add("noise-disabled");
    } else {
        document.body.classList.remove("fredopen");
        document.body.classList.remove("noise-disabled");
    }

    if (selectedTab === "projects") {
        catWalk();
    }

    sections.forEach(el => el.style.display = "none");
    const section = document.querySelector(".nav-content > section." + selectedTab);
    section.style.display = "block";
    navItems.forEach(el => el.classList.remove("active"));
    const navItem = document.querySelector(".nav-item." + selectedTab);
    navItem.classList.add("active");
}

function drag(options) {
    let { target, downCb, moveCb, upCb, ctx, direction } = options;
    direction = direction || "x";
    ctx = ctx || {};
    target.addEventListener("mousedown", mdevt => {
        document.querySelectorAll("iframe").forEach(el => el.style.pointerEvents = "none");
        document.body.classList.add("moving");
        const mdpos = direction === "x" ? mdevt.clientX : mdevt.clientY;
        downCb && downCb(mdevt, ctx);
        
        const moveHandler = mmevt => {
            mmevt.preventDefault();
            const mmpos = direction === "x" ? mmevt.clientX : mmevt.clientY;
            ctx.pos = Math.round(mmpos - mdpos);
            moveCb && moveCb(mmevt, ctx);
        };
        document.addEventListener("mousemove", moveHandler);
        
        const upHandler = (muevt) => {
            document.querySelectorAll("iframe").forEach(el => el.style.pointerEvents = "initial");
            document.body.classList.remove("moving");
            document.removeEventListener("mousemove", moveHandler);
            document.removeEventListener("mouseup", upHandler);
            upCb && upCb(muevt, ctx);
        };
        document.addEventListener("mouseup", upHandler);
    });
}

(function init() {
    initEditor("html-editor", "html");
    initEditor("css-editor", "css");
    initEditor("js-editor", "javascript");

    showSelectedTab();

    navItems.forEach(navItem => {
        const navLink = navItem.querySelector(".nav-link");
        navLink.addEventListener("click", evt => {
            evt.preventDefault();
            selectedTab = navLink.innerText.toLowerCase();
            showSelectedTab();
        });
    });

    drag({
        target: resizer,
        downCb: (evt, ctx) => {
            ctx.asideWidth = parseInt(getComputedStyle(container).getPropertyValue(asideWidthVar));
        },
        moveCb: (evt, ctx) => {
            const newAsideWidth = Math.max(minAsideWidth, ctx.asideWidth + ctx.pos);
            container.style.setProperty(asideWidthVar, newAsideWidth + "px");
        }
    });
    
    drag({
        target: cssEditor.querySelector(".editor-title"),
        downCb: (evt, ctx) => {
            ctx.htmlEditorHeight = htmlEditor.clientHeight;
            ctx.cssEditorHeight = cssEditor.clientHeight;
            ctx.jsEditorHeight = jsEditor.clientHeight;
        },
        moveCb: (evt, ctx) => {
            const htmlEditorHeight = (ctx.htmlEditorHeight + ctx.pos) + "px";
            const cssEditorHeight = (ctx.cssEditorHeight - ctx.pos) + "px";
            asideEditors.style.gridTemplateRows = `${htmlEditorHeight} ${cssEditorHeight} ${ctx.jsEditorHeight}px`;
        },
        direction: "y"
    });
    
    drag({
        target: jsEditor.querySelector(".editor-title"),
        downCb: (evt, ctx) => {
            ctx.htmlEditorHeight = htmlEditor.clientHeight;
            ctx.cssEditorHeight = cssEditor.clientHeight;
            ctx.jsEditorHeight = jsEditor.clientHeight;
        },
        moveCb: (evt, ctx) => {
            const cssEditorHeight = (ctx.cssEditorHeight + ctx.pos) + "px";
            const jsEditorHeight = (ctx.jsEditorHeight - ctx.pos) + "px";
            asideEditors.style.gridTemplateRows = `${ctx.htmlEditorHeight}px ${cssEditorHeight} ${jsEditorHeight}`;
        },
        direction: "y"
    });
})();
