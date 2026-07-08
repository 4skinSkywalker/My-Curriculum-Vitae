---
createdBy: 'Fredo'
creatorIcon: 'images/creator-icon.png'
title: 'Running JS Outside the Main Thread'
description: "JavaScript has always had a reputation for being single-threaded. In the browser, your code runs on the main thread which is responsible for rendering pages..."
pubDate: '2026-07-09'
type: 'post'
tags: ['code', 'multi-threading', 'javascript']
---

JavaScript has always had a reputation for being **single-threaded**. In the browser, your code runs on the main thread which is responsible for rendering pages, handling clicks, animations, scrolling, and user interaction.

That creates a painful problem:

> What happens when you need to run something extremely expensive?

Normally, the answer is: **Use Web Workers.**

But Web Workers need another file, worker setup code, message handling, serialization, and a communication layer.

The function in this blog post tries to solve this problem:

> "Can we take any function and execute it somewhere else without blocking the main thread?"

```
function execOutside(fnRef, input) {
    let strFn = fnRef.toString();
    const re = /function[^(]*\(([^)]*)\)/;
    const matched = strFn.match(re)[1];
    strFn = strFn.replace(re, "function ()");
    const str = `self.onmessage = ({ data }) => {
    const [[replacer]] = data;
    (${strFn})();
    self.postMessage(data);
}`.replace("[[replacer]]", matched);

    return new Promise((resolve) => {
        const w = new Worker(URL.createObjectURL(new Blob([str])));
        w.onerror = (err) => console.error(err);
        w.onmessage = ({ data }) => resolve(data);
        w.postMessage(input);
    })
}

console.log(
    await execOutside(
        function (a) {
            for (let i = 0; i < 5e9; i++) {}
            a.test = "c";
            console.log(a.test);
        },
        { test: "test" }
    )
);
```

## Why Is This Cool?

1. It Makes Web Workers Feel Like Normal Functions
2. Zero Worker Files
3. It Uses Real Parallelism

## Is It Reliable?

The concept is excellent. The implementation is fragile. But it works.