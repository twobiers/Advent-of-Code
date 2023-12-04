"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const numberWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
];
const matchingGroup = `[0-9]|(?:${numberWords.join('|')})`;
const matcher = new RegExp(`(${matchingGroup})(?:.*(${matchingGroup}))?`);

const matches = INPUT.map(l => l.match(matcher));

const candidates = matches.map(m => {
    const firstDigit = Number(m[1]) || numberWords.indexOf(m[1]) + 1;
    const secondDigit = Number(m[2]) || numberWords.indexOf(m[2]) + 1 || firstDigit;
    return Number(`${firstDigit}${secondDigit}`);
});
const result = candidates.reduce((acc, curr) => acc + curr, 0);

const pEnd = performance.now();

console.log("SUM OF CALIBRATION VALUES: " + result);
console.log(pEnd - pStart);
