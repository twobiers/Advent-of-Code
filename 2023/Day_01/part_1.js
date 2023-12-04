"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();

const justNumbers = INPUT.map(l => l.replace(/[^0-9]/g, ''));
const justTheFirstAndLastDigits = justNumbers.map(n => `${n[0]}${n[n.length - 1]}`);
const result = justTheFirstAndLastDigits.reduce((acc, curr) => acc + Number(curr), 0);

const pEnd = performance.now();

console.log("SUM OF CALIBRATION VALUES: " + result);
console.log(pEnd - pStart);
