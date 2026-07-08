---
createdBy: 'Fredo'
creatorIcon: 'images/creator-icon.png'
title: 'Parsing Human Numbers'
description: "One of the small problems you face as a programmer working on shitty databases is that humans do not write numbers the same way everywhere..."
pubDate: '2026-07-09'
type: 'post'
tags: ['code', 'numbers', 'javascript']
---

# Parsing Human Numbers

One of the small problems you face as a programmer working on shitty databases is that humans do not write numbers the same way everywhere.

JavaScript expects decimals to use a dot:

```
Number("1000.50") // 1000.5
```

But many countries use commas instead:

```
"1000,50"
```

and thousands separators make things even more complicated:

```
1,000,000.12
1.000.000,12
```

At first this looks like a simple string replacement problem. However, replacing every comma with a dot immediately breaks valid formats because commas can represent either decimals or thousands separators.

The problem I needed to solve was creating a function that could look at a numeric string, understand the formatting style, clean it, and finally return a valid JavaScript number.
Follows my attempt at solving this problem:

```
function strToNum(str) {
    if (str.includes(",") && str.includes(".")) {
        if (str.indexOf(",") > str.indexOf(".")) {
            str = str.replace(/\./g, "").replace(/,/g, ".");
        } else {
            str = str.replace(/,/g, "");
        }
    }
    if (str.includes(",")) {
        str = str.replace(/,/g, ".");
    }
    while (str.split("").filter(x => x === ".").length > 1) {
        str = str.replace(/\./, "");
    }
    return Number(str);
}

[
    strToNum("0,2") === 0.2,
    strToNum("0,2,3.4") === 23.4,
    strToNum("0.1") === 0.1,
    strToNum("1.000.000,12") === 1000000.12,
    strToNum("1,000,000.12") === 1000000.12,
    strToNum("1,000.99") === 1000.99,
    strToNum("1.234") === 1.234,
    strToNum("3.4.5.6,2") === 3456.2,
    strToNum("1000") === 1000,
    strToNum("-99") === -99,
].forEach(console.log);
```