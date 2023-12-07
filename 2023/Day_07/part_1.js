"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const winningPatterns = [[5], [4], [3, 2], [3], [2, 2], [2], [0]];
const calculateHandValue = (hand) => {
    const obj = {};
    for (let c of [...hand]) {
        if (obj[c] === undefined) obj[c] = 1;
        else obj[c]++;
    }
    const sorted = Object.entries(obj).sort(([k1, v1], [k2, v2]) => v2 - v1);

    return winningPatterns.length - winningPatterns.findIndex((p) => p.every((x, idx, arr) => sorted[idx][1] >= x));
};
const compareByOrderingRule = (hand1, hand2) => {
    const h1 = [...hand1];
    const h2 = [...hand2];
    console.assert(h1.length === h2.length);

    for (let i = 0; i < h1.length; i++) {
        if (h1[i] === h2[i]) continue;

        const v1 = cardValues.findIndex(v => v === h1[i]);
        const v2 = cardValues.findIndex(v => v === h2[i]);

        if (v1 > v2) return -1;
        else return 1;
    }
    throw Error("Undefined by task");
};
const compareHands = (hand1, hand2) => {
    const v1 = calculateHandValue(hand1);
    const v2 = calculateHandValue(hand2);
    if (v1 !== v2) return v2 - v1;

    return compareByOrderingRule(hand1, hand2);
}

const result = INPUT.map(i => i.split(" "))
    .sort(([hand1], [hand2]) => compareHands(hand1, hand2))
    .reverse()
    .map(([hand, bid], idx) => [idx + 1, Number(bid)])
    .reduce((acc, [hand, bid]) => acc + hand * bid, 0);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
