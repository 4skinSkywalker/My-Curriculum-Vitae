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
    const html = editors.html ? editors.html.getSession().getValue() : ``;
    const css = editors.css ? editors.css.getSession().getValue() : ``;
    const javascript = editors.javascript ? editors.javascript.getSession().getValue() : ``;
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
                editors[mode].setValue(`<div board w="800" h="600">
    <div p1 y="270" w="20" h="60"></div>
    <div p2 y="270" w="20" h="60"></div>
    <div ball size="20" dx="0" dy="0" x="390" y="290"></div>
</div>`);
                break;
            }
            case "css": {
                editors[mode].setValue(`body {
    background: #000;
    color: #fff;
    margin: 0;
    height: 100svh;
    display: grid;
    place-items: center;
}

[board] {
    position: relative;
    width: attr(w px);
    height: attr(h px);
    border: 1px dashed;
    display: grid;
    place-items: center;
}

[board]::before {
    content: "";
    position: absolute;
    height: 100%;
    border-left: 1px dashed;
}

[board]::after {
    content: "";
    position: absolute;
    width: 100px;
    aspect-ratio: 1/1;
    border: 1px dashed;
    border-radius: 50%;
}

[p1], [p2] {
    position: absolute;
    top: 0;
    background: #fff;
    width: attr(w px);
    height: attr(h px);
}

[p1] {
    top: attr(y px);
    left: 0;
}

[p2] {
    top: attr(y px);
    right: 0;
}

[ball] {
    position: absolute;
    top: attr(y px);
    left: attr(x px);
    background: #fff;
    width: attr(size px);
    aspect-ratio: 1/1;
    border-radius: 50%;
}`);
                break;
            }
            case "javascript": {
                editors[mode].setValue(`const boardw = document.querySelector("[board]").getAttribute("w");
const boardh = document.querySelector("[board]").getAttribute("h");

const p1 = document.querySelector("[p1]");
const p1w = Number(p1.getAttribute("w"));
const p1h = Number(p1.getAttribute("h"));

const pspeed = 10;
const p2 = document.querySelector("[p2]");
const p2w = Number(p2.getAttribute("w"));
const p2h = Number(p2.getAttribute("h"));

const ball = document.querySelector("[ball]");
const ballsize = Number(ball.getAttribute("size"));
const halfball = ballsize / 2;

let running = false;
const keyPress = {
  q: false,
  a: false,
  p: false,
  l: false,
  ' ': false,
}

document.addEventListener("keydown", e => keyPress[e.key] = true);
document.addEventListener("keyup", e => keyPress[e.key] = false);

const loop = () => {
    if (keyPress[' ']) {
        running = true;
        let rx = 0;
        let ry = 0;
        while (rx < 2 && ry < 2) {
            rx = Math.random() * 10 - 5;
            ry = Math.random() * 10 - 5;
        }
        ball.setAttribute("x", boardw/2 - halfball);
        ball.setAttribute("y", boardh/2 - halfball);
        ball.setAttribute("dx", rx);
        ball.setAttribute("dy", ry);
        p1.setAttribute("y", boardh/2 - p1h/2);
        p2.setAttribute("y", boardh/2 - p2h/2);
        return window.requestAnimationFrame(loop);
    }
    
    const p1y = Number(p1.getAttribute("y"));
    const p2y = Number(p2.getAttribute("y"));
    
    if (keyPress.q) p1.setAttribute("y", parseInt(p1y - pspeed));
    if (keyPress.a) p1.setAttribute("y", parseInt(p1y + pspeed));
    
    if (keyPress.p) p2.setAttribute("y", parseInt(p2y - pspeed));
    if (keyPress.l) p2.setAttribute("y", parseInt(p2y + pspeed));
    
    const ballx = Number(ball.getAttribute("x"));
    const bally = Number(ball.getAttribute("y"));
    const balldx = Number(ball.getAttribute("dx"));
    const balldy = Number(ball.getAttribute("dy"));
    ball.setAttribute("x", parseInt(ballx + balldx));
    ball.setAttribute("y", parseInt(bally + balldy));
    
    
    // Board collision
    if (bally > boardh - ballsize) {
        ball.setAttribute("y", boardh - ballsize - 5);
        ball.setAttribute("dy", balldy * -1);
        ball.setAttribute("dx", balldx);
    }
    if (bally < 0) {
        ball.setAttribute("y", 5);
        ball.setAttribute("dy", balldy * -1);
        ball.setAttribute("dx", balldx);
    }
    
    // Player 1 collision
    if (ballx > 0 && ballx < p1w && bally > p1y - 2 && bally < p1y + p1h + 2) {
        ball.setAttribute("x", p1w);
        ball.setAttribute("dx", balldx * -1);
        ball.setAttribute("dy", balldy);
    }
    // Player 2 collision
    if (ballx > boardw - p2w - ballsize && ballx < boardw - ballsize && bally > p2y - 2 && bally < p2y + p2h + 2) {
        ball.setAttribute("x", boardw - p2w - ballsize);
        ball.setAttribute("dx", balldx * -1);
        ball.setAttribute("dy", balldy);
    }
    
    // Endgame
    if (ballx > boardw - ballsize || ballx < 0) {
        running = false;
        ball.setAttribute("x", boardw/2 - halfball);
        ball.setAttribute("y", boardh/2 - halfball);
        ball.setAttribute("dx", 0);
        ball.setAttribute("dy", 0);
        p1.setAttribute("y", boardh/2 - p1h/2);
        p2.setAttribute("y", boardh/2 - p2h/2);
    }
    
    window.requestAnimationFrame(loop);
};
loop();`);
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
    const downHandler = mdevt => {
        document.querySelectorAll("iframe").forEach(el => el.style.pointerEvents = "none");
        document.body.classList.add("moving");
        const mdpos = direction === "x"
            ? (mdevt && mdevt.touches)
                ? mdevt.touches[0].pageX
                : mdevt.clientX
            : (mdevt && mdevt.touches)
                ? mdevt.touches[0].pageY
                : mdevt.clientY;
        downCb && downCb(mdevt, ctx);
        
        const moveHandler = mmevt => {
            mmevt.preventDefault();
            const mmpos = direction === "x"
                ? (mdevt && mdevt.touches)
                    ? mmevt.touches[0].pageX
                    : mmevt.clientX
                : (mdevt && mdevt.touches)
                    ? mmevt.touches[0].pageY
                    : mmevt.clientY;
            ctx.pos = Math.round(mmpos - mdpos);
            moveCb && moveCb(mmevt, ctx);
        };
        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("touchmove", moveHandler);
        
        const upHandler = (muevt) => {
            document.querySelectorAll("iframe").forEach(el => el.style.pointerEvents = "initial");
            document.body.classList.remove("moving");
            document.removeEventListener("mousemove", moveHandler);
            document.removeEventListener("touchmove", moveHandler);
            document.removeEventListener("mouseup", upHandler);
            document.removeEventListener("touchend", upHandler);
            upCb && upCb(muevt, ctx);
        };
        document.addEventListener("mouseup", upHandler);
        document.addEventListener("touchend", upHandler);
    };
    target.addEventListener("mousedown", downHandler);
    target.addEventListener("touchstart", downHandler);
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
