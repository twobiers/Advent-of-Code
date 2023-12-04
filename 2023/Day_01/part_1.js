"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { performance } = require("node:perf_hooks");

const INPUT = String(fs.readFileSync(path.join(__dirname, "input.txt"))).trim().split("\n");

const pStart = performance.now();


const pEnd = performance.now();

console.log("SUM OF CALIBRATION VALUES: " + result);
console.log(pEnd - pStart);
