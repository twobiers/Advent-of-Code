"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

//
// YOUR CODE HERE
//
const numbers = INPUT.map(l => {
    const numberSplit = l.split(":")[1].split("|");
    const winningNumbers = numberSplit[0].trim().split(" ");
    const myNumbers = numberSplit[1].trim().split(" ");
    return {
        winningNumbers, myNumbers
    }
});
const values = numbers.map(n => {
    const s = n.myNumbers.filter(n1 => n.winningNumbers.includes(n1)).filter(it => !!it).length;
    if (s === 0) return 0;
    return Math.pow(2, s - 1);
})
const result = values.reduce((acc, curr) => acc + curr, 0);

const pEnd = performance.now();

console.log("<DESCRIPTION>: " + result);
console.log(pEnd - pStart);
